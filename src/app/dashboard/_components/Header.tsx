// src/app/dashboard/_components/Header.tsx
// =============================================================================
// HEADER - Barre supérieure du Dashboard
// Description : Affiche le titre de la page courante, le toggle dark/light
//               et les infos de l'utilisateur connecté.
// =============================================================================

"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

// ---- Mapping pathname → titre de page ----
const pageTitles: Record<string, string> = {
  "/dashboard": "Vue d'ensemble",
  "/dashboard/projects": "Projets",
  "/dashboard/projects/new": "Nouveau Projet",
  "/dashboard/skills": "Compétences",
  "/dashboard/skills/new": "Nouvelle Compétence",
  "/dashboard/experiences": "Expériences",
  "/dashboard/experiences/new": "Nouvelle Expérience",
  "/dashboard/messages": "Messages",
};

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Récupère le titre selon la page courante
  const pageTitle = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-16 bg-white dark:bg-[#050505] border-b border-slate-100 dark:border-zinc-900 flex items-center justify-between px-8 sticky top-0 z-30">

      {/* Titre de la page courante */}
      <div>
        <h1 className="font-montserrat font-black text-sm uppercase tracking-widest text-black dark:text-white">
          {pageTitle}
        </h1>
        <div className="text-[9px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest">
          Portfolio Admin
        </div>
      </div>

      {/* Actions Header */}
      <div className="flex items-center gap-4">

        {/* Toggle Dark/Light */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 flex items-center justify-center border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === "dark"
            ? <Sun size={14} />
            : <Moon size={14} />
          }
        </button>

        {/* Indicateur utilisateur connecté */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100 dark:border-zinc-900">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center">
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