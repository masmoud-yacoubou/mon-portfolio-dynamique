"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import "@/app/globals.css";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-6"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      <div className="max-w-xl w-full">

        {/* Ligne décorative top */}
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
          Erreur 404
        </motion.p>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-8"
        >
          Page<br />
          <span className="text-blue-600">introuvable</span>
          <span className="text-white">.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-zinc-500 leading-relaxed mb-12 max-w-sm"
        >
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Revenez à l&apos;accueil pour continuer.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/fr"
            className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-7 py-3.5 text-xs font-bold tracking-wide overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Home size={14} className="relative z-10" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Retour à l&apos;accueil
            </span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-3 text-xs font-semibold text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-px"
          >
            <ArrowLeft size={14} />
            Page précédente
          </button>
        </motion.div>

        {/* Grand 404 décoratif */}
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