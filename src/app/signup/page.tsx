"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    department: "",
    rollNumber: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not create account.");
        return;
      }
      toast.success("Welcome to CampusConnect!");
      window.location.href = "/dashboard";
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl mb-1">Create your account</h1>
        <p className="text-sm text-ink/60 dark:text-parchment/60 mb-8">
          Join as a student or faculty member.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {(["student", "faculty", "coordinator", "admin"] as const).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setForm({ ...form, role: r })}
                className={`rounded-lg border px-3 py-2 text-xs capitalize transition-colors ${
                  form.role === r
                    ? "border-brass bg-brass/10 text-brass font-medium"
                    : "border-ink/15 dark:border-parchment/20 hover:bg-ink/5 dark:hover:bg-parchment/10"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brass"
          />
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
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brass"
          />
          <input
            placeholder={form.role === "student" ? "Roll number (optional)" : "Department (optional)"}
            value={form.role === "student" ? form.rollNumber : form.department}
            onChange={(e) =>
              setForm(
                form.role === "student"
                  ? { ...form, rollNumber: e.target.value }
                  : { ...form, department: e.target.value }
              )
            }
            className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-brass"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-4 py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-sm text-ink/60 dark:text-parchment/60 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-brass hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
