"use client";

import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import { useCurrentUser } from "@/lib/useCurrentUser";

export default function SettingsPage() {
  const { user } = useCurrentUser();

  async function handleLogoutSession() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out from active session.");
    window.location.href = "/login";
  }

  return (
    <main>
      <Navbar user={user} />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-2">Account & System Settings</h1>
        <p className="text-sm text-ink/60 dark:text-parchment/60 mb-8">
          Manage your theme, security preferences, and session management.
        </p>

        <div className="space-y-6">
          {/* Appearance Section */}
          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 bg-ink/5 dark:bg-parchment/5 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-medium">Appearance & Theme</h3>
              <p className="text-xs text-ink/60 dark:text-parchment/60">Switch between dark mode and light mode.</p>
            </div>
            <ThemeToggle />
          </div>

          {/* Session & Security */}
          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 bg-ink/5 dark:bg-parchment/5 space-y-4">
            <div>
              <h3 className="font-display text-lg font-medium">Session & JWT Security</h3>
              <p className="text-xs text-ink/60 dark:text-parchment/60">
                Your session is secured using HTTP-only JWT cookies (`campus_token`).
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-ink/10 dark:border-parchment/10">
              <div>
                <p className="text-sm font-medium">Invalidate Active Session</p>
                <p className="text-xs text-ink/50 dark:text-parchment/50">Signs out and destroys your JWT cookie token.</p>
              </div>
              <button
                onClick={handleLogoutSession}
                className="rounded-full border border-rust text-rust px-4 py-1.5 text-xs font-medium hover:bg-rust/10 transition-colors"
              >
                Invalidate Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
