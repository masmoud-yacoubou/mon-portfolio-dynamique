// src/app/dashboard/_components/Header.tsx
// =============================================================================
// HEADER - Barre supérieure du Dashboard
// Description : Titre de page, toggle dark/light, burger menu mobile.
// =============================================================================

"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu } from "lucide-react";

// ---- Mapping pathname → titre ----
const pageTitles: Record<string, string> = {
  "/dashboard":              "Vue d'ensemble",
  "/dashboard/projects":     "Projets",
  "/dashboard/projects/new": "Nouveau Projet",
  "/dashboard/skills":       "Compétences",
  "/dashboard/skills/new":   "Nouvelle Compétence",
  "/dashboard/experiences":  "Expériences",
  "/dashboard/experiences/new": "Nouvelle Expérience",
  "/dashboard/messages":     "Messages",
};

interface HeaderProps {
  onMenuOpen: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const pathname         = usePathname();
  const { theme, setTheme } = useTheme();

  const pageTitle = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-14 lg:h-16 bg-white dark:bg-[#050505] border-b border-slate-100 dark:border-zinc-900 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">

      {/* Gauche : burger (mobile) + titre */}
      <div className="flex items-center gap-3">

        {/* Burger — visible uniquement sur mobile/tablette */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden w-9 h-9 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:text-blue-600 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu size={18} />
        </button>

        {/* Titre */}
        <div>
          <h1 className="font-montserrat font-black text-xs lg:text-sm uppercase tracking-widest text-black dark:text-white">
            {pageTitle}
          </h1>
          <div className="text-[9px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest hidden sm:block">
            Portfolio Admin
          </div>
        </div>
      </div>

      {/* Droite : toggle theme + user */}
      <div className="flex items-center gap-2 lg:gap-4">

        {/* Toggle Dark/Light */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 flex items-center justify-center border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* User */}
        <div className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-slate-100 dark:border-zinc-900">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-black">A</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-[11px] font-black uppercase tracking-widest text-black dark:text-white">
              Admin
            </div>
            <div className="text-[9px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest">
              Connecté
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}