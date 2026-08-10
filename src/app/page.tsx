"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

interface SystemStats {
  totalStudents: number;
  totalFaculty: number;
  totalEvents: number;
  totalPlacements: number;
  attendanceThreshold: string;
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState<SystemStats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-parchment dark:bg-slate-950 text-ink dark:text-parchment selection:bg-brass selection:text-parchment transition-colors font-body">
      {/* Navigation Header */}
      <header className="border-b border-ink/10 dark:border-parchment/10 sticky top-0 bg-parchment/95 dark:bg-slate-950/95 backdrop-blur-md z-50 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo: CampusConnect */}
          <Link href="/" className="font-display text-xl sm:text-2xl tracking-tight flex items-center font-bold whitespace-nowrap flex-shrink-0">
            Campus<span className="text-brass">Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium">
            <a href="#features" className="hover:text-brass transition-colors whitespace-nowrap">
              Features
            </a>
            <a href="#portals" className="hover:text-brass transition-colors whitespace-nowrap">
              Role Portals
            </a>
            <a href="#faq" className="hover:text-brass transition-colors whitespace-nowrap">
              FAQ
            </a>
            <ThemeToggle />
            <Link
              href="/login"
              className="rounded-full border border-ink/20 dark:border-parchment/20 px-4 py-1.5 text-xs font-medium hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-brass text-parchment px-5 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Link
              href="/signup"
              className="rounded-full bg-brass text-parchment px-3 py-1.5 text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg border border-ink/15 dark:border-parchment/20 text-xs font-semibold hover:bg-ink/5 dark:hover:bg-parchment/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-ink/10 dark:border-parchment/10 bg-parchment dark:bg-slate-950 px-5 py-4 space-y-3 text-sm font-medium">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 border-b border-ink/5 dark:border-parchment/5 hover:text-brass"
            >
              Features
            </a>
            <a
              href="#portals"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 border-b border-ink/5 dark:border-parchment/5 hover:text-brass"
            >
              Role Portals
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 border-b border-ink/5 dark:border-parchment/5 hover:text-brass"
            >
              FAQ
            </a>
            <div className="pt-2 flex gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center rounded-full border border-ink/20 dark:border-parchment/20 py-2 text-xs font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center rounded-full bg-brass text-parchment py-2 text-xs font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="px-5 py-12 md:py-24 max-w-5xl mx-auto text-center space-y-6 flex-1">
        <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-4 py-1 text-[11px] sm:text-xs text-brass font-medium max-w-full">
          Centralized Smart Campus & Academic Operations Platform
        </div>
        <h1 className="font-display text-3xl sm:text-6xl tracking-tight font-bold leading-[1.15]">
          A Modern Operating System for <br className="hidden sm:block" />
          <span className="text-brass italic font-normal">College Campuses & Academics</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xs sm:text-base text-ink/70 dark:text-parchment/70 leading-relaxed font-body">
          Eliminate WhatsApp group chaos and disconnected spreadsheets. Manage subject attendance, academic assignments, digital QR event passes, and placement drives in one clean portal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/signup"
            className="w-full sm:w-auto rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-7 py-3 text-xs font-semibold hover:opacity-90 transition-all shadow-md tracking-wide whitespace-nowrap"
          >
            Create Free Account
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto rounded-full border border-ink/20 dark:border-parchment/20 px-7 py-3 text-xs font-medium hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors whitespace-nowrap"
          >
            Explore Dashboard Demo
          </Link>
        </div>

        {/* Real Live Metrics Counter */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto border-t border-ink/10 dark:border-parchment/10">
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-brass">
              {stats !== null ? stats.totalStudents : "Active"}
            </p>
            <p className="text-[10px] sm:text-[11px] text-ink/60 dark:text-parchment/60 font-medium">Registered Students</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-brass">
              {stats !== null ? stats.totalFaculty : "Active"}
            </p>
            <p className="text-[10px] sm:text-[11px] text-ink/60 dark:text-parchment/60 font-medium">Faculty Members</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-brass">75%</p>
            <p className="text-[10px] sm:text-[11px] text-ink/60 dark:text-parchment/60 font-medium">Exam Eligibility Threshold</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl sm:text-3xl font-bold text-brass">
              {stats !== null ? stats.totalPlacements : "Live"}
            </p>
            <p className="text-[10px] sm:text-[11px] text-ink/60 dark:text-parchment/60 font-medium">Placement Job Drives</p>
          </div>
        </div>
      </section>

      {/* Role Portals Section */}
      <section id="portals" className="px-5 py-12 border-t border-ink/10 dark:border-parchment/10 bg-ink/5 dark:bg-parchment/5">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Tailored for Every Role</h2>
            <p className="text-xs text-ink/60 dark:text-parchment/60 max-w-md mx-auto">
              Customized role-based access control with distinct capabilities for each user.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-parchment dark:bg-slate-950 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brass">Role 01</span>
              <h3 className="font-display text-lg font-bold">Student Portal</h3>
              <p className="text-xs text-ink/70 dark:text-parchment/70 leading-relaxed">
                Track subject attendance percentages, submit assignment repository links, register for events to get QR passes, and apply for job drives.
              </p>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-parchment dark:bg-slate-950 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brass">Role 02</span>
              <h3 className="font-display text-lg font-bold">Faculty Portal</h3>
              <p className="text-xs text-ink/70 dark:text-parchment/70 leading-relaxed">
                Create subject attendance sessions, mark student presence, post academic homework, and inspect student solution links in real time.
              </p>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-parchment dark:bg-slate-950 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brass">Role 03</span>
              <h3 className="font-display text-lg font-bold">Coordinator</h3>
              <p className="text-xs text-ink/70 dark:text-parchment/70 leading-relaxed">
                Publish campus fests & events, manage seat capacity, post placement notices with CTC details, and review job applicant resumes.
              </p>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 bg-parchment dark:bg-slate-950 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brass">Role 04</span>
              <h3 className="font-display text-lg font-bold">Admin Panel</h3>
              <p className="text-xs text-ink/70 dark:text-parchment/70 leading-relaxed">
                Full access control: User directory, assign & change user roles dynamically, delete users, and view live platform analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="px-5 py-12 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Core Modules Overview</h2>
          <p className="text-xs text-ink/60 dark:text-parchment/60">Built to handle daily academic and administrative operations.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 space-y-2">
            <h3 className="font-display text-base font-bold">
              Subject Attendance & CSV Reports
            </h3>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Faculty create sessions by date and subject. Students see real-time percentage indicators. Includes a 1-click CSV report export button.
            </p>
          </div>

          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 space-y-2">
            <h3 className="font-display text-base font-bold">
              Assignment Portal & Submission Reviewer
            </h3>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Students submit GitHub repository links or text answers. Faculty can expand an interactive drawer to review student submissions.
            </p>
          </div>

          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 space-y-2">
            <h3 className="font-display text-base font-bold">
              Campus Events & Digital QR Pass
            </h3>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Coordinators set venue and registration seat limits. Registered students receive a unique digital ticket pass code.
            </p>
          </div>

          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 space-y-2">
            <h3 className="font-display text-base font-bold">
              Smart Campus AI Assistant
            </h3>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Database-connected floating assistant that answers questions about upcoming events on specific dates, open job drives, and campus FAQs.
            </p>
          </div>
        </div>
      </section>

      {/* Varied Phrasing Essential FAQ Section */}
      <section id="faq" className="px-5 py-12 border-t border-ink/10 dark:border-parchment/10 max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="font-display text-2xl font-bold">Frequently Asked Questions</h2>
          <p className="text-xs text-ink/60 dark:text-parchment/60">Quick answers to key platform capabilities.</p>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-4 space-y-1">
            <p className="font-semibold text-sm">What is the attendance requirement for semester exams?</p>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Students must maintain at least 75% attendance per subject. Live percentages and eligibility status are automatically calculated on the student dashboard.
            </p>
          </div>

          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-4 space-y-1">
            <p className="font-semibold text-sm">Can students submit external repository links for assignments?</p>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Yes. Students can attach GitHub repository links or Google Drive URLs, allowing faculty to review solution submissions directly.
            </p>
          </div>

          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-4 space-y-1">
            <p className="font-semibold text-sm">What access privileges are assigned to each user role?</p>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Each role (Student, Faculty, Coordinator, Admin) receives dedicated permissions, tailored navigation menus, and specific data access controls.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 dark:border-parchment/10 py-6 text-center text-[11px] text-ink/50 dark:text-parchment/50 space-y-1">
        <p>© 2026 CampusConnect. Smart Campus Management Platform for Colleges & Universities.</p>
        <p>Built for Students, Faculty, Coordinators, and Administrators.</p>
      </footer>
    </div>
  );
}
