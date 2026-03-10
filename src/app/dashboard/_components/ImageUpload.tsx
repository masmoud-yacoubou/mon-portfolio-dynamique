// src/app/dashboard/_components/ImageUpload.tsx
// =============================================================================
// COMPOSANT - Upload d'image
// Description : Composant réutilisable pour uploader des images via Cloudinary.
//               Supporte le drag & drop et la prévisualisation.
// =============================================================================

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value:     string;            // URL actuelle de l'image
  onChange:  (url: string) => void;  // Callback quand l'image change
  folder?:   string;            // Dossier Cloudinary de destination
  label?:    string;            // Label du champ
}

export default function ImageUpload({
  value,
  onChange,
  folder  = "projects",
  label   = "Image",
}: ImageUploadProps) {
  const inputRef              = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]     = useState("");
  const [isDragging, setIsDragging] = useState(false);

  /**
   * Convertit un fichier en base64
   */
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Valide et uploade le fichier sélectionné
   */
  async function handleFile(file: File) {
    setError("");

    // Validation du type
    if (!file.type.startsWith("image/")) {
      setError("Seules les images sont acceptées.");
      return;
    }

    // Validation de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5MB.");
      return;
    }

    setIsLoading(true);

    try {
      // Conversion en base64
      const base64 = await fileToBase64(file);

      // Upload via notre API
      const res = await fetch("/api/upload", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ file: base64, folder }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'upload.");
        return;
      }

      // Met à jour le parent avec l'URL Cloudinary
      onChange(data.url);

    } catch {
      setError("Une erreur est survenue lors de l'upload.");
    } finally {
      setIsLoading(false);
    }
  }

  // ---- Gestion du drag & drop ----
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">

      {/* Label */}
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
        {label}
      </label>

      {/* Zone d'upload ou prévisualisation */}
      {value ? (

        /* Prévisualisation de l'image */
        <div className="relative group">
          <div className="relative aspect-video w-full overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900">
            <Image
              src={value}
              alt="Aperçu"
              fill
              className="object-cover"
            />
          </div>

          {/* Bouton supprimer */}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            title="Supprimer l'image"
          >
            <X size={14} />
          </button>

          {/* Bouton remplacer */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-3 right-3 px-3 py-2 bg-black/70 text-white text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
          >
            Remplacer
          </button>
        </div>

      ) : (

        /* Zone de drop */
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center
            aspect-video w-full cursor-pointer
            border-2 border-dashed transition-all duration-200
            ${isDragging
              ? "border-blue-600 bg-blue-600/5"
              : "border-slate-200 dark:border-zinc-800 hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-zinc-900/50"
            }
          `}
        >
          {isLoading ? (
            <>
              <Loader2 size={24} className="text-blue-600 animate-spin mb-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Upload en cours...
              </span>
            </>
          ) : (
            <>
              <ImageIcon size={24} className="text-slate-300 dark:text-zinc-700 mb-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600 mb-1">
                Glisse une image ici
              </span>
              <span className="text-[9px] font-medium text-slate-300 dark:text-zinc-700">
                ou clique pour sélectionner
              </span>
              <span className="text-[9px] font-medium text-slate-300 dark:text-zinc-700 mt-1">
                JPG, PNG, WebP — max 5MB
              </span>
              <div className="mt-4 flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-zinc-800 hover:border-blue-600 transition-colors">
                <Upload size={12} className="text-blue-600" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                  Choisir un fichier
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Input fichier caché */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Message d'erreur */}
      {error && (
        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}