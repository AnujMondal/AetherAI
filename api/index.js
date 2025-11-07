import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import aiRouter from "../server/routes/AIRoutes.js";
import userRouter from "../server/routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true
}));
app.use(clerkMiddleware());

// Routes
app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

// Health check
app.get("/api", (req, res) => {
  res.json({ message: "AetherAI API is running!" });
});

// Export for Vercel serverless
export default app;
