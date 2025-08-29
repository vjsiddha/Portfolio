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

The resume chat operates in two modes and supports robust retrieval with company/project aliases:

#### Local Mode (Default)
- Uses enhanced BM25/TF-IDF retrieval with alias expansion
- Chunks resume data into passages for better matching
- Company aliases (e.g., "A. Berger" ⇄ "A. Berger Precision Ltd", "RBC" ⇄ "Royal Bank of Canada")
- Project aliases (e.g., "BetWise" matches "BetWise – Interactive Decision Support System")
- First-person responses ("I", "my") with source citations
- No external API required

#### LLM Mode (OpenAI Integration)
Two ways to connect OpenAI:

**Temporary Key (Quick Testing):**
1. Go to `/chat` page
2. If no environment key is detected, a banner will appear
3. Paste your OpenAI API key and click "Use Temporarily"
4. Key is stored in browser localStorage for session use
5. Enables immediate LLM-powered responses

**Permanent Key (Recommended):**
1. In the chat banner, paste your API key and click "Make It Permanent"
2. This copies the key to clipboard and opens Lovable's OpenAI Integration page
3. Paste the key into Lovable's integration settings
4. Save and rebuild the project
5. Chat auto-detects environment key on next load

#### Alias System for Better Retrieval

Edit `/src/data/profile.json` to add company/project aliases:

```json
{
  "company": "A. Berger Precision Ltd",
  "aliases": ["A. Berger", "Berger", "A. Berger Precision"]
}
```

This ensures queries like "What did you do at Berger?" match "A. Berger Precision Ltd" experience.

### Chat Mode Indicators

- **Mode: Local** - Using enhanced local retrieval
- **Mode: LLM (OpenAI)** - Using OpenAI with retrieved context
- Banner appears when no API key is available for easy setup

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

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **shadcn/ui** - UI components
