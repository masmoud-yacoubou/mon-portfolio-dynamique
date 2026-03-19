// src/components/ContactForm.tsx
// =============================================================================
// COMPOSANT - Formulaire de contact
// Description : Formulaire public qui envoie les messages via /api/contact.
//               Compatible dark/light mode — s'adapte au contexte footer sombre.
// =============================================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, CheckCircle, ArrowRight } from "lucide-react";

interface FormData {
  name:    string;
  email:   string;
  subject: string;
  content: string;
}

// Inputs style underline — fond transparent, compatible dark/light
const inputClass =
  "w-full bg-transparent border-b border-white/20 text-white text-sm px-0 py-4 outline-none focus:border-blue-600 transition-all duration-300 placeholder:text-white/20 font-medium focus:pl-2";

export default function ContactForm() {
  const [form, setForm]           = useState<FormData>({ name: "", email: "", subject: "", content: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState(false);

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

  // ---- État succès ----
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-white" />
        </div>
        <h3 className="font-montserrat font-black text-2xl uppercase tracking-tighter mb-2 text-white">
          Message Reçu !
        </h3>
        <p className="text-sm text-white/40 font-medium max-w-[280px] mb-8">
          Votre message a bien été transmis. Je reviens vers vous très rapidement.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 hover:text-white transition-colors flex items-center gap-2"
        >
          Envoyer un autre <ArrowRight size={14} />
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">

      {/* Nom + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            Nom <span className="text-blue-600">.</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
            placeholder="Votre Nom"
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            Email <span className="text-blue-600">.</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
            placeholder="votre@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Sujet */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          Objet
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          placeholder="Collaboration, Question, etc."
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          Message <span className="text-blue-600">.</span>
        </label>
        <textarea
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          required
          rows={4}
          placeholder="Votre Message ici..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Erreur */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-blue-600 text-white px-12 py-5 font-montserrat font-black uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-300">
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Traitement...
            </>
          ) : (
            <>
              Transmettre
              <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </span>
      </button>

    </form>
  );
}