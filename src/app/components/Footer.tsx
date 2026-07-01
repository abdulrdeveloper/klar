"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="border-t py-6 px-5 flex flex-col sm:flex-row items-center justify-between gap-2"
      style={{ borderColor: "hsl(228,10%,13%)" }}
    >
      <div className="flex items-center gap-2.5">
        <Image src="/klar.png" alt="Klar logo" width={20} height={20} className="rounded" />
        <span className="text-xs" style={{ color: "hsl(228,6%,36%)" }}>
          © 2026 Klar
        </span>
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
  );
}
