"use client";

import { ArrowRight, User, Bot } from "lucide-react";

const CHAT_PREVIEW = [
  { role: "user", text: "Can you explain Newton's second law simply?" },
  { role: "ai", text: "Sure! F = ma — Force equals mass times acceleration. Push a heavy object harder, it moves faster. Simple as that." },
  { role: "user", text: "Can you give me a real-world example?" },
  { role: "ai", text: "Kicking a soccer ball: your foot applies force, the ball has mass, so it accelerates. Kick harder → ball moves faster." },
];

export default function ChatPreviewSection() {
  return (
    <div className="max-w-2xl mx-auto mb-16 px-5">
      <div
        className="rounded-2xl border overflow-hidden text-left"
        style={{
          background: "hsl(228, 16%, 8%)",
          borderColor: "hsl(228, 10%, 13%)",
          boxShadow: "0 32px 64px -16px hsla(228,18%,4%,0.8)",
        }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: "hsl(228, 10%, 13%)" }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(0,70%,55%)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(40,80%,55%)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(120,50%,45%)" }} />
          <span className="ml-3 text-xs font-medium" style={{ color: "hsl(228,6%,38%)" }}>
            Klar · Flash
          </span>
          <span
            className="ml-auto text-[10px] px-2 py-0.5 rounded-full border"
            style={{
              background: "hsla(38,100%,56%,0.08)",
              borderColor: "hsla(38,100%,56%,0.2)",
              color: "hsl(38,100%,62%)",
            }}
          >
            Free
          </span>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {CHAT_PREVIEW.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div key={i} className={`flex gap-3 items-start ${isUser ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: isUser ? "hsla(38,100%,56%,0.12)" : "hsl(228,14%,12%)",
                    color: isUser ? "hsl(38,100%,62%)" : "hsl(228,6%,55%)",
                  }}
                >
                  {isUser ? <User size={13} /> : <Bot size={13} />}
                </div>
                <div
                  className="max-w-[75%] rounded-xl px-4 py-2.5 text-xs leading-relaxed border"
                  style={{
                    background: isUser ? "hsla(38,100%,56%,0.08)" : "hsl(228,14%,11%)",
                    borderColor: isUser ? "hsla(38,100%,56%,0.2)" : "hsl(228,10%,14%)",
                    color: isUser ? "hsl(38,100%,72%)" : "hsl(210,20%,82%)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          <div className="flex gap-3 items-start">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "hsl(228,14%,12%)", color: "hsl(228,6%,55%)" }}
            >
              <Bot size={13} />
            </div>
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-1.5 border"
              style={{ background: "hsl(228,14%,11%)", borderColor: "hsl(228,10%,14%)" }}
            >
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ background: "hsl(228,6%,40%)", animationDelay: `${delay}ms`, animationDuration: "1s" }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3 border"
            style={{ background: "hsl(228,14%,11%)", borderColor: "hsl(228,10%,16%)" }}
          >
            <span className="text-xs flex-1" style={{ color: "hsl(228,6%,32%)" }}>
              Ask anything...
            </span>
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(38,100%,58%) 0%, hsl(20,95%,55%) 100%)" }}
            >
              <ArrowRight size={11} style={{ color: "hsl(228,18%,7%)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
