"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function GithubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/repos/sudoKrishna/goltUI")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      href="https://github.com/sudoKrishna/goltUI"
      target="_blank"
      rel="noreferrer"
      className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/30 hover:text-white sm:flex"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
      <span className="tabular-nums">{stars ?? "193"}</span>
    </a>
  );
}

function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}

const navLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Blocks", href: "/blocks" },
  { label: "Templates", href: "#templates" },
  { label: "Components", href: "/components" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
          gotlUI
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <GithubStars />
        </div>
      </nav>
    </header>
  );
}
