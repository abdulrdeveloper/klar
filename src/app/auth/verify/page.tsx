"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";

type Status = "loading" | "success" | "error";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();

  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>("Verifying your email...");
  const ranRef = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided.");
      return;
    }
    if (ranRef.current === true) return;
    ranRef.current = true;

  (async () => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok || data.message) {
        setStatus("success");
        setMessage(data.message || "Email verified successfully!");
      setTimeout(() => router.push("/dashboard"), 3000);
    }
     else {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        }}
      catch {
        setStatus("error");
        setMessage("Network error. Please try again.");
      }
    })();
  },[token, router]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0f1015", color: "#e5e7eb" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 text-center"
        style={{
          backgroundColor: "#1a1d24",
          border: "1px solid #2a2d34",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #d4af37, #c47820)",
          }}
        >
          {status === "loading" && (
            <Loader2 size={30} color="#0f1015" className="animate-spin" />
          )}
          {status === "success" && <CheckCircle2 size={30} color="#0f1015" />}
          {status === "error" && <XCircle size={30} color="#0f1015" />}
        </div>

        <h1 className="text-2xl font-bold mb-3">
          {status === "loading" && "Verifying..."}
          {status === "success" && "Email verified!"}
          {status === "error" && "Verification failed"}
        </h1>

        <p style={{ color: "#9ca3af" }} className="mb-8 text-sm leading-relaxed">
          {message}
        </p>

        {status === "success" && (
          <>
            <p style={{ color: "#6b7280" }} className="text-xs mb-4">
              Redirecting to dashboard in 3 seconds...
            </p>
            <Link
              href="/dashboard"
              className="inline-block w-full py-3 rounded-lg font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #d4af37, #c47820)",
                color: "#0f1015",
              }}
            >
              Go to dashboard
            </Link>
          </>
        )}

        {status === "error" && (
          <div className="space-y-3">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #d4af37, #c47820)",
                color: "#0f1015",
              }}
            >
              <Mail size={16} />
              Register again
            </Link>
            <Link
              href="/auth/login"
              className="inline-block w-full py-3 rounded-lg font-medium text-sm"
              style={{
                backgroundColor: "transparent",
                border: "1px solid #2a2d34",
                color: "#e5e7eb",
              }}
            >
              Back to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
