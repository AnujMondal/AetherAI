# Quick Vercel Deployment Guide

## 🚀 Deploy in 5 Minutes!

Your project is now configured to deploy both frontend and backend on Vercel together.

### Step 1: Go to Vercel

Visit: https://vercel.com/new

### Step 2: Import Repository

- Click "Import Git Repository"
- Select: `AnujMondal/AetherAI`
- Click "Import"

### Step 3: Configure Project

Leave all settings as default:

- Root Directory: `./`
- Framework: Other (Auto-detected)
- Build Command: Auto
- Output Directory: `client/dist`

### Step 4: Add Environment Variables

Click "Environment Variables" and add these:

```
DATABASE_URL=your_postgresql_url
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
GEMINI_API_KEY=AIza...
CLIPDROP_API_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=https://your-app.vercel.app
VITE_BASE_URL=https://your-app.vercel.app
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

**Note:** You'll update `CLIENT_URL` and `VITE_BASE_URL` after first deployment.

### Step 5: Deploy!

- Click "Deploy"
- Wait 2-5 minutes ⏱️

### Step 6: Update URLs (After First Deploy)

1. Copy your Vercel URL (e.g., `https://aether-ai-xyz.vercel.app`)
2. Go to: Settings → Environment Variables
3. Update:
   - `CLIENT_URL` → Your Vercel URL
   - `VITE_BASE_URL` → Your Vercel URL
4. Go to: Deployments → Click "..." → "Redeploy"

### Step 7: Configure Clerk

1. Go to: https://dashboard.clerk.com
2. Your App → Settings
3. Add to **Allowed redirect URLs**:
   - `https://your-vercel-url.vercel.app/*`
4. Add to **Allowed origins**:
   - `https://your-vercel-url.vercel.app`

### ✅ Done!

Your app is live at: `https://your-vercel-url.vercel.app`

API endpoint: `https://your-vercel-url.vercel.app/api`

---

## Need Help?

Check the full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)

## Test Your Deployment

- ✅ Sign in/Sign up works
- ✅ Generate Article
- ✅ Generate Blog Title
- ✅ Generate Image (Premium)
- ✅ Community Gallery

Happy deploying! 🎊
