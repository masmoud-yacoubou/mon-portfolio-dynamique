// src/app/dashboard/experiences/[id]/edit/_components/EditExperienceForm.tsx
// =============================================================================
// COMPOSANT - Formulaire d'édition d'expérience
// =============================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { Experience } from "@prisma/client";

const inputClass =
  "w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-black dark:text-white text-sm px-4 py-3 outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300 dark:placeholder:text-zinc-700 font-medium";

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
        {label}{required && <span className="text-blue-600">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-slate-400 dark:text-zinc-600 font-medium">{hint}</p>}
    </div>
  );
}

/**
 * Formate une date Date en string "YYYY-MM-DD" pour l'input type="date"
 */
function toDateInput(date: Date | null): string {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export default function EditExperienceForm({ experience }: { experience: Experience }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");
  const [isCurrent, setIsCurrent] = useState(!experience.endDate);

  const [form, setForm] = useState({
    role:           experience.role,
    role_en:        experience.role_en        ?? "",
    description:    experience.description,
    description_en: experience.description_en ?? "",
    company:        experience.company,
    startDate:      toDateInput(experience.startDate),
    endDate:        toDateInput(experience.endDate),
    order:          experience.order,
  });

  function updateField<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const payload = {
        ...form,
        endDate: isCurrent ? null : form.endDate || null,
      };

      const res = await fetch(`/api/experiences/${experience.id}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur."); return; }

      router.push("/dashboard/experiences");
      router.refresh();

    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Section : Contenu FR */}
      <div className="space-y-5 p-6 border border-slate-100 dark:border-zinc-900">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Contenu — Français</h2>
        <Field label="Poste / Rôle" required>
          <input type="text" value={form.role} onChange={(e) => updateField("role", e.target.value)} required className={inputClass} />
        </Field>
        <Field label="Description" required>
          <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} required rows={4} className={inputClass} />
        </Field>
      </div>

      {/* Section : Contenu EN */}
      <div className="space-y-5 p-6 border border-slate-100 dark:border-zinc-900">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Contenu — English</h2>
        <Field label="Role (EN)" hint="Optionnel">
          <input type="text" value={form.role_en} onChange={(e) => updateField("role_en", e.target.value)} className={inputClass} />
        </Field>
        <Field label="Description (EN)" hint="Optionnel">
          <textarea value={form.description_en} onChange={(e) => updateField("description_en", e.target.value)} rows={4} className={inputClass} />
        </Field>
      </div>

      {/* Section : Métadonnées */}
      <div className="space-y-5 p-6 border border-slate-100 dark:border-zinc-900">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Métadonnées</h2>

        <Field label="Entreprise" required>
          <input type="text" value={form.company} onChange={(e) => updateField("company", e.target.value)} required className={inputClass} />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Date de début" required>
            <input type="date" value={form.startDate} onChange={(e) => updateField("startDate", e.target.value)} required className={inputClass} />
          </Field>

          <Field label="Date de fin" hint={isCurrent ? "Poste actuel" : ""}>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setIsCurrent(!isCurrent)}
                  className={`w-10 h-5 relative transition-colors duration-200 ${isCurrent ? "bg-blue-600" : "bg-slate-200 dark:bg-zinc-800"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white transition-transform duration-200 ${isCurrent ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                  Poste actuel
                </span>
              </label>
              {!isCurrent && (
                <input type="date" value={form.endDate} onChange={(e) => updateField("endDate", e.target.value)} className={inputClass} />
              )}
            </div>
          </Field>
        </div>

        <Field label="Ordre d'affichage">
          <input type="number" value={form.order} onChange={(e) => updateField("order", parseInt(e.target.value))} min={0} className={inputClass} />
        </Field>
      </div>

      {error && (
        <div className="text-[11px] font-bold text-red-400 bg-red-400/5 border border-red-400/20 px-4 py-3 uppercase tracking-widest">
          ⚠ {error}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all disabled:opacity-50"
        >
          {isLoading ? <><Loader2 size={14} className="animate-spin" />Sauvegarde...</> : "Sauvegarder"}
        </button>
        <Link
          href="/dashboard/experiences"
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black dark:hover:text-white transition-colors"
        >
          Annuler
        </Link>
      </div>

    </form>
  );
}