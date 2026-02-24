"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020202] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[150px] sm:text-[200px] font-black leading-none tracking-tighter italic text-zinc-100 dark:text-zinc-900 absolute -top-24 left-1/2 -translate-x-1/2 -z-10 select-none"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter dark:text-white mb-6 italic">
            Perdu dans le <span className="text-blue-600">vide ?</span>
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 max-w-md mx-auto mb-10 font-medium">
            La page que vous recherchez n&apos;existe pas ou a été déplacée vers une autre dimension.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 border border-slate-200 dark:border-zinc-800 dark:text-white rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
            >
              <ArrowLeft size={16} /> Retour
            </button>
            <Link 
              href="/"
              className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
            >
              <Home size={16} /> Accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}