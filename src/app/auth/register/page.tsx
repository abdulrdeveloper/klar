"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  User,
  MessageCircle,
  MailCheck,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      console.log("User registered successfully");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setCooldown(30);
    await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1015] px-4 sm:px-6 lg:px-8 antialiased">
      <button
        onClick={() => router.back()}
        className="absolute cursor-pointer top-6 left-6 group inline-flex items-center gap-2 text-sm font-medium text-[hsl(228,6%,44%)] hover:text-white transition-colors duration-200"
      >
        <ArrowLeft
          size={16}
          className="transform group-hover:-translate-x-0.5 transition-transform"
        />
        Go Back
      </button>

      <div className="w-full max-w-md space-y-6">
        {!submitted && (
          <div className="text-center">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-[hsl(228,6%,44%)]">
              Free forever. No credit card needed.
            </p>
          </div>
        )}

        <div className="border border-[hsl(228,8%,14%)] bg-white/[0.02] rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          {!submitted ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-[hsl(228,6%,44%)]"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(228,6%,44%)]"
                    />
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-[#0f1015] border border-[hsl(228,8%,14%)] text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:border-[hsl(38,100%,56%)] focus:ring-1 focus:ring-[hsla(38,100%,56%,0.2)] outline-none transition-all "
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-[hsl(228,6%,44%)]"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(228,6%,44%)]"
                    />
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#0f1015] border border-[hsl(228,8%,14%)] text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:border-[hsl(38,100%,56%)] focus:ring-1 focus:ring-[hsla(38,100%,56%,0.2)] outline-none transition-all "
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-[hsl(228,6%,44%)]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(228,6%,44%)]"
                    />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full bg-[#0f1015] border border-[hsl(228,8%,14%)] text-white pl-10 pr-10 py-2.5 rounded-xl text-sm focus:border-[hsl(38,100%,56%)] focus:ring-1 focus:ring-[hsla(38,100%,56%,0.2)] outline-none transition-all "
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[hsl(228,6%,44%)] hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs text-center font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[hsl(38,100%,58%)] to-[hsl(20,95%,55%)] text-black font-semibold text-sm shadow-[0_0_50px_-10px_hsla(38,100%,56%,0.4)] hover:brightness-110 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="flex items-center gap-3 mt-4">
                <div className="flex-1 h-px bg-[hsl(228,8%,14%)]" />
                <span className="text-xs text-[hsl(228,6%,30%)]">or</span>
                <div className="flex-1 h-px bg-[hsl(228,8%,14%)]" />
              </div>

              <Link
                href="/chat"
                className="mt-4 w-full py-2.5 rounded-xl border border-[hsl(228,8%,14%)] text-[hsl(228,6%,44%)] text-sm font-medium hover:bg-white/[0.04] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                Continue without account
              </Link>
            </>
          ) : (
            <div className="text-center space-y-5">
              <div className="mx-auto w-14 h-14 rounded-full bg-[hsl(38,100%,56%)]/10 border border-[hsl(38,100%,56%)]/20 flex items-center justify-center text-[hsl(38,100%,56%)]">
                <MailCheck size={26} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Check your email
                </h2>
                <p className="text-sm text-[hsl(228,6%,44%)] leading-relaxed">
                  We've sent a secure authentication link to{" "}
                  <span className="text-white font-medium">{email}</span>. Click
                  the link to verify and access your account.
                </p>
              </div>

              <button
                onClick={handleResend}
                disabled={cooldown > 0}
                className="text-xs font-medium text-[hsl(228,6%,44%)] transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center gap-1.5 mx-auto"
              >
                {cooldown > 0 ? (
                  <span className="text-green-400">
                    Sent! Resend in {cooldown}s
                  </span>
                ) : (
                  <>
                    Didn't receive it?{" "}
                    <span className="text-[hsl(38,100%,56%)] hover:brightness-125 transition-all">
                      Resend email
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[hsl(228,8%,14%)]" />
                <span className="text-xs text-[hsl(228,6%,30%)]">or</span>
                <div className="flex-1 h-px bg-[hsl(228,8%,14%)]" />
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-medium text-[hsl(228,6%,44%)] hover:brightness-110 transition-all"
              >
                Wrong email?{" "}
                <span className="text-[hsl(38,100%,56%)] cursor-pointer hover:brightness-110 transition-all">
                  Change it
                </span>
              </button>
            </div>
          )}
        </div>

        {!submitted && (
          <p className="text-center text-sm text-[hsl(228,6%,44%)]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[hsl(38,100%,56%)] font-medium hover:brightness-110 transition-all"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
