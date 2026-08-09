"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";
import type { CurrentUser } from "@/lib/useCurrentUser";

export default function Navbar({ user }: { user: CurrentUser | null }) {
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Signed out.");
    window.location.href = "/login";
  }

  return (
    <header className="border-b border-ink/10 dark:border-parchment/10 sticky top-0 bg-parchment/80 dark:bg-ink/80 backdrop-blur-md z-40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="font-display text-lg tracking-tight flex items-center gap-2">
          Campus<span className="text-brass">Connect</span>
          {user?.role && (
            <span className="text-[10px] uppercase tracking-wider font-semibold rounded-full bg-brass/10 text-brass px-2 py-0.5">
              {user.role}
            </span>
          )}
        </Link>
        <nav className="flex items-center gap-3 text-xs sm:text-sm">
          <Link href="/dashboard" className="hover:text-brass transition-colors">
            Dashboard
          </Link>
          <Link href="/dashboard/notices" className="hover:text-brass transition-colors">
            Notices
          </Link>
          <Link href="/dashboard/attendance" className="hover:text-brass transition-colors">
            Attendance
          </Link>
          <Link href="/dashboard/assignments" className="hover:text-brass transition-colors">
            Assignments
          </Link>
          <Link href="/dashboard/events" className="hover:text-brass transition-colors">
            Events
          </Link>
          <Link href="/dashboard/placements" className="hover:text-brass transition-colors">
            Placements
          </Link>
          {user?.role === "admin" && (
            <Link href="/dashboard/admin" className="hover:text-brass font-medium text-brass transition-colors">
              Admin Panel
            </Link>
          )}
          <Link href="/dashboard/profile" className="hover:text-brass transition-colors">
            Profile
          </Link>
          <Link href="/dashboard/settings" className="hover:text-brass transition-colors">
            Settings
          </Link>
          <ThemeToggle />
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-full border border-ink/15 dark:border-parchment/20 px-3 py-1.5 hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors"
            >
              Sign out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
