"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"request" | "reset">("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoOtp, setDemoOtp] = useState<string | null>(null);

  async function handleRequestOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not generate OTP.");
        return;
      }
      toast.success("OTP sent to your email!");
      if (data.otp) setDemoOtp(data.otp);
      setStep("reset");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not reset password.");
        return;
      }
      toast.success("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl mb-1">Reset Password</h1>
        <p className="text-sm text-ink/60 dark:text-parchment/60 mb-8">
          {step === "request"
            ? "Enter your account email to receive a verification OTP."
            : "Enter the OTP code and your new password."}
        </p>

        {demoOtp && step === "reset" && (
          <div className="mb-4 rounded-lg bg-brass/10 border border-brass/20 p-3 text-xs text-brass">
            🔑 <strong>Demo OTP Code:</strong> {demoOtp}
          </div>
        )}

        {step === "request" ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <input
              required
              type="email"
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brass"
            />
            <button
              disabled={loading}
              className="w-full rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-4 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
            >
              {loading ? "Sending OTP…" : "Send Reset OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              required
              placeholder="6-Digit OTP Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brass"
            />
            <input
              required
              type="password"
              placeholder="New Password (min 6 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brass"
            />
            <button
              disabled={loading}
              className="w-full rounded-full bg-brass text-parchment px-4 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
            >
              {loading ? "Resetting…" : "Update Password"}
            </button>
          </form>
        )}

        <p className="text-sm text-ink/60 dark:text-parchment/60 mt-6 text-center">
          Remembered your password?{" "}
          <Link href="/login" className="text-brass hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
