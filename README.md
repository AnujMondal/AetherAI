# AetherAI

A full-stack AI-powered SaaS platform built with React and Node.js, featuring multiple AI tools for content creation and image manipulation.

## Features

- 📝 **AI Article Writer** - Generate articles with customizable length
- 🏷️ **Blog Title Generator** - Create catchy blog titles
- 🎨 **AI Image Generator** - Generate images from text prompts with multiple style options
- 🖼️ **Background Remover** - Remove backgrounds from images
- ✂️ **Object Remover** - Remove specific objects from images
- 📄 **Resume Reviewer** - Get AI-powered resume feedback
- 👥 **Community Gallery** - Share and like AI-generated images
- 💎 **Premium Features** - Subscription-based access to advanced tools

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Clerk (Authentication)
- Axios
- React Router
- React Hot Toast

### Backend

- Node.js
- Express
- PostgreSQL (Neon)
- Cloudinary (Image Storage)
- OpenAI/Gemini API
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon recommended)
- Cloudinary account
- Clerk account
- Gemini API key

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd AetherAI
```

2. Install dependencies:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:

Create `.env` file in the `server` directory:

```env
DATABASE_URL=your_postgresql_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create `.env` file in the `client` directory:

```env
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Run the application:

```bash
# Start server (from server directory)
npm start

# Start client (from client directory)
npm run dev
```

The server will run on `http://localhost:3000` and the client on `http://localhost:5173`.

## Deployment

### Backend (Server)

- Deploy to platforms like Railway, Render, or Heroku
- Set all environment variables
- Ensure PostgreSQL database is accessible

### Frontend (Client)

- Deploy to Vercel, Netlify, or similar platforms
- Set `VITE_BASE_URL` to your deployed backend URL
- Set `VITE_CLERK_PUBLISHABLE_KEY`

## License

MIT

## Author

Anuj Mondal
