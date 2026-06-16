"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageSquare,
  Save,
  Zap,
  Brain,
  Code,
  Lock,
  Sparkles,
  Star,
  Check,
} from "lucide-react";

export default function Home() {
  const stats = [
    { value: "6+", label: "AI Models" },
    { value: "20", label: "Messages/min" },
    { value: "$0", label: "Forever Free" },
    { value: "No", label: "Credit Card" },
  ];

  const features = [
    { icon: MessageSquare, title: "Guest Chat", desc: "Jump straight in with the Flash model. No account, no email, no waiting." },
    { icon: Save, title: "Save History", desc: "Create a free account and every conversation is saved and synced automatically." },
    { icon: Zap, title: "Six AI Models", desc: "Flash, Smart, Thinking, Speed, Coder, and Deep — each tuned for a different kind of question." },
    { icon: Brain, title: "Step-by-Step Reasoning", desc: "The Thinking model walks through math and logic instead of jumping to an answer." },
    { icon: Code, title: "Coding Help", desc: "The Coder model is built for debugging, code reviews, and programming questions." },
    { icon: Lock, title: "Secure by Default", desc: "Passwords hashed with bcrypt, sessions in HTTP-only cookies. Your chats stay yours." },
  ];

  const steps = [
    { num: 1, title: "Start chatting", desc: "Open Klar and chat with the Flash model instantly. No email, no password, no wait." },
    { num: 2, title: "Hit a wall?", desc: "Locked models like Coder and Deep show a quick \u2018Sign in to unlock\u2019 prompt when you need them." },
    { num: 3, title: "Sign up free", desc: "Create an account in seconds to unlock all 6 models and keep every conversation saved." },
  ];

  const checklist = [
    ["Free forever, no credit card", "Start chatting with zero signup", "Save & sync history once you sign in", "Six models: Flash, Smart, Thinking, Speed, Coder, Deep", "20 free messages a day"],
    ["Streaming replies, not a wall of text", "Switch models per conversation", "Built with bcrypt, JWT & HTTP-only cookies", "Works great on mobile", "Dark theme with a gold accent throughout"],
  ];

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 glass border-b border-[hsl(228,8%,14%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/klar.webp" alt="Klar" width={32} height={32} className="rounded" />
          </div>
          <Link href="/login" className="px-5 py-2 rounded-lg bg-gradient-to-r from-[hsl(38,100%,58%)] to-[hsl(20,95%,55%)] text-black text-sm font-semibold flex items-center gap-1.5 hover:brightness-110 transition-all">
            Sign In <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[hsla(38,100%,56%,0.3)] bg-[hsla(38,100%,56%,0.08)] text-[#f8930e] text-sm font-medium mb-8">
            <Sparkles size={14} /> Free AI Chat for Students
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6">
            The AI Study Assistant
            <br />
            Built for <span className="gold-gradient">Students</span>
          </h1>

          <p className="text-base sm:text-lg text-[hsl(228,6%,44%)] mb-8 sm:mb-10 max-w-xl mx-auto px-2">
            Chat instantly with AI for homework, coding, and learning. Sign up for free to unlock all models and save your conversations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0">
            <Link href="/chat" className="w-full sm:w-auto justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-[hsl(38,100%,58%)] to-[hsl(20,95%,55%)] text-black font-semibold text-sm sm:text-base shadow-[0_0_50px_-10px_hsla(38,100%,56%,0.6)] hover:brightness-110 transition-all inline-flex items-center gap-2">
              <Star size={18} /> Start Chatting — It&apos;s Free
            </Link>

            <a href="https://github.com/abdulrdeveloper/klar" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all inline-flex items-center gap-2" >
              <Code size={18} /> View Source
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20">
          {stats.map((stat, i) => (
            <div key={i} className="border border-[hsl(228,8%,14%)] bg-white/[0.02] rounded-xl p-6">
              <div className="font-heading text-3xl font-bold text-[hsl(38,100%,56%)]">{stat.value}</div>
              <div className="text-xs text-[hsl(228,6%,44%)] mt-1 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="border border-[hsl(228,8%,14%)] bg-white/[0.02] rounded-xl p-6 hover:border-[#ffad1f66] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[hsla(38,100%,56%,0.1)] flex items-center justify-center mb-4 text-[hsl(38,100%,56%)]">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading font-bold mb-1.5">{feature.title}</h3>
                <p className="text-sm text-[hsl(228,6%,44%)]">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="border border-[hsl(228,8%,14%)] bg-white/[0.02] rounded-xl p-6 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[hsla(38,100%,56%,0.1)] text-[hsl(38,100%,56%)] font-heading font-bold flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-heading font-bold mb-1.5">{step.title}</h3>
                <p className="text-sm text-[hsl(228,6%,44%)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto border border-[hsl(228,8%,14%)] bg-white/[0.02] rounded-xl p-10">
          <h2 className="font-heading text-3xl font-bold text-center mb-10">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {checklist.map((col, i) => (
              <div key={i} className="space-y-4">
                {col.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[hsla(38,100%,56%,0.15)] text-[hsl(38,100%,56%)] flex items-center justify-center shrink-0">
                      <Check size={12} />
                    </span>
                    <span className="text-[hsl(210,20%,96%)] text-[15px]">{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl font-bold mb-4">Ready to Get Klar?</h2>
          <p className="text-[hsl(228,6%,44%)] mb-8">
            Start chatting with the Flash model right now — free, no signup.
          </p>
          <Link
            href="/chat"
            className="px-10 py-3 rounded-lg bg-gradient-to-r from-[hsl(38,100%,58%)] to-[hsl(20,95%,55%)] text-black font-semibold text-lg shadow-[0_0_50px_-10px_hsla(38,100%,56%,0.6)] hover:brightness-110 transition-all inline-flex items-center gap-2"
          >
            <Zap size={18} /> Launch Klar
          </Link>
        </div>
      </section>

      <footer className="border-t border-[hsl(228,8%,14%)] py-5 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-[hsl(228,6%,44%)]">© 2026 Klar. Built for students.</p>
      </footer>
    </div>
  );
}
