// src/app/dashboard/skills/new/page.tsx
// =============================================================================
// PAGE - Créer une nouvelle compétence
// Description : Formulaire de création d'une compétence avec niveau et catégorie.
// =============================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// ---- Catégories prédéfinies ----
const CATEGORIES = [
  "Frontend",
  "Backend",
  "DevOps",
  "Design",
  "Mobile",
  "Database",
  "Autre",
];

// ---- Styles partagés ----
const inputClass =
  "w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-black dark:text-white text-sm px-4 py-3 outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300 dark:placeholder:text-zinc-700 font-medium";

// ---- Composant champ ----
function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
        {label}
        {required && <span className="text-blue-600">*</span>}
      </label>
      {children}
      {hint && (
        <p className="text-[10px] text-slate-400 dark:text-zinc-600 font-medium">{hint}</p>
      )}
    </div>
  );
}

interface SkillFormData {
  name:     string;
  level:    number;
  category: string;
  order:    number;
}

export default function NewSkillPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");

  const [form, setForm] = useState<SkillFormData>({
    name:     "",
    level:    80,
    category: "Frontend",
    order:    0,
  });

  function updateField<K extends keyof SkillFormData>(key: K, value: SkillFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/skills", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la création.");
        return;
      }

      router.push("/dashboard/skills");
      router.refresh();

    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-xl space-y-8">

      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
        <Link href="/dashboard/skills" className="hover:text-blue-600 transition-colors">
          Compétences
        </Link>
        <span>/</span>
        <span className="text-black dark:text-white">Nouvelle</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        <div className="space-y-5 p-6 border border-slate-100 dark:border-zinc-900">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600">
            Informations
          </h2>

          {/* Nom */}
          <Field label="Nom de la compétence" required>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="React, TypeScript, Docker..."
              required
              className={inputClass}
            />
          </Field>

          {/* Catégorie */}
          <Field label="Catégorie" required>
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              required
              className={inputClass}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </Field>

          {/* Niveau */}
          <Field
            label={`Niveau — ${form.level}%`}
            hint="Déplace le curseur pour ajuster le niveau"
          >
            <div className="space-y-3">
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={form.level}
                onChange={(e) => updateField("level", parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              {/* Aperçu visuel */}
              <div className="h-[2px] w-full bg-slate-100 dark:bg-zinc-800">
                <div
                  className="h-full bg-blue-600 transition-all duration-200"
                  style={{ width: `${form.level}%` }}
                />
              </div>
            </div>
          </Field>

          {/* Ordre */}
          <Field label="Ordre d'affichage" hint="0 = premier">
            <input
              type="number"
              value={form.order}
              onChange={(e) => updateField("order", parseInt(e.target.value))}
              min={0}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Erreur */}
        {error && (
          <div className="text-[11px] font-bold text-red-400 bg-red-400/5 border border-red-400/20 px-4 py-3 uppercase tracking-widest">
            ⚠ {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <><Loader2 size={14} className="animate-spin" />Création...</>
            ) : (
              "Créer la compétence"
            )}
          </button>
          <Link
            href="/dashboard/skills"
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Annuler
          </Link>
        </div>

      </form>
    </div>
  );
}