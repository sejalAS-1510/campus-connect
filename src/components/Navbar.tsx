"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";
import type { CurrentUser } from "@/lib/useCurrentUser";

export default function Navbar({ user }: { user: CurrentUser | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Signed out.");
    window.location.href = "/login";
  }

  const role = user?.role || "student";

  const showAttendance = ["student", "faculty", "admin"].includes(role);
  const showAssignments = ["student", "faculty", "admin"].includes(role);
  const showEvents = ["student", "coordinator", "admin"].includes(role);
  const showPlacements = ["student", "coordinator", "admin"].includes(role);
  const showAdminPanel = role === "admin";

  return (
    <header className="border-b border-ink/10 dark:border-parchment/10 sticky top-0 bg-parchment/95 dark:bg-ink/95 backdrop-blur-md z-40 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Attached Logo Brand Name: CampusConnect */}
        <Link href="/dashboard" className="font-display text-lg font-bold tracking-tight flex items-center gap-1.5 whitespace-nowrap flex-shrink-0">
          <span>Campus<span className="text-brass">Connect</span></span>
          {user?.role && (
            <span className="text-[10px] uppercase tracking-wider font-semibold rounded-full bg-brass/10 text-brass px-2 py-0.5">
              {user.role}
            </span>
          )}
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-4 text-xs sm:text-sm font-medium flex-wrap">
          <Link href="/dashboard" className="hover:text-brass transition-colors whitespace-nowrap">
            Dashboard
          </Link>
          <Link href="/dashboard/notices" className="hover:text-brass transition-colors whitespace-nowrap">
            Notices
          </Link>

          {showAttendance && (
            <Link href="/dashboard/attendance" className="hover:text-brass transition-colors whitespace-nowrap">
              Attendance
            </Link>
          )}

          {showAssignments && (
            <Link href="/dashboard/assignments" className="hover:text-brass transition-colors whitespace-nowrap">
              Assignments
            </Link>
          )}

          {showEvents && (
            <Link href="/dashboard/events" className="hover:text-brass transition-colors whitespace-nowrap">
              Events
            </Link>
          )}

          {showPlacements && (
            <Link href="/dashboard/placements" className="hover:text-brass transition-colors whitespace-nowrap">
              Placements
            </Link>
          )}

          {showAdminPanel && (
            <Link href="/dashboard/admin" className="hover:text-brass font-bold text-brass transition-colors whitespace-nowrap">
              Admin Panel
            </Link>
          )}

          <Link href="/dashboard/profile" className="hover:text-brass transition-colors whitespace-nowrap">
            Profile
          </Link>
          <Link href="/dashboard/settings" className="hover:text-brass transition-colors whitespace-nowrap">
            Settings
          </Link>
          <ThemeToggle />

          {user && (
            <button
              onClick={handleLogout}
              className="rounded-full border border-ink/15 dark:border-parchment/20 px-3.5 py-1.5 text-xs font-semibold hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Sign out
            </button>
          )}
        </nav>

        {/* Mobile Hamburger & Controls */}
        <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="px-3 py-1.5 rounded-lg border border-ink/15 dark:border-parchment/20 text-xs font-semibold hover:bg-ink/5 dark:hover:bg-parchment/10 whitespace-nowrap"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? "✕ Close" : "☰ Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-ink/10 dark:border-parchment/10 bg-parchment dark:bg-ink px-6 py-4 space-y-3 text-sm font-medium shadow-xl">
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="block py-1.5 hover:text-brass transition-colors border-b border-ink/5 dark:border-parchment/5"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/notices"
            onClick={() => setMobileOpen(false)}
            className="block py-1.5 hover:text-brass transition-colors border-b border-ink/5 dark:border-parchment/5"
          >
            Notices
          </Link>

          {showAttendance && (
            <Link
              href="/dashboard/attendance"
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 hover:text-brass transition-colors border-b border-ink/5 dark:border-parchment/5"
            >
              Attendance
            </Link>
          )}

          {showAssignments && (
            <Link
              href="/dashboard/assignments"
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 hover:text-brass transition-colors border-b border-ink/5 dark:border-parchment/5"
            >
              Assignments
            </Link>
          )}

          {showEvents && (
            <Link
              href="/dashboard/events"
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 hover:text-brass transition-colors border-b border-ink/5 dark:border-parchment/5"
            >
              Events
            </Link>
          )}

          {showPlacements && (
            <Link
              href="/dashboard/placements"
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 hover:text-brass transition-colors border-b border-ink/5 dark:border-parchment/5"
            >
              Placements
            </Link>
          )}

          {showAdminPanel && (
            <Link
              href="/dashboard/admin"
              onClick={() => setMobileOpen(false)}
              className="block py-1.5 text-brass font-bold hover:underline border-b border-ink/5 dark:border-parchment/5"
            >
              Admin Panel
            </Link>
          )}

          <Link
            href="/dashboard/profile"
            onClick={() => setMobileOpen(false)}
            className="block py-1.5 hover:text-brass transition-colors border-b border-ink/5 dark:border-parchment/5"
          >
            Profile
          </Link>
          <Link
            href="/dashboard/settings"
            onClick={() => setMobileOpen(false)}
            className="block py-1.5 hover:text-brass transition-colors border-b border-ink/5 dark:border-parchment/5"
          >
            Settings
          </Link>

          {user && (
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="w-full rounded-full border border-rust text-rust px-4 py-2 text-xs font-semibold hover:bg-rust/10 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
