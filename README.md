# Paul Cobley Website

A professional personal website built with Next.js.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- CSS (App Router global styles)

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Project Structure

- `app/page.tsx`: Main page content (about, career journey, portfolio placeholders, contact)
- `app/globals.css`: Visual design and styling
- `app/layout.tsx`: App layout, fonts, and metadata
- `app/components/digital-twin-chat.tsx`: Client-side AI chat UI
- `app/api/chat/route.ts`: Server-side OpenRouter proxy for Digital Twin responses
- `app/lib/linkedin-profile.ts`: Full LinkedIn profile text used in system prompt context

## Update Content

- Edit the profile content in `app/page.tsx`.
- Adjust colors, spacing, and UI style in `app/globals.css`.

## AI Digital Twin Setup

Add this variable to `.env`:

```bash
OPENROUTER_API_KEY=your_key_here
```

The Digital Twin chat uses model: `openai/gpt-oss-120b:free`.
