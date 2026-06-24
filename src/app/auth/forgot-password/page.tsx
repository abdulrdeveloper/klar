"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Loader2, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setisSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0f1015] antialiased">

      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 group cursor-pointer inline-flex items-center gap-2 text-sm font-medium text-[hsl(228,6%,44%)] hover:text-white transition-colors duration-200"
      >
        <ArrowLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
        Go Back
      </button>

      <div className="w-full max-w-md space-y-6">

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {isSubmitted ? "Check your inbox" : "Reset your password"}
          </h1>
          <p className="mt-2 text-sm text-[hsl(228,6%,44%)]">
            {isSubmitted
              ? `We sent a reset link to ${email}`
              : "Enter your email and we'll send you a reset link."}
          </p>
        </div>

        <div className="border border-[hsl(228,8%,14%)] bg-white/[0.02] rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-[hsl(228,6%,44%)]">
                  Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(228,6%,44%)]" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#0f1015] border border-[hsl(228,8%,14%)] text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:border-[hsl(38,100%,56%)] focus:ring-1 focus:ring-[hsla(38,100%,56%,0.2)] outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[hsl(38,100%,58%)] to-[hsl(20,95%,55%)] text-black font-semibold text-sm shadow-[0_0_50px_-10px_hsla(38,100%,56%,0.4)] hover:brightness-110 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-5">
              <div className="mx-auto w-14 h-14 rounded-full bg-[hsl(38,100%,56%)]/10 border border-[hsl(38,100%,56%)]/20 flex items-center justify-center text-[hsl(38,100%,56%)]">
                <MailCheck size={26} />
              </div>

              <p className="text-sm text-[hsl(228,6%,44%)] leading-relaxed">
                Click the link in the email to reset your password. If you don't see it, check your spam folder.
              </p>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[hsl(228,8%,14%)]" />
                <span className="text-xs text-[hsl(228,6%,30%)]">or</span>
                <div className="flex-1 h-px bg-[hsl(228,8%,14%)]" />
              </div>

              <button
                onClick={() => { setisSubmitted(false); setEmail(""); }}
                className="text-xs font-medium text-[hsl(228,6%,44%)] hover:brightness-110 transition-all cursor-pointer"
              >
                Wrong email? <span className="text-xs font-medium text-[hsl(38,100%,56%)] hover:brightness-110 transition-all cursor-pointer">Try again</span>
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-[hsl(228,6%,44%)]">
          Remembered your password?{" "}
          <Link
            href="/auth/login"
            className="text-[hsl(38,100%,56%)] font-medium hover:brightness-110 transition-all"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}