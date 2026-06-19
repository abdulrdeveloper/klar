"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Eye, Loader2, EyeOff, MessageCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields before signing in.");
      return;
    }

    router.push("/chat");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 antialiased bg-[#0f1015]">

      <button
        onClick={() => router.back()}
        className="absolute top-6 right-6 group inline-flex items-center gap-2 text-sm font-medium text-[hsl(228,6%,44%)] hover:text-white transition-colors duration-200 cursor-pointer"
      >
        <ArrowLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
        Go Back
      </button>

      <div className="w-full max-w-md space-y-6">

        <div className="text-center">
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-[hsl(228,6%,44%)]">
            Continue where you left off.
          </p>
        </div>

        <div className="border border-[hsl(228,8%,14%)] bg-white/[0.02] rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-4">

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
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0f1015] border border-[hsl(228,8%,14%)] text-white pl-10 pr-4 py-2.5 rounded-xl text-sm focus:border-[hsl(38,100%,56%)] focus:ring-1 focus:ring-[hsla(38,100%,56%,0.2)] outline-none transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium text-[hsl(228,6%,44%)]">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs font-medium text-[hsl(38,100%,56%)] hover:brightness-110 transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(228,6%,44%)]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#0f1015] border border-[hsl(228,8%,14%)] text-white pl-10 pr-10 py-2.5 rounded-xl text-sm focus:border-[hsl(38,100%,56%)] focus:ring-1 focus:ring-[hsla(38,100%,56%,0.2)] outline-none transition-all placeholder:text-zinc-600"
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
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-[hsl(38,100%,58%)] to-[hsl(20,95%,55%)] text-black font-semibold text-sm shadow-[0_0_50px_-10px_hsla(38,100%,56%,0.4)] hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
              </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[hsl(228,8%,14%)]" />
            <span className="text-xs text-[hsl(228,6%,30%)]">or</span>
            <div className="flex-1 h-px bg-[hsl(228,8%,14%)]" />
          </div>

          <Link
            href="/chat"
            className="w-full py-2.5 rounded-xl border border-[hsl(228,8%,14%)] text-[hsl(228,6%,44%)] text-sm font-medium hover:bg-white/[0.04] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            Continue without account
          </Link>
        </div>

        <p className="text-center text-sm text-[hsl(228,6%,44%)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[hsl(38,100%,56%)] font-medium hover:brightness-110 transition-all"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}