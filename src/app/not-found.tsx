import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-parchment dark:bg-ink text-ink dark:text-parchment">
      <div className="space-y-4 max-w-md">
        <h1 className="font-display text-6xl font-bold text-brass">404</h1>
        <h2 className="font-display text-2xl font-semibold">Page Not Found</h2>
        <p className="text-sm text-ink/60 dark:text-parchment/60 leading-relaxed">
          The campus page or resource you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/dashboard"
            className="rounded-full bg-brass text-parchment px-6 py-2.5 text-xs font-medium hover:opacity-90 transition-opacity inline-block"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
