"use client";

import Link from "next/link";
import Image from "next/image";
import { Code } from "lucide-react";

const NAV_LINKS = [
  { label: "Models", href: "#models" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export default function Navigation() {
  return (
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
          <Image
            src="/klar.png"
            alt="Klar logo"
            width={28}
            height={28}
            priority
            className="rounded-md"
          />
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
  );
}
