"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from "next-themes";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // On utilise requestAnimationFrame pour s'assurer que le rendu initial 
    // est terminé avant de forcer le montage du bouton de thème
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  // Pendant que le composant "monte", on affiche un placeholder neutre
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Optimisation du scroll avec useCallback
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const isEn = pathname.startsWith('/en');

  const toggleLanguage = () => {
    setIsOpen(false);
    const segments = pathname.split('/');
    // On remplace le premier segment (la locale)
    segments[1] = isEn ? 'fr' : 'en';
    const newPath = segments.join('/');
    router.push(newPath);
  };

  const navLinks = [
    { name: isEn ? 'Portfolio' : 'Portfolio', href: '#works' },
    { name: isEn ? 'Stack' : 'Stack', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] transition-all duration-500 px-4 py-4 pointer-events-none">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 rounded-full transition-all duration-300 border pointer-events-auto
          ${scrolled 
            ? "h-14 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-slate-200 dark:border-white/10 shadow-lg" 
            : "h-20 bg-transparent border-transparent"}`}
      >
        {/* LOGO */}
        <Link href={`/${isEn ? 'en' : 'fr'}`} className="group flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-montserrat font-black text-sm transition-transform group-hover:rotate-12 shadow-lg shadow-blue-600/20">
            M
          </div>
          <span className="font-montserrat font-black text-lg sm:text-xl tracking-tighter uppercase dark:text-white">
            Y<span className="text-blue-600">.</span>
          </span>
        </Link>
        
        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-8 text-[10px] font-montserrat font-black uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="relative group text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={toggleLanguage}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 hover:border-blue-600 transition-all active:scale-95 group bg-white/50 dark:bg-transparent"
          >
            <Languages size={14} className="text-blue-600" />
            <span className="font-montserrat font-black text-[10px] tracking-widest group-hover:text-blue-600 uppercase">
              {isEn ? 'EN' : 'FR'}
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
              {/* Overlay pour fermer le menu en cliquant à côté */}
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
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-montserrat font-black uppercase tracking-tighter hover:text-blue-600 transition-colors italic leading-none"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-[1px] w-full bg-slate-100 dark:bg-white/5 mt-2" />
                <div className="flex items-center justify-between">
                  <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-3 font-montserrat font-black text-[10px] uppercase tracking-widest text-blue-600 p-2 border border-blue-600/20 rounded-xl"
                  >
                    <Languages size={16} />
                    {isEn ? 'Switch to Français' : 'Passer en Anglais'}
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