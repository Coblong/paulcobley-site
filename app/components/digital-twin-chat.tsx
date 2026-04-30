"use client";

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "I am Paul's digital twin. Ask me about his career journey, founder story, technical background, or current COO work.",
  },
];

export default function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatLogRef = useRef<HTMLDivElement>(null);

  const canSend = useMemo(
    () => !isLoading && input.trim().length > 0,
    [input, isLoading],
  );

  useEffect(() => {
    if (!chatLogRef.current) return;
    chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
  }, [messages, isLoading]);

  async function submitQuestion() {
    const question = input.trim();
    if (!question || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-12),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to get a response from the digital twin.");
      }

      const data = (await response.json()) as { reply?: string };
      const reply = data.reply?.trim() || "I could not generate a response. Please try again.";

      setMessages((previous) => [...previous, { role: "assistant", content: reply }]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "There was a connection issue reaching the model. Please try your question again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitQuestion();
  }

  async function handleInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await submitQuestion();
    }
  }

  function resetChat() {
    setMessages(initialMessages);
    setInput("");
    setIsLoading(false);
  }

  return (
    <div className="chat-shell">
      <div className="chat-log" aria-live="polite" ref={chatLogRef}>
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`chat-row ${message.role === "assistant" ? "chat-row-assistant" : "chat-row-user"}`}
          >
            <article className={`chat-message chat-${message.role}`}>
              <p className="chat-role">{message.role === "assistant" ? "Digital Twin" : "You"}</p>
              <p className="chat-text">{message.content}</p>
            </article>
          </div>
        ))}
        {isLoading ? (
          <div className="chat-row chat-row-assistant">
            <article className="chat-message chat-assistant">
              <p className="chat-role">Digital Twin</p>
              <p className="chat-text">Thinking...</p>
            </article>
          </div>
        ) : null}
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <label htmlFor="twin-question" className="chat-label">
          Ask a question about Paul&apos;s career
        </label>
        <textarea
          id="twin-question"
          name="twin-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Example: What did Paul learn from pivoting PickGuru from D2C to B2B?"
          rows={3}
          disabled={isLoading}
        />
        <div className="chat-actions">
          <button type="submit" className="button button-primary" disabled={!canSend}>
            {isLoading ? "Sending..." : "Ask Digital Twin"}
          </button>
          <button type="button" className="button button-secondary" onClick={resetChat}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
