"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Loader2, RotateCcw } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1015] px-4 sm:px-6 lg:px-8 antialiased">

      <button
        onClick={() => router.back()}
        className="absolute top-6 right-6 group inline-flex items-center gap-2 text-sm font-medium text-[hsl(228,6%,44%)] hover:text-white transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
        Go Back
      </button>

      <div className="w-full max-w-md space-y-6">

        <div className="text-center">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "hsla(38,100%,56%,0.1)", color: "hsl(38,100%,58%)" }}
          >
            <Mail size={22} />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Check your email
          </h1>
          <p className="mt-2 text-sm text-[hsl(228,6%,44%)]">
            We sent a 6-digit code to your email.{" "}
            <br />Enter it below to verify your account.
          </p>
        </div>

        <div className="border border-[hsl(228,8%,14%)] bg-white/[0.02] rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-11 h-12 sm:w-12 sm:h-13 text-center text-lg font-bold bg-[#0f1015] border border-[hsl(228,8%,14%)] text-white rounded-xl focus:border-[hsl(38,100%,56%)] focus:ring-1 focus:ring-[hsla(38,100%,56%,0.2)] outline-none transition-all"
              />
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-[hsl(228,6%,32%)]">
          Wrong email?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-[hsl(228,6%,50%)] hover:text-white transition-colors cursor-pointer"
          >
            Go back and change it
          </button>
        </p>

      </div>
    </div>
  );
}