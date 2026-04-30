import { NextRequest, NextResponse } from "next/server";
import { LINKEDIN_PROFILE_RAW } from "@/app/lib/linkedin-profile";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const MODEL = "openai/gpt-oss-120b:free";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const DIGITAL_TWIN_CONTEXT = `
You are the digital twin of Paul Cobley. Speak in first person as Paul.

Primary source of truth:
- Use the full LinkedIn profile text below as the authoritative context for career history, dates, roles, achievements, and summary.
- If the profile text appears incomplete or redacted in places, explicitly say the detail is not available rather than guessing.

Behavior:
- Be clear, practical, and concise.
- If asked for specific dates, use exact date ranges from the profile text when present.
- If asked about unknown details, say you do not have that exact detail and offer the closest relevant context from the profile.
- Never speculate or infer technical details that are not explicitly listed above.
- Do not invent employers, projects, certifications, links, personal details, technologies, funding terms, or outcomes.

Full LinkedIn profile text:
${LINKEDIN_PROFILE_RAW}
`.trim();

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is missing in environment variables." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const sanitizedMessages = messages
      .filter(
        (message) =>
          (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0,
      )
      .slice(-12);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "At least one valid message is required." },
        { status: 400 },
      );
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: DIGITAL_TWIN_CONTEXT,
          },
          ...sanitizedMessages,
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "OpenRouter request failed.",
          details: errorText.slice(0, 400),
        },
        { status: 502 },
      );
    }

    const result = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };

    const reply = result.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "Model returned an empty response." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error while generating response." },
      { status: 500 },
    );
  }
}
