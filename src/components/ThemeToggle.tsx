"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    // Default strictly to Light Theme if not explicitly set to dark
    const shouldBeDark = stored === "dark";
    setDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="rounded-full border border-ink/15 dark:border-parchment/20 w-9 h-9 flex items-center justify-center text-sm hover:bg-ink/5 dark:hover:bg-parchment/10 transition-colors"
    >
      {dark ? "☀︎" : "☾"}
    </button>
  );
}
