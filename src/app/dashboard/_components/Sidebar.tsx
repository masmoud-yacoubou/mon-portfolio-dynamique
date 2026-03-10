// src/app/dashboard/_components/Sidebar.tsx
// =============================================================================
// SIDEBAR - Navigation du Dashboard
// Description : Fixe sur desktop (lg+), drawer slide-in sur mobile/tablette.
//               Fermeture via overlay ou bouton close.
// =============================================================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Briefcase,
  MessageSquare,
  LogOut,
  X,
} from "lucide-react";

// ---- Liens de navigation ----
const navLinks = [
  { label: "Vue d'ensemble", href: "/dashboard",             icon: <LayoutDashboard size={16} /> },
  { label: "Projets",        href: "/dashboard/projects",    icon: <FolderKanban    size={16} /> },
  { label: "Compétences",    href: "/dashboard/skills",      icon: <Wrench          size={16} /> },
  { label: "Expériences",    href: "/dashboard/experiences", icon: <Briefcase       size={16} /> },
  { label: "Messages",       href: "/dashboard/messages",    icon: <MessageSquare   size={16} /> },
];

interface SidebarProps {
  isOpen:   boolean;
  onClose:  () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Ferme la sidebar à chaque changement de page (mobile)
  useEffect(() => { onClose(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Bloque le scroll du body quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function isActive(href: string): boolean {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* ---- Overlay mobile (clique pour fermer) ---- */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ---- Sidebar ---- */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-white dark:bg-[#050505]
          border-r border-slate-100 dark:border-zinc-900
          flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Logo + bouton fermer (mobile) */}
        <div className="px-6 py-8 border-b border-slate-100 dark:border-zinc-900 flex items-center justify-between">
          <div>
            <div className="font-montserrat font-black text-xl uppercase tracking-tighter">
              M<span className="text-blue-600">.</span>Y
            </div>
            <div className="text-[9px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-[0.2em] mt-1">
              Dashboard Admin
            </div>
          </div>

          {/* Bouton close — visible uniquement sur mobile */}
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-slate-400 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Fermer le menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3 px-3 py-3
                text-[11px] font-black uppercase tracking-widest
                transition-all duration-200 group
                ${isActive(link.href)
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 dark:text-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white"
                }
              `}
            >
              <span className={`
                transition-transform duration-200 group-hover:scale-110
                ${isActive(link.href) ? "text-white" : "text-blue-600"}
              `}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Déconnexion */}
        <div className="px-4 py-6 border-t border-slate-100 dark:border-zinc-900">
          <button
            onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
            className="flex items-center gap-3 px-3 py-3 w-full text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/5 transition-all duration-200 group"
          >
            <LogOut size={16} className="text-red-400 group-hover:scale-110 transition-transform" />
            Déconnexion
          </button>
        </div>

      </aside>
    </>
  );
}