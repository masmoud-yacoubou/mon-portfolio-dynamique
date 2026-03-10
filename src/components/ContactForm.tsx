// src/components/ContactForm.tsx
// =============================================================================
// COMPOSANT - Formulaire de contact
// Description : Formulaire public qui envoie les messages via /api/contact.
//               S'intègre dans le footer du portfolio.
// =============================================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, CheckCircle } from "lucide-react";

interface FormData {
  name:    string;
  email:   string;
  subject: string;
  content: string;
}

const inputClass =
  "w-full bg-transparent border border-slate-200 dark:border-white/10 text-black dark:text-white text-sm px-4 py-3 outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300 dark:placeholder:text-white/20 font-medium";
export default function ContactForm() {
  const [form, setForm]         = useState<FormData>({ name: "", email: "", subject: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);

  function updateField(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'envoi.");
        return;
      }

      setSuccess(true);
      setForm({ name: "", email: "", subject: "", content: "" });

    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  // ---- Succès ----
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 py-12 text-center"
      >
        <CheckCircle size={32} className="text-blue-600" />
        <div>
          <p className="font-montserrat font-black text-sm uppercase tracking-widest text-white mb-2">
            Message envoyé !
          </p>
          <p className="text-xs text-white/40 font-medium">
            Je te répondrai dans les plus brefs délais.
          </p>
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:underline mt-2"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">

      {/* Nom + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            Nom <span className="text-blue-600">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
            placeholder="Ton nom"
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            Email <span className="text-blue-600">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
            placeholder="ton@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Sujet */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          Sujet
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          placeholder="Sujet de ton message"
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          Message <span className="text-blue-600">*</span>
        </label>
        <textarea
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          required
          rows={5}
          placeholder="Ton message..."
          className={inputClass}
        />
      </div>

      {/* Erreur */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[10px] font-bold text-red-400 uppercase tracking-widest"
          >
            ⚠ {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-montserrat font-black uppercase tracking-widest text-[10px] overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative z-10 flex items-center gap-3">
          {isLoading ? (
            <><Loader2 size={14} className="animate-spin" /> Envoi...</>
          ) : (
            <><Send size={14} /> Envoyer le message</>
          )}
        </span>
      </button>

    </form>
  );
}