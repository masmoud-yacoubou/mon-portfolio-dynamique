// src/app/dashboard/projects/new/page.tsx
// =============================================================================
// PAGE - Créer un nouveau projet
// Description : Formulaire complet de création d'un projet.
//               Gère le multilingue FR/EN et les technologies.
// =============================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import ImageUpload from "../../_components/ImageUpload";

// ---- Types ----
interface ProjectFormData {
  title:          string;
  title_en:       string;
  description:    string;
  description_en: string;
  imageUrl:       string;
  slug:           string;
  link:           string;
  githubUrl:      string;
  technologies:   string[];
  featured:       boolean;
  order:          number;
}

// ---- Composant champ de formulaire ----
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
        <p className="text-[10px] text-slate-400 dark:text-zinc-600 font-medium">
          {hint}
        </p>
      )}
    </div>
  );
}

// ---- Styles partagés pour les inputs ----
const inputClass =
  "w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-black dark:text-white text-sm px-4 py-3 outline-none focus:border-blue-600 transition-colors placeholder:text-slate-300 dark:placeholder:text-zinc-700 font-medium";

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");
  const [techInput, setTechInput] = useState("");

  // ---- État du formulaire ----
  const [form, setForm] = useState<ProjectFormData>({
    title:          "",
    title_en:       "",
    description:    "",
    description_en: "",
    imageUrl:       "",
    slug:           "",
    link:           "",
    githubUrl:      "",
    technologies:   [],
    featured:       false,
    order:          0,
  });

  /**
   * Met à jour un champ du formulaire
   */
  function updateField<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  /**
   * Génère automatiquement le slug depuis le titre FR
   */
  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  /**
   * Ajoute une technologie à la liste
   */
  function addTechnology() {
    const tech = techInput.trim();
    if (!tech || form.technologies.includes(tech)) return;
    updateField("technologies", [...form.technologies, tech]);
    setTechInput("");
  }

  /**
   * Supprime une technologie de la liste
   */
  function removeTechnology(tech: string) {
    updateField(
      "technologies",
      form.technologies.filter((t) => t !== tech)
    );
  }

  /**
   * Soumet le formulaire
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/projects", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la création.");
        return;
      }

      // Succès → retour à la liste
      router.push("/dashboard/projects");
      router.refresh();

    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-8">

      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
        <Link href="/dashboard/projects" className="hover:text-blue-600 transition-colors">
          Projets
        </Link>
        <span>/</span>
        <span className="text-black dark:text-white">Nouveau</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Section : Contenu FR */}
        <div className="space-y-5 p-6 border border-slate-100 dark:border-zinc-900">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600">
            Contenu — Français
          </h2>

          <Field label="Titre" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                updateField("title", e.target.value);
                updateField("slug", generateSlug(e.target.value));
              }}
              placeholder="Mon super projet"
              required
              className={inputClass}
            />
          </Field>

          <Field label="Description" required>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Description du projet en français..."
              required
              rows={4}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Section : Contenu EN */}
        <div className="space-y-5 p-6 border border-slate-100 dark:border-zinc-900">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600">
            Contenu — English
          </h2>

          <Field label="Title (EN)" hint="Optionnel — laisse vide pour utiliser le titre FR">
            <input
              type="text"
              value={form.title_en}
              onChange={(e) => updateField("title_en", e.target.value)}
              placeholder="My awesome project"
              className={inputClass}
            />
          </Field>

          <Field label="Description (EN)" hint="Optionnel">
            <textarea
              value={form.description_en}
              onChange={(e) => updateField("description_en", e.target.value)}
              placeholder="Project description in English..."
              rows={4}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Section : Métadonnées */}
        <div className="space-y-5 p-6 border border-slate-100 dark:border-zinc-900">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-blue-600">
            Métadonnées
          </h2>
          {/* Image du projet */}
            <ImageUpload
            value={form.imageUrl}
            onChange={(url) => updateField("imageUrl", url)}
            folder="projects"
            label="Image du projet"
            />

          <Field label="Slug" required hint="Généré automatiquement depuis le titre — modifiable">
            <input
              type="text"
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="mon-super-projet"
              required
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Lien live" hint="URL du projet en production">
              <input
                type="url"
                value={form.link}
                onChange={(e) => updateField("link", e.target.value)}
                placeholder="https://monprojet.com"
                className={inputClass}
              />
            </Field>

            <Field label="Lien GitHub" hint="URL du repository">
              <input
                type="url"
                value={form.githubUrl}
                onChange={(e) => updateField("githubUrl", e.target.value)}
                placeholder="https://github.com/..."
                className={inputClass}
              />
            </Field>
          </div>

          {/* Technologies */}
          <Field label="Technologies">
            <div className="space-y-3">
              {/* Input + bouton ajouter */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                  placeholder="React, Next.js, TypeScript..."
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 bg-blue-600 text-white hover:bg-black transition-colors flex-shrink-0"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Tags technologies */}
              {form.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest border border-slate-200 dark:border-zinc-800 px-3 py-1.5 text-slate-600 dark:text-zinc-400"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Field>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Ordre d'affichage" hint="0 = premier">
              <input
                type="number"
                value={form.order}
                onChange={(e) => updateField("order", parseInt(e.target.value))}
                min={0}
                className={inputClass}
              />
            </Field>

            <Field label="Mise en avant">
              <label className="flex items-center gap-3 cursor-pointer mt-1">
                <div
                  onClick={() => updateField("featured", !form.featured)}
                  className={`w-10 h-5 relative transition-colors duration-200 ${form.featured ? "bg-blue-600" : "bg-slate-200 dark:bg-zinc-800"}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white transition-transform duration-200 ${form.featured ? "translate-x-5" : "translate-x-0.5"}`} />
                </div>
                <span className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                  {form.featured ? "Oui" : "Non"}
                </span>
              </label>
            </Field>
          </div>
        </div>

        {/* Message d'erreur */}
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Création...
              </>
            ) : (
              "Créer le projet"
            )}
          </button>

          <Link
            href="/dashboard/projects"
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Annuler
          </Link>
        </div>

      </form>
    </div>
  );
}