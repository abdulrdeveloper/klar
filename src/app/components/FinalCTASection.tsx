"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  return (
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
  );
}
