"use client";

import { Lock } from "lucide-react";

const MODELS = [
  { name: "Flash", tag: "Default", desc: "Fast answers, no login needed.", free: true },
  { name: "Smart", tag: "Balanced", desc: "Deeper reasoning for complex topics.", free: false },
  { name: "Thinking", tag: "Logic", desc: "Step-by-step math & problem solving.", free: false },
  { name: "Speed", tag: "Quick", desc: "Fastest response for simple queries.", free: false },
  { name: "Coder", tag: "Dev", desc: "Code reviews, debugging, explanations.", free: false },
  { name: "Deep", tag: "Research", desc: "Long-form, thorough analysis.", free: false },
];

export default function ModelsSection() {
  return (
    <section id="models" className="py-16 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "hsl(38, 100%, 56%)" }}>
            Models
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Pick the right model for the job
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MODELS.map((model) => (
            <div
              key={model.name}
              className="rounded-xl p-5 border flex flex-col gap-2 transition-all duration-300 hover:scale-101 hover:-translate-y-0.5 hover:border-[hsla(38,100%,56%,0.4)] group"
              style={{
                background: model.free ? "hsla(38,100%,56%,0.04)" : "hsl(228, 14%, 9%)",
                borderColor: model.free ? "hsla(38,100%,56%,0.3)" : "hsl(228, 10%, 14%)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-semibold text-sm"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: model.free ? "hsl(38,100%,62%)" : "hsl(210,20%,92%)",
                  }}
                >
                  {model.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                    style={{
                      background: "hsla(228,10%,14%,0.6)",
                      borderColor: "hsl(228,10%,18%)",
                      color: "hsl(228,6%,50%)",
                    }}
                  >
                    {model.tag}
                  </span>
                  {model.free ? (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                      style={{
                        background: "hsla(38,100%,56%,0.1)",
                        borderColor: "hsla(38,100%,56%,0.3)",
                        color: "hsl(38,100%,62%)",
                      }}
                    >
                      Free
                    </span>
                  ) : (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                      style={{
                        background: "hsla(228,10%,14%,0.6)",
                        borderColor: "hsl(228,10%,18%)",
                        color: "hsl(228,6%,38%)",
                      }}
                    >
                      <Lock size={9} className="inline mr-0.5" />
                      Sign in
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(228,6%,44%)" }}>
                {model.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
