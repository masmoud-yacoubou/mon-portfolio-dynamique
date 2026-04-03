"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// =============================================================================
// THEME SWITCHER
// =============================================================================

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-transparent" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-black dark:text-yellow-400 transition-all hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 border border-transparent active:scale-90"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

// =============================================================================
// NAV LINKS
// =============================================================================

const navLinks = [
  { nameEn: "Portfolio",   nameFr: "Portfolio",   href: "#works",      section: "works"      },
  { nameEn: "Stack",       nameFr: "Stack",        href: "#skills",     section: "skills"     },
  { nameEn: "Experience",  nameFr: "Expérience",   href: "#experience", section: "experience" },
  { nameEn: "Contact",     nameFr: "Contact",      href: "#contact",    section: "contact"    },
];

// =============================================================================
// NAVBAR
// =============================================================================

export default function Navbar() {
  const [isOpen, setIsOpen]         = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const router   = useRouter();

  const isEn      = pathname.startsWith("/en");
  const isHomePage = pathname === "/fr" || pathname === "/en";

  // ---- Scroll handler ----
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ---- Détection section active via IntersectionObserver ----
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = navLinks.map((l) => l.section);
    const observers: IntersectionObserver[] = [];

    // Map pour tracker quelles sections sont visibles
    const visibilityMap: Record<string, number> = {};

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.intersectionRatio;

          // La section active est celle avec le plus grand ratio visible
          const mostVisible = Object.entries(visibilityMap).reduce(
            (best, [key, ratio]) => (ratio > best.ratio ? { id: key, ratio } : best),
            { id: "", ratio: 0 }
          );

          if (mostVisible.ratio > 0) {
            setActiveSection(mostVisible.id);
          }
        },
        {
          threshold:  [0, 0.1, 0.25, 0.5, 0.75],
          rootMargin: "-10% 0px -10% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHomePage]);

  // ---- Fermer menu au changement de page ----
useEffect(() => {
  const timer = setTimeout(() => setIsOpen(false), 0);
  return () => clearTimeout(timer);
}, [pathname]);

// ---- Bloquer scroll quand menu ouvert ----
useEffect(() => {
  const timer = setTimeout(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, 0);
  return () => clearTimeout(timer);
}, [isOpen]);

  const toggleLanguage = () => {
    setIsOpen(false);
    const segments  = pathname.split("/");
    segments[1]     = isEn ? "fr" : "en";
    router.push(segments.join("/"));
  };

  return (
    <header className="fixed top-0 w-full z-[100] transition-all duration-500 px-4 py-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 rounded-full transition-all duration-300 border pointer-events-auto
          ${scrolled
            ? "h-14 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-slate-200 dark:border-white/10 shadow-lg"
            : "h-20 bg-transparent border-transparent"
          }`}
      >
        {/* LOGO */}
        {/* LOGO */}
<Link href={`/${isEn ? "en" : "fr"}`} className="group flex items-center gap-2">
  {/* Logo SVG — cohérent avec le favicon */}
  <div className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:rotate-12">
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="512" height="512" rx="80" fill="#2563eb"/>
      <rect x="88" y="136" width="56" height="256" rx="5" fill="white"/>
      <rect x="368" y="136" width="56" height="256" rx="5" fill="white"/>
      <polygon points="88,136 144,136 256,294 204,294" fill="white"/>
      <polygon points="368,136 424,136 308,294 256,294" fill="white"/>
      <circle cx="256" cy="426" r="16" fill="white" opacity="0.9"/>
      <circle cx="256" cy="426" r="8" fill="#2563eb"/>
      <rect x="88" y="452" width="336" height="5" rx="2.5" fill="rgba(255,255,255,0.25)"/>
    </svg>
  </div>
  <span className="font-montserrat font-black text-lg sm:text-xl tracking-tighter uppercase dark:text-white">
    Y<span className="text-blue-600">.</span>
  </span>
</Link>
        {/* <Link href={`/${isEn ? "en" : "fr"}`} className="group flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-montserrat font-black text-sm transition-transform group-hover:rotate-12 shadow-lg shadow-blue-600/20">
            M
          </div>
          <span className="font-montserrat font-black text-lg sm:text-xl tracking-tighter uppercase dark:text-white">
            Y<span className="text-blue-600">.</span>
          </span>
        </Link> */}

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-8 text-[10px] font-montserrat font-black uppercase tracking-[0.2em]">
          {navLinks.map((link) => {
            const isActive = isHomePage && activeSection === link.section;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {isEn ? link.nameEn : link.nameFr}

                {/* Indicateur actif */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />

                {/* Point indicateur sous le lien actif */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 hover:border-blue-600 transition-all active:scale-95 group bg-white/50 dark:bg-transparent"
          >
            <Languages size={14} className="text-blue-600" />
            <span className="font-montserrat font-black text-[10px] tracking-widest group-hover:text-blue-600 uppercase">
              {isEn ? "EN" : "FR"}
            </span>
          </button>

          <ThemeSwitcher />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center transition-all active:scale-90 shadow-lg z-[110]"
            aria-label="Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-[101] md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="absolute top-[110%] left-0 w-full bg-white dark:bg-[#0d0d0d] border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden p-8 shadow-2xl md:hidden flex flex-col gap-6 z-[102]"
              >
                {navLinks.map((link) => {
                  const isActive = isHomePage && activeSection === link.section;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl font-montserrat font-black uppercase tracking-tighter transition-colors italic leading-none flex items-center gap-4 ${
                        isActive ? "text-blue-600" : "hover:text-blue-600"
                      }`}
                    >
                      {isEn ? link.nameEn : link.nameFr}
                      {/* Point indicateur mobile */}
                      {isActive && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </Link>
                  );
                })}

                <div className="h-px w-full bg-slate-100 dark:bg-white/5 mt-2" />

                <div className="flex items-center justify-between">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-3 font-montserrat font-black text-[10px] uppercase tracking-widest text-blue-600 p-2 border border-blue-600/20 rounded-xl"
                  >
                    <Languages size={16} />
                    {isEn ? "Switch to Français" : "Passer en Anglais"}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}