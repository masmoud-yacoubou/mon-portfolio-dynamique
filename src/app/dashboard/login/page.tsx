"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-5 py-12 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/8 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="mb-9">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-blue-300">
              <Lock size={16} />
            </div>

            <div>
              <div className="font-montserrat text-sm font-black uppercase tracking-[0.22em]">
                M<span className="text-blue-400">.</span>Y
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                Dashboard Admin
              </div>
            </div>
          </div>

          <h1 className="font-montserrat text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] sm:text-5xl">
            Bon retour<span className="text-blue-400">.</span>
          </h1>

          <p className="mt-4 text-sm leading-7 text-zinc-400">
            Connecte-toi pour gérer ton portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
              Email
            </label>

            <div className="relative">
              <Mail
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ton@email.com"
                className="w-full rounded-[12px] border border-white/10 bg-white/[0.035] py-4 pl-11 pr-4 text-sm font-medium text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.22em] text-zinc-500">
              Mot de passe
            </label>

            <div className="relative">
              <Lock
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full rounded-[12px] border border-white/10 bg-white/[0.035] py-4 pl-11 pr-4 text-sm font-medium text-white outline-none transition-colors placeholder:text-zinc-700 focus:border-blue-400"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[12px] border border-red-400/20 bg-red-400/5 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-red-300"
            >
              ⚠ {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden rounded-[12px] bg-blue-600 px-8 py-4 font-montserrat text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Connexion...
              </>
            ) : (
              <>
                Se connecter
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-600">
            Accès restreint
          </span>

          <Link
            href="/fr"
            className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-blue-300"
          >
            Retour au portfolio
          </Link>
        </div>
      </motion.div>
    </main>
  );
}