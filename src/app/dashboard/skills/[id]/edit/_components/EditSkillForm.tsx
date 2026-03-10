// src/app/dashboard/skills/[id]/edit/_components/EditSkillForm.tsx
// =============================================================================
// COMPOSANT - Formulaire d'édition de compétence
// =============================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import type { Skill } from "@prisma/client";

const CATEGORIES = ["Frontend", "Backend", "DevOps", "Design", "Mobile", "Database", "Autre"];

const inputClass =
  "w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-black dark:text-white text-sm px-4 py-3 outline-none focus:border-blue-600 transition-colors font-medium";

function Field({ label, hint, required, children }: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode;
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

export default function EditSkillForm({ skill }: { skill: Skill }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");

  const [form, setForm] = useState({
    name:     skill.name,
    level:    skill.level,
    category: skill.category,
    order:    skill.order,
  });

  function updateField<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`/api/skills/${skill.id}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Erreur."); return; }

      router.push("/dashboard/skills");
      router.refresh();

    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-5 p-6 border border-slate-100 dark:border-zinc-900">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600">
          Informations
        </h2>

        <Field label="Nom" required>
          <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} required className={inputClass} />
        </Field>

        <Field label="Catégorie" required>
          <select value={form.category} onChange={(e) => updateField("category", e.target.value)} className={inputClass}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </Field>

        <Field label={`Niveau — ${form.level}%`} hint="Déplace le curseur pour ajuster">
          <div className="space-y-3">
            <input
              type="range" min={0} max={100} step={5}
              value={form.level}
              onChange={(e) => updateField("level", parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="h-[2px] w-full bg-slate-100 dark:bg-zinc-800">
              <div className="h-full bg-blue-600 transition-all duration-200" style={{ width: `${form.level}%` }} />
            </div>
          </div>
        </Field>

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
          href="/dashboard/skills"
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black dark:hover:text-white transition-colors"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}