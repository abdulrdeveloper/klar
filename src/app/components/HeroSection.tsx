"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 px-5 text-center">
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
            View source
          </a>
        </div>
      </div>
    </section>
  );
}
