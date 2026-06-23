"use client";

import {
  MessageSquare,
  Save,
  Brain,
  Code,
  Lock,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "No signup required",
    desc: "Open Klar and start chatting with Flash instantly. No email, no password, no friction.",
  },
  {
    icon: Save,
    title: "Persistent history",
    desc: "Sign up free and every conversation is saved, searchable, and synced across devices.",
  },
  {
    icon: Brain,
    title: "Step-by-step reasoning",
    desc: "The Thinking model works through math and logic out loud instead of jumping to an answer.",
  },
  {
    icon: Code,
    title: "Built for coding",
    desc: "The Coder model handles debugging, code reviews, and programming questions natively.",
  },
  {
    icon: Lock,
    title: "Secure by default",
    desc: "bcrypt-hashed passwords, JWT sessions in HTTP-only cookies. Your chats are yours.",
  },
  {
    icon: Zap,
    title: "Unlimited per day",
    desc: "No daily cap — send as many messages as you need. Rate limited to 20/min to keep things fair.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "hsl(38, 100%, 56%)" }}>
            Features
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Everything you need, nothing you don&apos;t
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl p-5 border transition-all duration-300 hover:scale-101 hover:-translate-y-0.4 hover:border-[hsla(38,100%,56%,0.4)]"
                style={{
                  background: "hsl(228, 14%, 9%)",
                  borderColor: "hsl(228, 10%, 14%)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: "hsla(38,100%,56%,0.1)", color: "hsl(38,100%,58%)" }}
                >
                  <Icon size={16} />
                </div>
                <h3
                  className="font-semibold text-sm mb-1"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: "hsl(210,20%,92%)",
                  }}
                >
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(228,6%,44%)" }}>
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
