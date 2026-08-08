import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="max-w-5xl mx-auto w-full px-6 h-16 flex items-center justify-between">
        <span className="font-display text-lg tracking-tight">
          Campus<span className="text-brass">Connect</span>
        </span>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/login" className="hover:text-brass transition-colors">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-4 py-2 hover:opacity-90 transition-opacity"
          >
            Get started
          </Link>
        </div>
      </header>

      <section className="max-w-5xl mx-auto w-full px-6 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-[0.2em] text-xs text-brass mb-4">
            One register. Every class.
          </p>
          <h1 className="font-display text-5xl leading-tight mb-6">
            The campus stopped fitting in a WhatsApp group.
          </h1>
          <p className="text-ink/70 dark:text-parchment/70 text-lg mb-8 max-w-md">
            Attendance, assignments, and announcements — kept in one ledger
            instead of scattered across six apps.
          </p>
          <div className="flex gap-3">
            <Link
              href="/signup"
              className="rounded-full bg-brass text-parchment px-6 py-3 font-medium hover:opacity-90 transition-opacity"
            >
              Create your account
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-ink/20 dark:border-parchment/20 px-6 py-3 font-medium hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Signature element: a stylized attendance register strip */}
        <div className="border border-ink/15 dark:border-parchment/15 rounded-lg overflow-hidden bg-white/60 dark:bg-white/5">
          <div className="px-5 py-3 border-b border-ink/10 dark:border-parchment/10 flex items-center justify-between text-xs uppercase tracking-wide text-ink/50 dark:text-parchment/50">
            <span>Data Structures — Tue, Row 3</span>
            <span>18 / 21 present</span>
          </div>
          <ul className="divide-y divide-ink/10 dark:divide-parchment/10">
            {[
              ["Ananya Rao", true],
              ["Devika Menon", true],
              ["Kunal Verma", false],
              ["Ishaan Gupta", true],
              ["Riya Kapoor", true],
            ].map(([name, present], i) => (
              <li key={i} className="px-5 py-3 flex items-center justify-between text-sm">
                <span>{name as string}</span>
                <span
                  className={
                    present
                      ? "text-moss font-medium"
                      : "text-rust font-medium"
                  }
                >
                  {present ? "Present" : "Absent"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-5xl mx-auto w-full px-6 pb-24 grid sm:grid-cols-3 gap-8">
        {[
          {
            title: "Attendance",
            body: "Faculty take attendance in seconds. Students see their percentage per subject, always current.",
          },
          {
            title: "Assignments",
            body: "Post deadlines, collect submissions, and know at a glance who still owes work.",
          },
          {
            title: "One login",
            body: "Students and faculty each get a dashboard built for what they actually need to do.",
          },
        ].map((f) => (
          <div key={f.title}>
            <h3 className="font-display text-xl mb-2">{f.title}</h3>
            <p className="text-sm text-ink/65 dark:text-parchment/65">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
