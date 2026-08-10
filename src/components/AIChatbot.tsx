"use client";

import { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I'm your Smart Campus AI Assistant. Ask me about attendance policies, placement criteria, assignments, or campus events!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply || "Sorry, I couldn't process that request." }]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong connecting to Campus AI." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-brass text-parchment px-4 py-3 shadow-xl hover:scale-105 transition-transform flex items-center gap-2 font-medium text-xs sm:text-sm"
        >
          <span>Campus AI Assistant</span>
        </button>
      ) : (
        <div className="w-[calc(100vw-32px)] sm:w-96 max-w-sm rounded-2xl border border-ink/15 dark:border-parchment/15 bg-parchment dark:bg-ink p-4 shadow-2xl space-y-3 flex flex-col h-[400px] sm:h-[430px]">
          <div className="flex items-center justify-between border-b border-ink/10 dark:border-parchment/10 pb-2">
            <h3 className="font-display font-bold text-sm">
              Campus AI Assistant
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-ink/50 dark:text-parchment/50 hover:text-ink dark:hover:text-parchment px-1.5 py-0.5"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs leading-relaxed">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl max-w-[85%] ${
                  m.sender === "user"
                    ? "bg-brass text-parchment ml-auto rounded-tr-none font-medium"
                    : "bg-ink/5 dark:bg-parchment/10 text-ink dark:text-parchment rounded-tl-none whitespace-pre-line"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && <p className="text-[11px] text-ink/40 dark:text-parchment/40 italic">AI Assistant is typing…</p>}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 pt-2 border-t border-ink/10 dark:border-parchment/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask campus FAQ..."
              className="flex-1 rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-1.5 text-xs outline-none focus:border-brass"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brass text-parchment px-3 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
