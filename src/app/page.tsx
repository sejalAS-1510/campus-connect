import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "CampusConnect — Smart Campus Management Platform",
  description:
    "A centralized, production-ready Smart Campus Platform built for DevFusion 4.0 Hackathon.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-parchment dark:bg-slate-950 text-ink dark:text-parchment selection:bg-brass selection:text-parchment transition-colors font-body">
      {/* Top Banner */}
      <div className="bg-ink text-parchment dark:bg-brass dark:text-ink text-[11px] font-medium tracking-wide py-1.5 px-4 text-center">
        DevFusion 4.0 Hackathon Project Submission — Problem Statement 1: Smart Campus Management Platform
      </div>

      {/* Navigation Header */}
      <header className="border-b border-ink/10 dark:border-parchment/10 sticky top-0 bg-parchment/80 dark:bg-slate-950/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-tight flex items-center gap-2 font-bold">
            Campus<span className="text-brass">Connect</span>
          </Link>
          <nav className="flex items-center gap-5 text-xs sm:text-sm font-medium">
            <a href="#features" className="hover:text-brass transition-colors hidden sm:block">
              Features
            </a>
            <a href="#portals" className="hover:text-brass transition-colors hidden sm:block">
              Role Portals
            </a>
            <a href="#faq" className="hover:text-brass transition-colors hidden sm:block">
              FAQ
            </a>
            <ThemeToggle />
            <Link
              href="/login"
              className="rounded-full border border-ink/20 dark:border-parchment/20 px-4 py-1.5 text-xs font-medium hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-brass text-parchment px-5 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto text-center space-y-7 flex-1">
        <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-4 py-1 text-xs text-brass font-medium">
          Full-Stack Next.js 14 App Router + MongoDB Atlas
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-tight font-bold leading-[1.15]">
          A Modern Operating System for <br className="hidden sm:block" />
          <span className="text-brass italic font-normal">College Campuses & Academics</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-ink/70 dark:text-parchment/70 leading-relaxed font-body">
          Eliminate WhatsApp group chaos and disconnected spreadsheets. Manage subject attendance, academic assignments, digital QR event passes, and placement drives in one clean portal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-7 py-3 text-xs font-semibold hover:opacity-90 transition-all shadow-md tracking-wide"
          >
            Create Free Account
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-ink/20 dark:border-parchment/20 px-7 py-3 text-xs font-medium hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors"
          >
            Explore Dashboard Demo
          </Link>
        </div>

        {/* Live Metrics Counter */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-ink/10 dark:border-parchment/10">
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brass">10,000+</p>
            <p className="text-[11px] text-ink/60 dark:text-parchment/60 font-medium">Enrolled Students</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brass">500+</p>
            <p className="text-[11px] text-ink/60 dark:text-parchment/60 font-medium">Faculty Members</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brass">75%</p>
            <p className="text-[11px] text-ink/60 dark:text-parchment/60 font-medium">Exam Eligibility Threshold</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-bold text-brass">150+</p>
            <p className="text-[11px] text-ink/60 dark:text-parchment/60 font-medium">Placement Drives</p>
          </div>
        </div>
      </section>

      {/* Role Portals Section */}
      <section id="portals" className="px-6 py-16 border-t border-ink/10 dark:border-parchment/10 bg-ink/5 dark:bg-parchment/5">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-display text-3xl font-bold">Tailored for Every Role</h2>
            <p className="text-xs text-ink/60 dark:text-parchment/60 max-w-md mx-auto">
              Customized role-based access control with distinct capabilities for each user.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      <section id="features" className="px-6 py-16 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl font-bold">Core Modules Overview</h2>
          <p className="text-xs text-ink/60 dark:text-parchment/60">Built to handle daily academic and administrative operations.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-xs sm:text-sm">
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

      {/* FAQ Section */}
      <section id="faq" className="px-6 py-16 border-t border-ink/10 dark:border-parchment/10 max-w-4xl mx-auto space-y-6">
        <h2 className="font-display text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-4 space-y-1">
            <p className="font-semibold text-sm">How is authentication secured?</p>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Authentication uses JWT tokens stored in HTTP-only secure cookies (`campus_token`), with Next.js middleware gating protected routes.
            </p>
          </div>
          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-4 space-y-1">
            <p className="font-semibold text-sm">Are test account credentials provided?</p>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Yes! Test accounts for Student, Faculty, Coordinator, and Admin are listed in the README file and on the login page.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 dark:border-parchment/10 py-6 text-center text-[11px] text-ink/50 dark:text-parchment/50 space-y-1">
        <p>© 2026 CampusConnect — Smart Campus Management Platform for DevFusion 4.0.</p>
        <p>Built with Next.js 14, TypeScript, Tailwind CSS, & MongoDB Atlas.</p>
      </footer>
    </div>
  );
}
