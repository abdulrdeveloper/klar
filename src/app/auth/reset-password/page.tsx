"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score === 0 || password.length === 0) return { score: 0, label: "", color: "" };
  if (score === 1) return { score: 1, label: "Weak", color: "bg-red-500" };
  if (score === 2) return { score: 2, label: "Fair", color: "bg-yellow-500" };
  if (score === 3) return { score: 3, label: "Good", color: "bg-blue-400" };
  return { score: 4, label: "Strong", color: "bg-green-500" };
}

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const strength = getStrength(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (strength.score < 2) {
      setError("Password is too weak. Add uppercase, numbers, or symbols.");
      return;
    }

    setLoading(true);

    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0f1015] antialiased">

      <div className="w-full max-w-md space-y-6">

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {done ? "Password updated" : "Set new password"}
          </h1>
          <p className="mt-2 text-sm text-[hsl(228,6%,44%)]">
            {done
              ? "You can now sign in with your new password."
              : "Choose a strong password for your account."}
          </p>
        </div>

        <div className="border border-[hsl(228,8%,14%)] bg-white/[0.02] rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl">

          {!done ? (
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-medium text-[hsl(228,6%,44%)]">
                  New password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(228,6%,44%)]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
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

                {password.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= strength.score ? strength.color : "bg-[hsl(228,8%,14%)]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[hsl(228,6%,44%)]">
                      Strength:{" "}
                      <span
                        className={`font-medium ${
                          strength.score === 1
                            ? "text-red-400"
                            : strength.score === 2
                            ? "text-yellow-400"
                            : strength.score === 3
                            ? "text-blue-400"
                            : "text-green-400"
                        }`}
                      >
                        {strength.label}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="text-xs font-medium text-[hsl(228,6%,44%)]">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(228,6%,44%)]" />
                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-[#0f1015] border border-[hsl(228,8%,14%)] text-white pl-10 pr-10 py-2.5 rounded-xl text-sm focus:border-[hsl(38,100%,56%)] focus:ring-1 focus:ring-[hsla(38,100%,56%,0.2)] outline-none transition-all placeholder:text-zinc-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[hsl(228,6%,44%)] hover:text-white transition-colors cursor-pointer"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Match indicator */}
                {confirmPassword.length > 0 && (
                  <p className={`text-xs pt-0.5 ${password === confirmPassword ? "text-green-400" : "text-red-400"}`}>
                    {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
                  </p>
                )}
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
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>

          ) : (

<div className="text-center space-y-5">
              <div className="mx-auto w-14 h-14 rounded-full bg-[hsl(38,100%,56%)]/10 border border-[hsl(38,100%,56%)]/20 flex items-center justify-center text-[hsl(38,100%,56%)]">
                <ShieldCheck size={26} />
              </div>

              <p className="text-sm text-[hsl(228,6%,44%)] leading-relaxed">
                Your password has been updated successfully. Sign in to continue.
              </p>

              <Link
                href="/auth/login"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[hsl(38,100%,58%)] to-[hsl(20,95%,55%)] text-black font-semibold text-sm shadow-[0_0_50px_-10px_hsla(38,100%,56%,0.4)] hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Go to Sign in
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}