"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import "@/app/globals.css";

// ---- Contenu bilingue ----
const content = {
  fr: {
    label:       "Erreur 404",
    title:       "Page\nintrouvable",
    description: "La page que vous recherchez n'existe pas ou a été déplacée. Revenez à l'accueil pour continuer.",
    home:        "Retour à l'accueil",
    back:        "Page précédente",
    homeHref:    "/fr",
  },
  en: {
    label:       "Error 404",
    title:       "Page\nnot found",
    description: "The page you are looking for does not exist or has been moved. Go back to the home page to continue.",
    home:        "Back to home",
    back:        "Previous page",
    homeHref:    "/en",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const isEn     = pathname?.startsWith("/en") ?? false;
  const t        = isEn ? content.en : content.fr;

  return (
    <div
      className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-6"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <div className="max-w-xl w-full">

        {/* Ligne décorative */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: 0 }}
          className="h-px bg-blue-600 mb-16 w-24"
        />

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs font-semibold text-blue-600 tracking-widest uppercase mb-6"
        >
          {t.label}
        </motion.p>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-8 whitespace-pre-line"
        >
          {t.title}
          <span className="text-blue-600">.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-zinc-500 leading-relaxed mb-12 max-w-sm"
        >
          {t.description}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href={t.homeHref}
            className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-7 py-3.5 text-xs font-bold tracking-wide overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Home size={14} className="relative z-10" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              {t.home}
            </span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 text-xs font-semibold text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-px"
          >
            <ArrowLeft size={14} />
            {t.back}
          </button>
        </motion.div>

        {/* 404 décoratif */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-[180px] sm:text-[220px] font-black leading-none tracking-tighter text-white/[0.03] select-none mt-12 -mb-8"
        >
          404
        </motion.p>

      </div>
    </div>
  );
}