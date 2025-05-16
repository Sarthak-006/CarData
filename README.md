# Radiator Springs Data Marketplace

A Pixar Cars-themed decentralized marketplace for vehicle data, built with Next.js and powered by GROQ AI.

## Deployment on Vercel

1. Fork or clone this repository
2. Create a new project on [Vercel](https://vercel.com)
3. Connect your repository to Vercel
4. Add the following environment variable in your Vercel project settings:
   - `GROQ_API_KEY`: Your GROQ API key for AI insights

5. Deploy! Vercel will automatically detect the Next.js project and use the optimal build settings.

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

The only required environment variable is:

- `GROQ_API_KEY`: Your GROQ API key for generating AI insights

Create a `.env.local` file in the root directory and add your GROQ API key:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

## Features

- Real-time vehicle data visualization with Lightning McQueen style insights
- AI-powered insights by Doc Hudson using GROQ
- Decentralized data marketplace styled as Radiator Springs Trading Post
- Interactive dashboards with Pixar Cars character themes
- Privacy-focused data sharing controls with Sheriff protection 