"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, CheckCircle, ArrowRight } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  content: string;
}

const inputClass =
  "w-full bg-transparent border-b border-white/15 text-white text-sm px-0 py-4 outline-none transition-all duration-500 placeholder:text-white/25 focus:border-blue-400 focus:pl-1";

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function updateField(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start justify-center py-16"
      >
        <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
          <CheckCircle size={30} className="text-white" />
        </div>

        <h3 className="mb-3 font-montserrat text-3xl font-black uppercase tracking-[-0.05em] text-white">
          Message reçu.
        </h3>

        <p className="mb-8 max-w-sm text-sm leading-7 text-white/50">
          Votre message a bien été transmis. Je reviens vers vous très rapidement.
        </p>

        <button
          onClick={() => setSuccess(false)}
          className="group inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-blue-300 transition-colors hover:text-white"
        >
          Envoyer un autre
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.28em] text-white/35">
            Nom <span className="text-blue-400">.</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
            placeholder="Votre nom"
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.28em] text-white/35">
            Email <span className="text-blue-400">.</span>
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

      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.28em] text-white/35">
          Objet
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          placeholder="Collaboration, projet, question..."
          className={inputClass}
        />
      </div>

      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.28em] text-white/35">
          Message <span className="text-blue-400">.</span>
        </label>
        <textarea
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          required
          rows={5}
          placeholder="Votre message..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-300" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isLoading}
        className="group inline-flex w-full items-center justify-center gap-4 rounded-full bg-white px-9 py-4 font-montserrat text-[10px] font-black uppercase tracking-[0.22em] text-slate-950 transition-all duration-500 hover:bg-blue-500 hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Traitement...
          </>
        ) : (
          <>
            Transmettre
            <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </>
        )}
      </button>
    </form>
  );
}