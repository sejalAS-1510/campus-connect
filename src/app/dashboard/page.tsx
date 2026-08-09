"use client";

import Link from "next/link";
import { useCurrentUser } from "@/lib/useCurrentUser";
import Navbar from "@/components/Navbar";
import AIChatbot from "@/components/AIChatbot";

export default function DashboardPage() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <main>
        <Navbar user={null} />
        <div className="max-w-5xl mx-auto px-6 py-16 animate-pulse space-y-4">
          <div className="h-8 w-64 bg-ink/10 dark:bg-parchment/10 rounded" />
          <div className="h-32 w-full bg-ink/10 dark:bg-parchment/10 rounded-lg" />
        </div>
      </main>
    );
  }

  const role = user?.role || "student";

  const showAttendance = ["student", "faculty", "admin"].includes(role);
  const showAssignments = ["student", "faculty", "admin"].includes(role);
  const showEvents = ["student", "coordinator", "admin"].includes(role);
  const showPlacements = ["student", "coordinator", "admin"].includes(role);

  return (
    <main className="min-h-screen pb-16">
      <Navbar user={user} />
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-display text-3xl">
              {role === "student" && "Student Dashboard"}
              {role === "faculty" && "Faculty Academic Dashboard"}
              {role === "coordinator" && "Events & Placement Coordinator Dashboard"}
              {role === "admin" && "Admin Control Panel & System Overview"}
            </h1>
            <span className="text-xs uppercase font-semibold rounded-full bg-brass/15 text-brass px-3 py-1">
              {role}
            </span>
          </div>
          <p className="text-sm text-ink/60 dark:text-parchment/60">
            Welcome back, <strong className="text-ink dark:text-parchment">{user?.name}</strong>. Here is your campus overview and quick actions.
          </p>
        </div>

        {/* STUDENT DASHBOARD WIDGETS */}
        {role === "student" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Today's Attendance Criteria</p>
                <p className="text-2xl font-display font-semibold text-moss mt-1">75% Target</p>
                <p className="text-[11px] text-ink/40 dark:text-parchment/40 mt-1">Status: Eligible for end-sem exams</p>
              </div>

              <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Pending Assignments</p>
                <p className="text-2xl font-display font-semibold mt-1">Homework</p>
                <Link href="/dashboard/assignments" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                  View open tasks →
                </Link>
              </div>

              <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Digital Ticket Pass</p>
                <p className="text-2xl font-display font-semibold mt-1">Event Pass</p>
                <Link href="/dashboard/events" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                  Check registered events →
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Link
                href="/dashboard/attendance"
                className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5 space-y-2"
              >
                <h3 className="font-display text-xl font-bold">View Attendance History</h3>
                <p className="text-xs text-ink/60 dark:text-parchment/60">
                  Subject-by-subject attendance percentage, present count, and monthly breakdown.
                </p>
              </Link>

              <Link
                href="/dashboard/placements"
                className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5 space-y-2"
              >
                <h3 className="font-display text-xl font-bold">Active Placement Drives</h3>
                <p className="text-xs text-ink/60 dark:text-parchment/60">
                  Explore company job openings, CTC packages, eligibility, and submit your resume link.
                </p>
              </Link>
            </div>
          </div>
        )}

        {/* FACULTY DASHBOARD WIDGETS */}
        {role === "faculty" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Academic Classes</p>
                <p className="text-2xl font-display font-semibold mt-1">Active Sessions</p>
                <Link href="/dashboard/attendance" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                  Take attendance →
                </Link>
              </div>

              <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Posted Homework</p>
                <p className="text-2xl font-display font-semibold mt-1">Assignments</p>
                <Link href="/dashboard/assignments" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                  Review student submissions →
                </Link>
              </div>

              <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Official Desk</p>
                <p className="text-2xl font-display font-semibold mt-1">Announcements</p>
                <Link href="/dashboard/notices" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                  Publish notice →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* COORDINATOR DASHBOARD WIDGETS */}
        {role === "coordinator" && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Campus Events</p>
                <p className="text-2xl font-display font-semibold mt-1">Events & Fests</p>
                <Link href="/dashboard/events" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                  Manage seats & venues →
                </Link>
              </div>

              <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Placement Cell</p>
                <p className="text-2xl font-display font-semibold mt-1">Job Drives</p>
                <Link href="/dashboard/placements" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                  View job applicants →
                </Link>
              </div>

              <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-ink/5 dark:bg-parchment/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-parchment/50">Notice Board</p>
                <p className="text-2xl font-display font-semibold mt-1">Announcements</p>
                <Link href="/dashboard/notices" className="text-xs text-brass hover:underline mt-1 inline-block font-medium">
                  Publish announcement →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN DASHBOARD WIDGETS */}
        {role === "admin" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 bg-ink/5 dark:bg-parchment/5 space-y-3">
              <h2 className="font-display text-xl font-semibold">Admin Master Control</h2>
              <p className="text-xs text-ink/60 dark:text-parchment/60">
                Manage user directory, assign roles (Student, Faculty, Coordinator, Admin), delete users, and view platform reports.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard/admin"
                  className="rounded-full bg-brass text-parchment px-5 py-2 text-xs font-medium hover:opacity-90 transition-opacity inline-block"
                >
                  Open Admin Control Panel →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation Modules Grid */}
        <div className="grid sm:grid-cols-2 gap-5 pt-4">
          {showAttendance && (
            <Link
              href="/dashboard/attendance"
              className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-xl font-bold">Attendance Module</h2>
              </div>
              <p className="text-xs text-ink/60 dark:text-parchment/60">
                Track attendance, generate session records, and check subject breakdown.
              </p>
            </Link>
          )}

          {showAssignments && (
            <Link
              href="/dashboard/assignments"
              className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-xl font-bold">Assignment Portal</h2>
              </div>
              <p className="text-xs text-ink/60 dark:text-parchment/60">
                Post homework, set deadlines, submit solutions, and inspect student links.
              </p>
            </Link>
          )}

          {showEvents && (
            <Link
              href="/dashboard/events"
              className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-xl font-bold">Events & Clubs</h2>
              </div>
              <p className="text-xs text-ink/60 dark:text-parchment/60">
                Publish campus events, manage seat capacity, and issue digital QR passes.
              </p>
            </Link>
          )}

          {showPlacements && (
            <Link
              href="/dashboard/placements"
              className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 hover:border-brass transition-all bg-ink/5 dark:bg-parchment/5"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-xl font-bold">Placement Notices</h2>
              </div>
              <p className="text-xs text-ink/60 dark:text-parchment/60">
                Post job drives, view package CTCs, submit resumes, and track applicants.
              </p>
            </Link>
          )}
        </div>
      </div>

      <AIChatbot />
    </main>
  );
}
