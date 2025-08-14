# Vardhman Jain - Portfolio Website

A pixel art styled portfolio website for a Quality Engineer, built with React, TypeScript, and Tailwind CSS.

## Features

- **Retro Programming Aesthetic**: Pixel art styling with terminal-inspired design
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Resume Chat**: AI-powered Q&A system based on resume content
- **Responsive Design**: Works on all device sizes
- **Smooth Navigation**: Section-based navigation with smooth scrolling

## Content Management

### Updating Profile Data

Edit `/src/data/profile.json` to update:
- Profile summary and contact information
- Skills (organized by category)
- Project details with tech stack and outcomes
- Work experience with impact metrics
- Education and leadership information

### Adding a New Project

1. Add project data to `/src/data/profile.json` in the `projects` array:
```json
{
  "title": "Project Name",
  "dates": "Month Year - Month Year", 
  "stack": ["Tech1", "Tech2", "Tech3"],
  "bullets": [
    "Achievement 1 with metrics",
    "Achievement 2 with impact"
  ],
  "outcome": "Overall impact summary"
}
```

2. The project will automatically appear on the homepage with a "View Details" modal.

### Chat System Configuration

The resume chat operates in two modes:

#### Local Mode (Default)
- Uses local keyword matching and retrieval
- No external API required
- Answers strictly from resume JSON data
- Limited but fast and private

#### LLM Mode (Optional)
1. Set environment variable: `OPENAI_API_KEY=your_api_key_here`
2. The chat will automatically use GPT for enhanced responses
3. Still grounded in resume data with source citations
4. Better natural language understanding

### Switching Chat Modes

If `OPENAI_API_KEY` is set:
- Chat mode indicator shows "Mode: LLM"
- Enhanced natural language processing
- More conversational responses
- Source citations included

Without API key:
- Chat mode shows "Mode: Local"
- Keyword-based matching
- Fast responses
- No external dependencies

## Development

### Local Setup
```bash
npm install
npm run dev
```

### Project Structure
```
src/
├── components/          # Reusable UI components
├── data/               # Static data (profile.json)
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── assets/             # Images and static files
```

### Key Components
- `ProjectModal.tsx`: Handles project detail modals
- `ChatLauncher.tsx`: Chat access from homepage
- `Chat.tsx`: Full chat interface
- `PixelCard.tsx`: Main card styling component

## Deployment

Simply open [Lovable](https://lovable.dev/projects/52fda486-a40d-4973-a45e-e5712efd0829) and click on Share -> Publish.

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **shadcn/ui** - UI components

Built with ❤️ using Lovable
