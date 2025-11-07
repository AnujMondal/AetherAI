# Deployment Guide for AetherAI

## Prerequisites
- GitHub account (✅ Done - https://github.com/AnujMondal/AetherAI)
- Vercel account (create at https://vercel.com)
- All environment variables ready

## Deploy Backend (Server) on Vercel

### Option 1: Deploy Server to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `AnujMondal/AetherAI`
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
5. Add Environment Variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   CLIPDROP_API_KEY=your_clipdrop_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
6. Click "Deploy"
7. Copy your deployed backend URL (e.g., `https://aether-ai-server.vercel.app`)

### Option 2: Deploy Server to Railway (Recommended for Node.js backends)

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `AnujMondal/AetherAI`
4. Select the `server` directory as root
5. Add all environment variables
6. Deploy and get your backend URL

## Deploy Frontend (Client) on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository again: `AnujMondal/AetherAI`
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Add Environment Variables:
   ```
   VITE_BASE_URL=<your-deployed-backend-url>
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```
6. Click "Deploy"

## Post-Deployment Steps

### 1. Update Clerk Settings
- Go to [Clerk Dashboard](https://dashboard.clerk.com)
- Navigate to your application
- Add your Vercel frontend URL to:
  - **Allowed redirect URLs**
  - **Allowed origins (CORS)**

### 2. Update Environment Variables
If you need to update any environment variables:
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Update the variables
- Redeploy the project

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

1. **CORS Errors**: Make sure your backend allows requests from your frontend domain
2. **Environment Variables**: Double-check all environment variables are set correctly
3. **Database Connection**: Ensure your database URL is accessible from Vercel
4. **Build Failures**: Check the build logs in Vercel dashboard
5. **API Timeouts**: Vercel has a 10-second timeout for serverless functions (consider Railway for backend)

## Alternative Backend Hosting

If Vercel serverless has issues with your backend, consider:
- **Railway**: https://railway.app (Recommended)
- **Render**: https://render.com
- **Heroku**: https://heroku.com
- **Fly.io**: https://fly.io

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
