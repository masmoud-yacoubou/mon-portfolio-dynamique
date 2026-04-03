// src/app/dashboard/projects/[id]/edit/_components/EditProjectForm.tsx
// =============================================================================
// COMPOSANT - Formulaire d'édition de projet
// Description : Formulaire client pré-rempli avec les données existantes.
// =============================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import type { Project } from "@prisma/client";
import Link from "next/link";
import ImageUpload from "@/app/dashboard/_components/ImageUpload"; // ← chemin corrigé via alias @
import VideoUpload from "@/app/dashboard/_components/VideoUpload";


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

export default function EditProjectForm({ project }: { project: Project }) {
  const router  = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");
  const [techInput, setTechInput] = useState("");

  // ---- Pré-remplissage avec les données existantes ----
  const [form, setForm] = useState({
    title:          project.title,
    title_en:       project.title_en       ?? "",
    description:    project.description,
    description_en: project.description_en ?? "",
    slug:           project.slug,
    link:           project.link           ?? "",
    githubUrl:      project.githubUrl      ?? "",
    imageUrl:       project.imageUrl       ?? "",
    videoUrl:       project.videoUrl       ?? "",
    technologies:   project.technologies,
    featured:       project.featured,
    order:          project.order,
  });

  function updateField<K extends keyof typeof form>(
    key: K,
    value: typeof form[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addTechnology() {
    const tech = techInput.trim();
    if (!tech || form.technologies.includes(tech)) return;
    updateField("technologies", [...form.technologies, tech]);
    setTechInput("");
  }

  function removeTechnology(tech: string) {
    updateField("technologies", form.technologies.filter((t) => t !== tech));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la mise à jour.");
        return;
      }

      router.push("/dashboard/projects");
      router.refresh();

    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
            onChange={(e) => updateField("title", e.target.value)}
            required
            className={inputClass}
          />
        </Field>
        <Field label="Description" required>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
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
        <Field label="Title (EN)" hint="Optionnel">
          <input
            type="text"
            value={form.title_en}
            onChange={(e) => updateField("title_en", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Description (EN)" hint="Optionnel">
          <textarea
            value={form.description_en}
            onChange={(e) => updateField("description_en", e.target.value)}
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
          onChange={(url: string) => updateField("imageUrl", url)}
          folder="projects"
          label="Image du projet"
        />

        <VideoUpload
          value={form.videoUrl ?? ""}
          onChange={(url: string) => updateField("videoUrl", url)}
          folder="projects"
          label="Vidéo du projet (optionnel)"
        />

        <Field label="Slug" required>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            required
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Lien live">
            <input
              type="url"
              value={form.link}
              onChange={(e) => updateField("link", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Lien GitHub">
            <input
              type="url"
              value={form.githubUrl}
              onChange={(e) => updateField("githubUrl", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        {/* Technologies */}
        <Field label="Technologies">
          <div className="space-y-3">
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
                placeholder="Ajouter une techno..."
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
            {form.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest border border-slate-200 dark:border-zinc-800 px-3 py-1.5"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Ordre d'affichage">
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
                className={`w-10 h-5 relative transition-colors duration-200 ${
                  form.featured ? "bg-blue-600" : "bg-slate-200 dark:bg-zinc-800"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white transition-transform duration-200 ${
                    form.featured ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-zinc-400">
                {form.featured ? "Oui" : "Non"}
              </span>
            </label>
          </Field>
        </div>
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
            <><Loader2 size={14} className="animate-spin" />Sauvegarde...</>
          ) : (
            "Sauvegarder"
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
  );
}