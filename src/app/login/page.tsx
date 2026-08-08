"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not sign in.");
        return;
      }
      toast.success(`Welcome back, ${data.user.name.split(" ")[0]}.`);
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl mb-1">Sign in</h1>
        <p className="text-sm text-ink/60 dark:text-parchment/60 mb-8">
          Welcome back to CampusConnect.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brass"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brass"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-4 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-ink/60 dark:text-parchment/60 mt-6 text-center">
          New here?{" "}
          <Link href="/signup" className="text-brass hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
