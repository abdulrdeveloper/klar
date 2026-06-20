"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Loader2, RotateCcw } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index: number, value: string) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }
    setLoading(true);
    setError("");
    router.push("/chat");
  };

  const handleResend = () => {
    alert("Verification code resent!");
    setError("");
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (pasted.length === 0) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

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
                onPaste={handlePaste}
                className="w-11 h-12 sm:w-12 sm:h-13 text-center text-lg font-bold bg-[#0f1015] border border-[hsl(228,8%,14%)] text-white rounded-xl focus:border-[hsl(38,100%,56%)] focus:ring-1 focus:ring-[hsla(38,100%,56%,0.2)] outline-none transition-all"
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs text-center font-medium">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || otp.join("").length < 6}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[hsl(38,100%,58%)] to-[hsl(20,95%,55%)] text-black font-semibold text-sm shadow-[0_0_50px_-10px_hsla(38,100%,56%,0.4)] hover:brightness-110 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          <div className="text-center pt-2">
            {canResend ? (
              <button
                onClick={handleResend}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[hsl(38,100%,56%)] hover:brightness-110 transition-all cursor-pointer"
              >
                <RotateCcw size={13} />
                Resend code
              </button>
            ) : (
              <p className="text-xs text-[hsl(228,6%,40%)]">
                Resend code in{" "}
                <span className="text-[hsl(228,6%,60%)] font-mono font-medium">
                  00:{String(timer).padStart(2, "0")}
                </span>
              </p>
            )}
          </div>

          <div className="border-t border-[hsl(228,8%,14%)] pt-4 text-center text-xs text-[hsl(228,6%,40%)]">
            Wrong email?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-[hsl(38,100%,56%)] hover:underline transition-all cursor-pointer font-medium"
            >
              Go back and change it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}