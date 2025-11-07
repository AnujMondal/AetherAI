import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// PDF parsing disabled for serverless - use Render.com for backend if needed
// import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length === "short" ? 1000 : length === "medium" ? 1500 : 2500,
    });

    const content = response.choices?.[0]?.message?.content;

    // Validate content before database insertion
    if (!content || content.trim() === "") {
      return res.json({
        success: false,
        message: "Failed to generate article. Please try again.",
      });
    }

    await sql` INSERT INTO creations (user_id, prompt,content,type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log("Generate Article Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const content = response.choices?.[0]?.message?.content;

    // Validate content before database insertion
    if (!content || content.trim() === "") {
      return res.json({
        success: false,
        message: "Failed to generate blog title. Please try again.",
      });
    }

    await sql` INSERT INTO creations (user_id, prompt,content,type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.log("Generate Blog Title Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    // Use Pollinations.ai - Free image generation API
    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);

    // Generate image URL (Pollinations generates on-the-fly)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

    // Fetch the image with timeout and proper headers
    const { data } = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 60000, // 60 second timeout
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    // Convert to base64
    const base64Image = `data:image/png;base64,${Buffer.from(data).toString(
      "base64"
    )}`;

    // Upload to Cloudinary for permanent storage
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "ai-generated-images",
      resource_type: "auto",
    });

    await sql` INSERT INTO creations (user_id, prompt,content,type, publish) VALUES (${userId}, ${prompt}, ${
      uploadResult.secure_url
    }, 'image', ${publish ?? false})`;

    res.json({ success: true, content: uploadResult.secure_url });
  } catch (error) {
    console.log("Generate Image Error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate image",
    });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          backgroud_removal: "remove_the_background",
        },
      ],
    });

    await sql` INSERT INTO creations (user_id, prompt,content,type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql` INSERT INTO creations (user_id, prompt,content,type) VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    if (!resume) {
      return res.json({ success: false, message: "No resume file uploaded." });
    }

    if (resume.size > 20 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds 20MB limit.",
      });
    }

    console.log("Reading PDF file...");
    const fileBuffer = fs.readFileSync(resume.path);
    const base64Data = fileBuffer.toString("base64");

    console.log("Processing PDF with Gemini API (inline data)...");

    // Use inline PDF data approach (works for PDFs under 20MB)
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                inline_data: {
                  mime_type: "application/pdf",
                  data: base64Data,
                },
              },
              {
                text: "Extract all the text content from this resume PDF and then provide a detailed professional review. Include: 1) Strengths of the resume, 2) Weaknesses and areas for improvement, 3) Specific suggestions to make it more effective, 4) Overall rating and recommendation.",
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000, // 60 second timeout
      }
    );

    const content =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    console.log("Content length:", content?.length);

    // Ensure content is not null or empty before saving to database
    if (!content || content.trim() === "") {
      console.log("Empty content received from AI");
      return res.json({
        success: false,
        message: "AI returned empty response. Please try again.",
      });
    }

    console.log("Saving to database...");
    await sql` INSERT INTO creations (user_id, prompt,content,type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    // Clean up uploaded file
    fs.unlinkSync(resume.path);

    console.log("Success! Sending response to client");
    res.json({ success: true, content });
  } catch (error) {
    console.log("Resume Review Error:", error);
    console.error("Full error details:", error.response?.data || error.message);
    
    // Clean up file on error
    if (req.file?.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {}
    }

    res.json({
      success: false,
      message: error.message || "Failed to process resume",
    });
  }
};
