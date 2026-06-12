"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Languages, Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { nameEn: "Portfolio", nameFr: "Portfolio", href: "#works", section: "works" },
  { nameEn: "Stack", nameFr: "Stack", href: "#skills", section: "skills" },
  { nameEn: "Experience", nameFr: "Expérience", href: "#experience", section: "experience" },
  { nameEn: "Contact", nameFr: "Contact", href: "#contact", section: "contact" },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-[var(--color-light-border)] dark:border-[var(--color-night-border)]" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-light-border)] bg-[var(--color-light-surface)]/80 text-[var(--color-light-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-surface)]/80 dark:text-[var(--color-night-text-secondary)] dark:hover:border-blue-300 dark:hover:text-blue-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function LogoMark() {
  return (
    <div className="relative h-11 w-11 overflow-hidden rounded-full">
      <Image
        src="/logo-my.svg"
        alt="Masmoud Yacoubou"
        fill
        priority
        className="object-contain"
        sizes="44px"
      />
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const isEn = pathname.startsWith("/en");
  const localeRoot = `/${isEn ? "en" : "fr"}`;
  const isHomePage = pathname === "/fr" || pathname === "/en";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) return;

    const observers: IntersectionObserver[] = [];
    const visibilityMap: Record<string, number> = {};

    for (const link of navLinks) {
      const el = document.getElementById(link.section);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[link.section] = entry.intersectionRatio;
          const mostVisible = Object.entries(visibilityMap).reduce(
            (best, [key, ratio]) => (ratio > best.ratio ? { id: key, ratio } : best),
            { id: "", ratio: 0 }
          );
          if (mostVisible.ratio > 0) setActiveSection(mostVisible.id);
        },
        {
          threshold: [0, 0.15, 0.35, 0.55, 0.75],
          rootMargin: "-15% 0px -22% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function toggleLanguage() {
    setIsOpen(false);
    const segments = pathname.split("/");
    segments[1] = isEn ? "fr" : "en";
    router.push(segments.join("/"));
  }

  function getNavHref(href: string) {
    return isHomePage ? href : `${localeRoot}/${href}`;
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-all duration-300 sm:px-4 ${
          scrolled
            ? "border-[var(--color-light-border)] bg-[var(--color-light-bg)]/92 shadow-[0_18px_54px_-42px_rgba(15,23,42,0.4)] backdrop-blur-xl dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-bg)]/88"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Logo + name */}
        <Link href={localeRoot} className="group flex min-w-0 items-center gap-3">
          <LogoMark />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = isHomePage && activeSection === link.section;
            return (
              <Link
                key={link.href}
                href={getNavHref(link.href)}
                className={`relative text-[10px] font-black uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive
                    ? "text-[var(--color-accent)] dark:text-blue-300"
                    : "text-[var(--color-light-text-secondary)] hover:text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-secondary)] dark:hover:text-[var(--color-night-text-primary)]"
                }`}
              >
                {isEn ? link.nameEn : link.nameFr}
                {isActive && (
                  <motion.span
                    layoutId="nav-line"
                    className="absolute -bottom-2 left-0 h-px w-full bg-[var(--color-accent)] dark:bg-blue-300"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language switcher — desktop */}
          <button
            onClick={toggleLanguage}
            className="hidden items-center gap-2 rounded-full border border-[var(--color-light-border)] bg-[var(--color-light-surface)]/80 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-light-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-surface)]/80 dark:text-[var(--color-night-text-secondary)] dark:hover:border-blue-300 dark:hover:text-blue-300 sm:flex"
            type="button"
          >
            <Languages size={14} />
            {isEn ? "EN" : "FR"}
          </button>

          <ThemeSwitcher />

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-light-border)] bg-[var(--color-light-surface)]/80 text-[var(--color-light-text-primary)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-surface)]/80 dark:text-[var(--color-night-text-primary)] dark:hover:border-blue-300 md:hidden"
            aria-label="Menu"
            type="button"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-[var(--color-light-text-primary)]/25 backdrop-blur-sm dark:bg-[var(--color-night-bg)]/60 md:hidden"
              />

              {/* Panel */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 top-[calc(100%+10px)] rounded-[26px] border border-[var(--color-light-border)] bg-[var(--color-light-bg)] p-4 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.38)] dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-bg)] md:hidden"
              >
                {/* Drawer header */}
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-heading text-xs font-black uppercase tracking-[0.22em] text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)]">
                      Navigation
                    </div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-light-text-secondary)] dark:text-[var(--color-night-text-secondary)]">
                      Portfolio public
                    </div>
                  </div>

                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 rounded-full border border-[var(--color-light-border)] bg-[var(--color-light-surface)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-light-text-secondary)] dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-surface)] dark:text-[var(--color-night-text-secondary)]"
                    type="button"
                  >
                    <Languages size={14} />
                    {isEn ? "Français" : "English"}
                  </button>
                </div>

                {/* Nav items */}
                <div className="grid gap-2">
                  {navLinks.map((link) => {
                    const isActive = isHomePage && activeSection === link.section;
                    return (
                      <Link
                        key={link.href}
                        href={getNavHref(link.href)}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-sm font-black uppercase tracking-[0.16em] transition-all ${
                          isActive
                            ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-light-text-primary)] dark:text-[var(--color-night-text-primary)]"
                            : "border-[var(--color-light-border)] bg-[var(--color-light-surface)]/70 text-[var(--color-light-text-secondary)] hover:text-[var(--color-light-text-primary)] dark:border-[var(--color-night-border)] dark:bg-[var(--color-night-surface-soft)] dark:text-[var(--color-night-text-secondary)] dark:hover:text-[var(--color-night-text-primary)]"
                        }`}
                      >
                        <span>{isEn ? link.nameEn : link.nameFr}</span>
                        <ArrowUpRight size={16} />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}