# Deployment Guide for AetherAI on Vercel

## Prerequisites

- GitHub account (✅ Done - https://github.com/AnujMondal/AetherAI)
- Vercel account (create at https://vercel.com)
- All environment variables ready

## Single Deployment on Vercel (Both Frontend & Backend)

This project is configured to deploy both the frontend and backend API on Vercel in a single deployment.

### Step-by-Step Deployment:

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository: `AnujMondal/AetherAI`**

4. **Configure the project:**
   - **Framework Preset**: Other (or leave as detected)
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run vercel-build` (or leave default)
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

5. **Add ALL Environment Variables:**
   ```
   DATABASE_URL=your_postgresql_connection_string
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   CLIPDROP_API_KEY=your_clipdrop_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLIENT_URL=https://your-domain.vercel.app
   VITE_BASE_URL=https://your-domain.vercel.app
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```
   
   **Note**: After first deployment, update `CLIENT_URL` and `VITE_BASE_URL` with your actual Vercel URL and redeploy.

6. **Click "Deploy"**

7. **Wait for deployment to complete** (usually 2-5 minutes)

8. **After deployment:**
   - Your frontend will be at: `https://your-project.vercel.app`
   - Your API will be at: `https://your-project.vercel.app/api`

## Post-Deployment Steps

### 1. Update Environment Variables with Actual URL

After your first deployment, you need to update the URLs:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update these variables with your actual Vercel URL:
   - `CLIENT_URL` = `https://your-actual-domain.vercel.app`
   - `VITE_BASE_URL` = `https://your-actual-domain.vercel.app`
3. Go to Deployments tab → Click "..." on latest deployment → "Redeploy"

### 2. Update Clerk Settings

- Go to [Clerk Dashboard](https://dashboard.clerk.com)
- Navigate to your application
- Add your Vercel URL to:
  - **Allowed redirect URLs**: `https://your-domain.vercel.app/*`
  - **Allowed origins (CORS)**: `https://your-domain.vercel.app`

### 3. Test Your Deployment

- Visit your frontend URL
- Test all features:
  - Sign in/Sign up
  - Generate Article
  - Generate Blog Title
  - Generate Image (Premium)
  - Remove Background (Premium)
  - Remove Object (Premium)
  - Review Resume (Premium)
  - Community Gallery

## Database Setup

Make sure your PostgreSQL database (Neon) has the correct tables:

```sql
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  prompt TEXT,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Make sure `CLIENT_URL` environment variable is set correctly
   - Update Clerk allowed origins

2. **Environment Variables**: 
   - Double-check all environment variables are set correctly
   - Remember to redeploy after updating variables

3. **Database Connection**: 
   - Ensure your Neon database URL is accessible from Vercel
   - Check if database connection string includes SSL mode

4. **Build Failures**: 
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are listed in package.json

5. **API 404 Errors**: 
   - Verify the API routes are working: `https://your-domain.vercel.app/api`
   - Check serverless function logs in Vercel

6. **Function Timeout**: 
   - Vercel serverless functions have a 10-second timeout on Hobby plan
   - Image generation might take longer - consider upgrading Vercel plan if needed

### How to Check Logs:

1. Go to Vercel Dashboard → Your Project
2. Click on "Functions" tab to see API function logs
3. Click on "Deployments" to see build logs

## Important Notes

- ⚠️ **Vercel Hobby plan** has serverless function limits (10s timeout, 50MB max size)
- ⚠️ **File uploads** work differently on serverless - multer temp files are in `/tmp`
- ⚠️ **Cold starts** may cause first API request to be slower
- ⚠️ Make sure your `.env` files are NOT committed to Git (they're in `.gitignore`)

## Architecture

Your deployed application structure:
```
https://your-domain.vercel.app/          → React Frontend (Static)
https://your-domain.vercel.app/api       → Express API (Serverless)
https://your-domain.vercel.app/api/ai/*  → AI Routes
https://your-domain.vercel.app/api/user/*→ User Routes
```

## Domain Setup (Optional)

1. Purchase a domain from Namecheap, GoDaddy, etc.
2. In Vercel Dashboard → Your Project → Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed by Vercel

## Monitoring

- View deployment logs in Vercel Dashboard
- Monitor API usage in Clerk Dashboard
- Check Cloudinary storage usage
- Monitor database usage in Neon Dashboard

---

Your application is now live! 🚀

**Frontend URL**: Will be provided after deployment
**Backend URL**: Will be provided after deployment
**GitHub Repository**: https://github.com/AnujMondal/AetherAI
