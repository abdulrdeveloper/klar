"use client";

import { Check } from "lucide-react";

const INCLUDED = [
  "Free forever, no credit card needed",
  "Start chatting instantly, no signup",
  "Save and sync history once signed in",
  "Six models: Flash, Smart, Thinking, Speed, Coder, Deep",
  "Up to 20 messages per minute — unlimited per day",
  "Streaming replies, word by word",
  "Switch models mid-conversation",
  "bcrypt passwords + JWT HTTP-only cookies",
  "Fully responsive, works great on mobile",
  "Dark theme with gold accent throughout",
];

export default function IncludedSection() {
  return (
    <section className="py-16 px-5">
      <div
        className="max-w-4xl mx-auto rounded-2xl border p-8 sm:p-12"
        style={{ background: "hsl(228,14%,9%)", borderColor: "hsl(228,10%,14%)" }}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-10"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          What&apos;s included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INCLUDED.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: "hsla(38,100%,56%,0.12)",
                  color: "hsl(38,100%,58%)",
                }}
              >
                <Check size={10} />
              </span>
              <span className="text-sm" style={{ color: "hsl(210,20%,80%)" }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
