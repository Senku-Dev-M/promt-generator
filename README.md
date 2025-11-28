# Prompt Generator (React + Vite)

Generates improved prompts in Spanish and English with role/context and formatting, using OpenRouter streaming (model `x-ai/grok-4.1-fast:free`). Choose text/image/video and get a ready-to-use prompt.

## Repository
`https://github.com/Senku-Dev-M/promt-generator.git`

## Quick start
1) Clone  
`git clone https://github.com/Senku-Dev-M/promt-generator.git`
`cd promt-generator`

2) Install deps  
`npm install`

3) Environment  
Create `.env.local`:
```
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```
> Without the key, the app still works in offline mode and shows a note.

4) Run
- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Notes
- Streaming responses with usage metrics (prompt/completion/reasoning tokens).
- Fixed model: `x-ai/grok-4.1-fast:free` (via OpenRouter).
- Node 20.19+ recommended (Vite warns on lower versions).

## Author
- Rodrigo Machaca — rodrigo.machaca@jala.university  
- GitHub: https://github.com/Senku-Dev-M
