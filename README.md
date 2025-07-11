# Is This Person Real? 🤖✨

A production-ready React application that verifies if a person is real using Google Gemini's AI-powered search and image analysis. Features modern UI, responsive design, and intelligent fallbacks for reliable deployment.

## Features

- **AI-Powered Person Verification**: Uses Google Gemini with grounding tool for accurate person searches
- **Image Analysis**: Detects AI-generated images with fallback support
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Error Handling**: Graceful fallbacks and user-friendly error messages
- **Production Ready**: Optimized for deployment on Netlify and other platforms

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **AI**: Google Gemini API with grounding tool
- **Styling**: Tailwind CSS
- **Build**: Vite for fast development and optimized builds
- **Deployment**: Netlify (with environment variable support)

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd isthispersonrealfrontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## Deployment

### Netlify Deployment

#### Method 1: Direct Deploy (Recommended)

1. **Build the project locally**:
```bash
npm run build
```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Sign in and click "Add new site"
   - Choose "Deploy manually"
   - Drag and drop your `dist` folder

3. **Set Environment Variables**:
   - Go to your site's dashboard
   - Navigate to "Site settings" → "Environment variables"
   - Add a new variable:
     - **Key**: `VITE_GEMINI_API_KEY`
     - **Value**: Your Gemini API key
   - Click "Save"

4. **Redeploy**:
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"

#### Method 2: Git Integration

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose your GitHub repository
   - Set build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Set Environment Variables**:
   - In your site settings, go to "Environment variables"
   - Add `VITE_GEMINI_API_KEY` with your API key

#### Method 3: Netlify CLI

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login and deploy**:
```bash
netlify login
netlify deploy --build --prod
```

3. **Set environment variables**:
```bash
netlify env:set VITE_GEMINI_API_KEY your_api_key_here
```

### Other Deployment Platforms

#### Vercel

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel --prod
```

3. **Set environment variables**:
```bash
vercel env add VITE_GEMINI_API_KEY
```

#### GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**:
```json
{
  "homepage": "https://yourusername.github.io/isthispersonrealfrontend",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy**:
```bash
npm run deploy
```

**Note**: GitHub Pages doesn't support environment variables. You'll need to build with the API key included or use a different deployment method.

## Environment Variables

### Required Variables

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key

### Setting Environment Variables

#### Local Development
Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

#### Production (Netlify)
1. Go to your site's dashboard
2. Navigate to "Site settings" → "Environment variables"
3. Add `VITE_GEMINI_API_KEY` with your API key value

#### Production (Vercel)
```bash
vercel env add VITE_GEMINI_API_KEY
```

#### Production (Other platforms)
Check your platform's documentation for setting environment variables. The key should always be `VITE_GEMINI_API_KEY`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── App.tsx          # Main application component
├── gemini.ts        # Gemini API integration
├── config.ts        # Configuration settings
├── main.tsx         # React entry point
├── index.css        # Global styles
└── vite-env.d.ts    # TypeScript declarations
```

## Features in Detail

### Person Verification
- Uses Google Gemini's grounding tool for accurate web search
- Provides structured results with name, credibility, and background information
- Fallback to mock data if API is unavailable

### Image Analysis
- Detects AI-generated images using Hugging Face models
- Provides confidence scores and analysis results
- Fallback analysis if external service is unavailable

### Error Handling
- Graceful degradation when services are unavailable
- User-friendly error messages
- Fallback data to demonstrate functionality

## Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- The `.env` file is already in `.gitignore`
- Rotate API keys regularly

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please check the error messages in the application or review the console logs for debugging information.