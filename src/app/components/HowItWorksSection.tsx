"use client";

const STEPS = [
  {
    num: "01",
    title: "Open and chat",
    desc: "Klar loads with Flash ready to go. Ask anything — homework, code, concepts.",
  },
  {
    num: "02",
    title: "Need more power?",
    desc: "Locked models show a one-tap prompt to sign in when you try to use them.",
  },
  {
    num: "03",
    title: "Sign up in seconds",
    desc: "Create a free account to unlock all 6 models and save every conversation.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "hsl(38, 100%, 56%)" }}>
            How it works
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Three steps to get started
          </h2>
        </div>

        <div className="flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex gap-5 items-start relative">
              {i < STEPS.length - 1 && (
                <div
                  className="absolute left-[19px] top-10 bottom-0 w-px"
                  style={{ background: "hsl(228,10%,14%)" }}
                />
              )}
              <div
                className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 z-10 text-xs font-bold font-mono"
                style={{
                  background: "hsl(228,18%,7%)",
                  borderColor: "hsla(38,100%,56%,0.3)",
                  color: "hsl(38,100%,58%)",
                }}
              >
                {step.num}
              </div>
              <div className="pb-10">
                <h3
                  className="font-semibold text-sm mb-1"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: "hsl(210,20%,92%)",
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(228,6%,44%)" }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
