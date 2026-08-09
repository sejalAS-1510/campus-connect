import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "CampusConnect — Smart Campus Management Platform",
  description:
    "A centralized, production-ready Smart Campus Platform for students, faculty, coordinators, and administrators.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-parchment dark:bg-ink text-ink dark:text-parchment selection:bg-brass selection:text-parchment transition-colors">
      {/* Header / Responsive Navigation */}
      <header className="border-b border-ink/10 dark:border-parchment/10 sticky top-0 bg-parchment/80 dark:bg-ink/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display text-xl tracking-tight flex items-center gap-2 font-bold">
            Campus<span className="text-brass">Connect</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="hover:text-brass transition-colors hidden sm:block">
              Features
            </a>
            <a href="#statistics" className="hover:text-brass transition-colors hidden sm:block">
              Statistics
            </a>
            <a href="#faq" className="hover:text-brass transition-colors hidden sm:block">
              FAQ
            </a>
            <ThemeToggle />
            <Link
              href="/login"
              className="rounded-full border border-ink/20 dark:border-parchment/20 px-4 py-2 text-xs font-medium hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-brass text-parchment px-5 py-2 text-xs font-medium hover:opacity-90 transition-opacity shadow-md"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 md:py-28 max-w-5xl mx-auto text-center space-y-8 flex-1">
        <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-4 py-1.5 text-xs text-brass font-medium">
          ✨ Powered by Next.js 14 & MongoDB Atlas
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-tight font-extrabold leading-tight">
          The Centralized Platform for <br className="hidden sm:block" />
          <span className="text-brass">Smart Campus Operations</span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-ink/70 dark:text-parchment/70 leading-relaxed">
          Manage attendance, academic assignments, campus event passes, placement drives, and official announcements through a single, responsive portal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/signup"
            className="rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-8 py-3.5 font-medium hover:opacity-90 transition-all shadow-lg text-sm"
          >
            Create Your Account
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-ink/20 dark:border-parchment/20 px-8 py-3.5 font-medium hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors text-sm"
          >
            Explore Dashboard Demo
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="border-y border-ink/10 dark:border-parchment/10 py-12 bg-ink/5 dark:bg-parchment/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-brass">10,000+</p>
            <p className="text-xs text-ink/60 dark:text-parchment/60 mt-1">Active Students</p>
          </div>
          <div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-brass">500+</p>
            <p className="text-xs text-ink/60 dark:text-parchment/60 mt-1">Faculty & Coordinators</p>
          </div>
          <div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-brass">99.8%</p>
            <p className="text-xs text-ink/60 dark:text-parchment/60 mt-1">Attendance Accuracy</p>
          </div>
          <div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-brass">150+</p>
            <p className="text-xs text-ink/60 dark:text-parchment/60 mt-1">Placement Drives</p>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="px-6 py-20 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-display text-3xl font-bold">Built for Every Role on Campus</h2>
          <p className="text-sm text-ink/60 dark:text-parchment/60 max-w-lg mx-auto">
            Role-based dashboards engineered specifically for Students, Faculty, Coordinators, and Administrators.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-ink/15 dark:border-parchment/15 p-6 bg-ink/5 dark:bg-parchment/5 space-y-3">
            <div className="text-3xl">🎓</div>
            <h3 className="font-display text-xl font-semibold">Student Portal</h3>
            <p className="text-xs text-ink/70 dark:text-parchment/70 leading-relaxed">
              Track live attendance percentages, submit GitHub/Drive assignment links, register for events with digital QR passes, and apply for job drives.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/15 dark:border-parchment/15 p-6 bg-ink/5 dark:bg-parchment/5 space-y-3">
            <div className="text-3xl">👨‍🏫</div>
            <h3 className="font-display text-xl font-semibold">Faculty Portal</h3>
            <p className="text-xs text-ink/70 dark:text-parchment/70 leading-relaxed">
              Create subject attendance sessions, mark student presence, post academic homework, and review student solution submissions in real time.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/15 dark:border-parchment/15 p-6 bg-ink/5 dark:bg-parchment/5 space-y-3">
            <div className="text-3xl">🎯</div>
            <h3 className="font-display text-xl font-semibold">Coordinator & Admin</h3>
            <p className="text-xs text-ink/70 dark:text-parchment/70 leading-relaxed">
              Manage campus fests & events, publish placement notices with CTC packages, assign user roles, delete users, and view platform analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16 border-t border-ink/10 dark:border-parchment/10 bg-ink/5 dark:bg-parchment/5">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="font-display text-3xl font-bold">Trusted by Campus Leaders</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 bg-parchment dark:bg-ink space-y-3">
              <p className="text-xs text-ink/80 dark:text-parchment/80 italic leading-relaxed">
                "CampusConnect eliminated the need for chaotic WhatsApp groups and disconnected spreadsheets. Taking attendance and reviewing student submissions now takes seconds."
              </p>
              <div>
                <p className="font-display font-medium text-sm">Dr. Rajesh Sharma</p>
                <p className="text-[11px] text-ink/50 dark:text-parchment/50">Head of Computer Science Department</p>
              </div>
            </div>

            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 bg-parchment dark:bg-ink space-y-3">
              <p className="text-xs text-ink/80 dark:text-parchment/80 italic leading-relaxed">
                "Getting instant QR event passes and tracking my subject attendance status in real time has made campus life so much smoother."
              </p>
              <div>
                <p className="font-display font-medium text-sm">Ananya Verma</p>
                <p className="text-[11px] text-ink/50 dark:text-parchment/50">Student Council President</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="px-6 py-20 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-xs text-ink/60 dark:text-parchment/60">Everything you need to know about CampusConnect.</p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 space-y-2">
            <p className="font-semibold text-base">How does role-based security work?</p>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              When users log in, a JWT token stored in an HTTP-only cookie specifies their role (Student, Faculty, Coordinator, or Admin). Backend API handlers strictly enforce role authorizations.
            </p>
          </div>

          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 space-y-2">
            <p className="font-semibold text-base">Can students submit external repository links?</p>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Yes! Students can submit GitHub repository URLs or Google Drive document links for assignments and placement applications.
            </p>
          </div>

          <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-5 space-y-2">
            <p className="font-semibold text-base">How do event QR passes work?</p>
            <p className="text-ink/70 dark:text-parchment/70 leading-relaxed">
              Upon registering for a campus event, students receive a unique digital ticket pass code that can be verified by event coordinators.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 dark:border-parchment/10 py-8 text-center text-xs text-ink/50 dark:text-parchment/50 space-y-2">
        <p>© 2026 CampusConnect — Smart Campus Management Platform for DevFusion 4.0.</p>
        <p>Built with Next.js 14, TypeScript, Tailwind CSS, & MongoDB Atlas.</p>
      </footer>
    </div>
  );
}
