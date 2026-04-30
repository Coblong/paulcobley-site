# Tutorial: Building This Next.js Personal Website + AI Digital Twin Chat

This tutorial explains exactly what was built in this project, written for a complete beginner in frontend coding.

## 1) What You Built

You now have a professional personal website that includes:

- A polished single-page profile site
- Sections for About, Career Journey, Portfolio placeholders, and Contact
- A "Digital Twin" AI chat that answers questions about your career
- A secure backend API route that calls OpenRouter using your `.env` API key
- A system prompt that includes your full LinkedIn profile text extracted from `Profile.pdf`

## 2) Technology Summary

### Core stack

- **Next.js 16 (App Router)**: Framework for React apps, with routing and server features
- **React 19**: UI library used by Next.js
- **TypeScript**: Adds type safety to JavaScript
- **CSS**: Custom styling in `app/globals.css`

### AI integration

- **OpenRouter API**: Sends chat requests to a language model
- **Model used**: `openai/gpt-oss-120b:free`
- **Server-side key usage**: API key stays in `.env` and is only used in backend code

## 3) Beginner Mental Model (Important)

Think of this app as two parts:

1. **Frontend (what users see and click)**
   - `app/page.tsx` for the main page
   - `app/components/digital-twin-chat.tsx` for chat UI and interactions
   - `app/globals.css` for visual style

2. **Backend (secure logic, hidden from browser)**
   - `app/api/chat/route.ts` receives messages and calls OpenRouter
   - Uses `process.env.OPENROUTER_API_KEY` safely on the server

If you only remember one thing: **never call OpenRouter directly from browser code with your secret key**.

## 4) High-Level Walkthrough of What Was Done

### Step A: Create and configure the Next.js app

The project was set up with Next.js, React, TypeScript, and linting scripts.

You run it with:

```bash
npm install
npm run dev
```

### Step B: Build the website structure (`app/page.tsx`)

The homepage is split into sections and rendered with reusable array data.

- `careerTimeline` array for timeline cards
- `portfolioLinks` array for portfolio placeholders
- `metrics` array for highlight stats

This is beginner-friendly because content is centralized in arrays, then displayed using `.map()`.

### Step C: Build the visual design (`app/globals.css`)

A design system was created using CSS variables:

- Color tokens (`--accent`, `--surface`, `--text`)
- Consistent border radius, spacing, buttons, cards
- Responsive behavior for tablet/mobile using media queries

### Step D: Add the Digital Twin chat UI (`app/components/digital-twin-chat.tsx`)

This client component:

- Stores messages in React state (`useState`)
- Sends user text to `/api/chat`
- Shows loading state ("Thinking...")
- Displays assistant messages on the left and user messages on the right
- Auto-scrolls to latest message (`useRef` + `useEffect`)

### Step E: Add backend chat API (`app/api/chat/route.ts`)

This route:

- Validates input messages
- Reads `OPENROUTER_API_KEY` from environment variables
- Sends a server-side request to OpenRouter
- Returns the AI reply JSON to frontend
- Handles failure cases with clear status codes

### Step F: Include full LinkedIn profile in system prompt

A file was added:

- `app/lib/linkedin-profile.ts`

It exports a large string constant (`LINKEDIN_PROFILE_RAW`) extracted from `Profile.pdf` and is injected into the system prompt so the AI has your full profile context.

### Step G: Validate quality

The project was checked with:

```bash
npm run lint
npm run build
```

Both pass.

## 5) Project File Tour

- `app/layout.tsx`: Global page shell, fonts, metadata
- `app/page.tsx`: Main website sections and content
- `app/globals.css`: All styling, including chat layout
- `app/components/digital-twin-chat.tsx`: Interactive chat component
- `app/api/chat/route.ts`: Server endpoint for OpenRouter calls
- `app/lib/linkedin-profile.ts`: Full LinkedIn profile text constant
- `README.md`: Running and maintenance notes

## 6) Detailed Code Review (with Samples)

## 6.1 `app/layout.tsx`: Fonts + metadata + root HTML

This file applies global fonts and page metadata.

```tsx
import { Space_Grotesk, Sora, IBM_Plex_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Paul Cobley | Founder, Operator, Technical Architect",
  description: "Personal website for Paul Cobley ...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${sora.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

Why this matters:

- `next/font` optimizes font loading
- `metadata` helps SEO and browser tab title
- Wrapping everything in one layout keeps styles consistent

## 6.2 `app/page.tsx`: Data-first rendering pattern

Example of content arrays:

```tsx
const metrics = [
  { label: "Years Building", value: "25+" },
  { label: "Capital Raised", value: "GBP 3.5M" },
];
```

Then rendered with `.map()`:

```tsx
<div className="metric-grid">
  {metrics.map((metric) => (
    <article className="metric-card" key={metric.label}>
      <p>{metric.label}</p>
      <strong>{metric.value}</strong>
    </article>
  ))}
</div>
```

Why this matters:

- Easier updates: change data, UI updates automatically
- Better maintainability than hardcoding repeated HTML blocks

## 6.3 `app/components/digital-twin-chat.tsx`: Client-side chat logic

The component is marked client-only because it uses browser interactivity:

```tsx
"use client";
```

Submission flow:

```tsx
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ messages: nextMessages.slice(-12) }),
});
```

Auto-scroll behavior:

```tsx
useEffect(() => {
  if (!chatLogRef.current) return;
  chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
}, [messages, isLoading]);
```

Why this matters:

- Keeps chat responsive and simple
- Avoids huge payloads by sending only recent messages
- Improves UX by keeping latest message visible

## 6.4 `app/api/chat/route.ts`: Secure server-side AI call

This is the most important security pattern:

```ts
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  return NextResponse.json({ error: "OPENROUTER_API_KEY is missing..." }, { status: 500 });
}
```

Calling OpenRouter:

```ts
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "openai/gpt-oss-120b:free",
    messages: [{ role: "system", content: DIGITAL_TWIN_CONTEXT }, ...sanitizedMessages],
    temperature: 0.4,
  }),
});
```

Why this matters:

- API key never touches the browser
- Prompt controls model behavior and reduces hallucination risk
- Input is sanitized and limited before forwarding

## 6.5 Full profile context injection (`app/lib/linkedin-profile.ts`)

The system prompt includes:

```ts
import { LINKEDIN_PROFILE_RAW } from "@/app/lib/linkedin-profile";

const DIGITAL_TWIN_CONTEXT = `...
Full LinkedIn profile text:
${LINKEDIN_PROFILE_RAW}
`.trim();
```

Why this matters:

- The AI can answer from much richer context
- You reduce factual drift by supplying direct source material

## 6.6 Chat layout styling (`app/globals.css`)

Classic left/right message alignment:

```css
.chat-row-assistant {
  justify-content: flex-start;
}

.chat-row-user {
  justify-content: flex-end;
}

.chat-message {
  max-width: min(78%, 760px);
}
```

Why this matters:

- Matches user expectations from common chat apps
- Improves readability and conversation scanning

## 7) How Data Flows End-to-End

1. User types a question in the chat textarea
2. Frontend posts messages to `/api/chat`
3. API route validates and sanitizes input
4. API route builds system prompt (including full profile text)
5. API route calls OpenRouter model `openai/gpt-oss-120b:free`
6. API route returns `{ reply: "..." }`
7. Frontend appends reply to chat UI

## 8) Commands You Should Know

### Start development

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Production build check

```bash
npm run build
```

### Run production server

```bash
npm run start
```

## 9) Common Beginner Questions

### Why separate `page.tsx` and `digital-twin-chat.tsx`?

Because `page.tsx` is mainly static layout/content, while chat has interactive state. Separating concerns keeps code easier to understand.

### Why is chat in a component with `"use client"`?

Because React hooks (`useState`, `useEffect`) require client components.

### Why not call OpenRouter directly from frontend?

It would expose your secret API key to anyone opening browser dev tools.

### Why include only last 12 messages?

To reduce payload size, cost, and latency while keeping recent context.

## 10) 5 Self-Review Improvements

1. Add **streaming responses** (token-by-token output) so the AI reply appears faster and feels more natural.
2. Add **rate limiting and abuse protection** on `/api/chat` (for example by IP/session) to reduce accidental cost spikes.
3. Add **structured profile data + retrieval** (instead of one very large prompt string) for better accuracy and lower token use.
4. Add **automated tests** for API route validation and chat component behavior (loading state, error state, reset).
5. Improve **accessibility** with keyboard shortcuts, stronger ARIA labeling for message regions, and better color contrast checks.
