"use client";

import { useState } from "react";
import DigitalTwinChat from "./digital-twin-chat";

export default function DigitalTwinWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <aside id="digital-twin-chat" className="chat-widget-panel" aria-label="Digital Twin Chat">
          <header className="chat-widget-header">
            <div>
              <p className="chat-widget-kicker">AI Career Chat</p>
              <h3>Paul&apos;s Digital Twin</h3>
            </div>
            <button
              type="button"
              className="chat-widget-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              Close
            </button>
          </header>
          <div className="chat-widget-body">
            <DigitalTwinChat />
          </div>
        </aside>
      ) : null}

      <button
        type="button"
        className="button button-primary chat-fab"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="digital-twin-chat"
      >
        {isOpen ? "Hide Chat" : "Chat with Paul"}
      </button>
    </>
  );
}
