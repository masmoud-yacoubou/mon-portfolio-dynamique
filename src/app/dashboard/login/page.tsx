// src/app/dashboard/login/page.tsx
// =============================================================================
// PAGE DE LOGIN - Dashboard Admin
// Description : Page d'authentification pour accéder au dashboard.
//               Design cohérent avec le portfolio (noir/blanc/bleu, Montserrat).
// =============================================================================

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // ---- État du formulaire ----
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ---- Soumission du formulaire ----
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect.");
        return;
      }

      router.push("/dashboard");
      router.refresh();

    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* --- Décoration de fond --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      {/* --- Carte Login --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        {/* En-tête */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 flex items-center justify-center">
              <Lock size={16} className="text-white" />
            </div>
            <div>
              <div className="font-montserrat font-black text-sm uppercase tracking-widest">
                M<span className="text-blue-600">.</span>Y
              </div>
              <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
                Dashboard Admin
              </div>
            </div>
          </div>

          <h1 className="font-montserrat text-4xl font-black uppercase tracking-tighter leading-[1.1] mb-3">
            Bon retour<span className="text-blue-600">.</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium">
            Connecte-toi pour gérer ton portfolio.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Champ Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Email
            </label>
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ton@email.com"
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm pl-10 pr-4 py-4 outline-none focus:border-blue-600 transition-colors placeholder:text-zinc-700 font-medium"
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Mot de passe
            </label>
            <div className="relative">
              <Lock
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm pl-10 pr-4 py-4 outline-none focus:border-blue-600 transition-colors placeholder:text-zinc-700 font-medium"
              />
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[11px] font-bold text-red-400 bg-red-400/5 border border-red-400/20 px-4 py-3 uppercase tracking-widest"
            >
              ⚠ {error}
            </motion.div>
          )}

          {/* Bouton Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="group w-full relative bg-blue-600 text-white px-8 py-4 font-montserrat font-black uppercase tracking-widest text-[11px] overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2"
          >
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </span>
          </button>
        </form>

        {/* Footer de la carte */}
        <div className="mt-10 pt-6 border-t border-zinc-900 flex items-center justify-between">
          <span className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest">
            Accès restreint
          </span>
          
            <a 
            className="text-[9px] font-bold text-zinc-600 hover:text-blue-600 uppercase tracking-widest transition-colors"
          >
            Retour au portfolio
          </a>
        </div>

      </motion.div>
    </main>
  );
}