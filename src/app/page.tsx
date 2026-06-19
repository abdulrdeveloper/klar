"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageSquare,
  Save,
  Zap,
  Brain,
  Lock,
  Sparkles,
  Check,
  Code,
  User,
  Bot,
} from "lucide-react";


const NAV_LINKS = [
  { label: "Models", href: "#models" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

const STATS = [
  { value: "6", label: "AI Models" },
  { value: "20/min", label: "Requests" },
  { value: "$0", label: "Forever Free" },
  { value: "No", label: "Credit Card" },
];

const MODELS = [
  { name: "Flash", tag: "Default", desc: "Fast answers, no login needed.", free: true },
  { name: "Smart", tag: "Balanced", desc: "Deeper reasoning for complex topics.", free: false },
  { name: "Thinking", tag: "Logic", desc: "Step-by-step math & problem solving.", free: false },
  { name: "Speed", tag: "Quick", desc: "Fastest response for simple queries.", free: false },
  { name: "Coder", tag: "Dev", desc: "Code reviews, debugging, explanations.", free: false },
  { name: "Deep", tag: "Research", desc: "Long-form, thorough analysis.", free: false },
];

const FEATURES = [
  { icon: MessageSquare, title: "No signup required", desc: "Open Klar and start chatting with Flash instantly. No email, no password, no friction." },
  { icon: Save, title: "Persistent history", desc: "Sign up free and every conversation is saved, searchable, and synced across devices." },
  { icon: Brain, title: "Step-by-step reasoning", desc: "The Thinking model works through math and logic out loud instead of jumping to an answer." },
  { icon: Code, title: "Built for coding", desc: "The Coder model handles debugging, code reviews, and programming questions natively." },
  { icon: Lock, title: "Secure by default", desc: "bcrypt-hashed passwords, JWT sessions in HTTP-only cookies. Your chats are yours." },
  { icon: Zap, title: "Unlimited per day", desc: "No daily cap — send as many messages as you need. Rate limited to 20/min to keep things fair." },
];

const STEPS = [
  { num: "01", title: "Open and chat", desc: "Klar loads with Flash ready to go. Ask anything — homework, code, concepts." },
  { num: "02", title: "Need more power?", desc: "Locked models show a one-tap prompt to sign in when you try to use them." },
  { num: "03", title: "Sign up in seconds", desc: "Create a free account to unlock all 6 models and save every conversation." },
];

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

const CHAT_PREVIEW = [
  { role: "user", text: "Can you explain Newton's second law simply?" },
  { role: "ai", text: "Sure! F = ma — Force equals mass times acceleration. Push a heavy object harder, it moves faster. Simple as that." },
  { role: "user", text: "Can you give me a real-world example?" },
  { role: "ai", text: "Kicking a soccer ball: your foot applies force, the ball has mass, so it accelerates. Kick harder → ball moves faster." },
];

export default function Home() {
  return (
    <div className="min-h-screen text-white bg-[#0f1015]">

      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "hsla(228, 18%, 7%, 0.85)",
          borderColor: "hsl(228, 10%, 13%)",
          backdropFilter: "blur(12px)",
        }}
      >

        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">

          <div>
            <Image src="/klar.webp" alt="Klar logo" width={28} height={28} priority className="rounded-md" />
          </div>

          <div className="hidden sm:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: "hsl(228, 6%, 50%)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 justify-end">
            <a
              href="https://github.com/abdulrdeveloper/klar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              className="p-2 rounded-lg transition-colors hover:text-white"
              style={{ color: "hsl(228, 6%, 50%)" }}
            >
              <Code size={18} />
            </a>
            <Link
              href="/auth/login"
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all hover:brightness-110"
              style={{ background: "hsl(38, 100%, 56%)", color: "hsl(228, 18%, 7%)" }}
            >
              Sign In
            </Link>
          </div>

        </div>
      </nav>

      <section className="pt-28 pb-16 px-5 text-center">
        <div className="max-w-2xl mx-auto">

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-8 border"
            style={{
              background: "hsla(38, 100%, 56%, 0.08)",
              borderColor: "hsla(38, 100%, 56%, 0.25)",
              color: "hsl(38, 100%, 62%)",
            }}
          >
            <Sparkles size={11} />
            Free AI for students
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Your AI tutor is here.{" "}
            <span className="gold-gradient">It&apos;s called Klar.</span>
          </h1>

          <p
            className="text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
            style={{ color: "hsl(228, 6%, 48%)" }}
          >
            Chat instantly — no login needed. Sign up free to unlock all models and keep your conversations saved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link
              href="/chat"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, hsl(38,100%,58%) 0%, hsl(20,95%,55%) 100%)",
                color: "hsl(228, 18%, 7%)",
                boxShadow: "0 0 40px -8px hsla(38, 100%, 56%, 0.5)",
              }}
            >
              Start chatting — free
              <ArrowRight size={15} />
            </Link>

            <a
              href="https://github.com/abdulrdeveloper/klar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 border transition-all hover:brightness-125"
              style={{
                borderColor: "hsl(228, 10%, 22%)",
                background: "hsla(228, 10%, 18%, 0.7)",
                color: "hsl(228, 6%, 80%)",
              }}
            >
              <Code size={15} />
              View source
            </a>
          </div>
        </div>

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

        <div
          className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border"
          style={{ borderColor: "hsl(228, 10%, 13%)", background: "hsl(228, 10%, 11%)" }}>
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="py-6 px-4 flex flex-col items-center"
              style={{ background: "hsl(228, 16%, 8%)" }}
            >
              <span className="text-2xl font-bold font-mono" style={{ color: "hsl(38, 100%, 58%)" }}>
                {stat.value}
              </span>
              <span className="text-xs mt-1" style={{ color: "hsl(228, 6%, 44%)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="models" className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "hsl(38, 100%, 56%)" }}>Models</p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Pick the right model for the job
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MODELS.map((model) => (
              <div
                key={model.name}
                className="rounded-xl p-5 border flex flex-col gap-2 transition-all duration-300 hover:scale-101 hover:-translate-y-0.5 hover:border-[hsla(38,100%,56%,0.4)] group" style={{
                  background: model.free ? "hsla(38,100%,56%,0.04)" : "hsl(228, 14%, 9%)",
                  borderColor: model.free ? "hsla(38,100%,56%,0.3)" : "hsl(228, 10%, 14%)",
                }}>
                <div className="flex items-center justify-between">
                  <span
                    className="font-semibold text-sm"
                    style={{ fontFamily: "'Outfit', sans-serif", color: model.free ? "hsl(38,100%,62%)" : "hsl(210,20%,92%)" }}
                  >
                    {model.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                      style={{ background: "hsla(228,10%,14%,0.6)", borderColor: "hsl(228,10%,18%)", color: "hsl(228,6%,50%)" }}
                    >
                      {model.tag}
                    </span>
                    {model.free ? (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                        style={{ background: "hsla(38,100%,56%,0.1)", borderColor: "hsla(38,100%,56%,0.3)", color: "hsl(38,100%,62%)" }}
                      >
                        Free
                      </span>
                    ) : (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                        style={{ background: "hsla(228,10%,14%,0.6)", borderColor: "hsl(228,10%,18%)", color: "hsl(228,6%,38%)" }}
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

      <section id="features" className="py-16 px-5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "hsl(38, 100%, 56%)" }}>Features</p>
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
                  <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "'Outfit', sans-serif", color: "hsl(210,20%,92%)" }}>
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

      <section id="how-it-works" className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "hsl(38, 100%, 56%)" }}>How it works</p>
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
                  style={{ background: "hsl(228,18%,7%)", borderColor: "hsla(38,100%,56%,0.3)", color: "hsl(38,100%,58%)" }}
                >
                  {step.num}
                </div>
                <div className="pb-10">
                  <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "'Outfit', sans-serif", color: "hsl(210,20%,92%)" }}>
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
                  style={{ background: "hsla(38,100%,56%,0.12)", color: "hsl(38,100%,58%)" }}
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

      <section className="py-24 px-5 text-center">
        <div className="max-w-xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Ready to get <span className="gold-gradient">Klar?</span>
          </h2>
          <p className="mb-8 text-sm" style={{ color: "hsl(228,6%,44%)" }}>
            Flash is ready right now. No account, no card, no wait.
          </p>
          <Link
            href="/chat"
            className="px-8 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2 transition-all hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, hsl(38,100%,58%) 0%, hsl(20,95%,55%) 100%)",
              color: "hsl(228, 18%, 7%)",
              boxShadow: "0 0 50px -10px hsla(38, 100%, 56%, 0.55)",
            }}
          >
            Launch Klar <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <footer
        className="border-t py-6 px-5 flex flex-col sm:flex-row items-center justify-between gap-2"
        style={{ borderColor: "hsl(228,10%,13%)" }}
      >
        <div className="flex items-center gap-2.5">
          <Image src="/klar.webp" alt="Klar logo" width={20} height={20} className="rounded" />
          <span className="text-xs" style={{ color: "hsl(228,6%,36%)" }}>© 2026 Klar</span>
        </div>
        <p className="text-xs" style={{ color: "hsl(228,6%,32%)" }}>
          Built for students by{" "}
          <a
            href="https://abdulrdeveloper.me"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: "hsl(228,6%,44%)" }}
          >
            abdulrdeveloper
          </a>
        </p>
      </footer>
    </div>
  );
}
