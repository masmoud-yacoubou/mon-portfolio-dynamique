// src/app/dashboard/_components/VideoUpload.tsx
// =============================================================================
// COMPOSANT - Upload de vidéo
// Description : Upload vidéo vers Cloudinary avec prévisualisation.
// =============================================================================

"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Video } from "lucide-react";

interface VideoUploadProps {
  value:    string;
  onChange: (url: string) => void;
  folder?:  string;
  label?:   string;
}

export default function VideoUpload({
  value,
  onChange,
  folder  = "projects",
  label   = "Vidéo",
}: VideoUploadProps) {
  const inputRef                  = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");

  async function handleFile(file: File) {
    setError("");

    if (!file.type.startsWith("video/")) {
      setError("Seules les vidéos sont acceptées.");
      return;
    }

    // Max 50MB pour les vidéos
    if (file.size > 50 * 1024 * 1024) {
      setError("La vidéo ne doit pas dépasser 50MB.");
      return;
    }

    setIsLoading(true);

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload  = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

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

      onChange(data.url);

    } catch {
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
        {label}
      </label>

      {value ? (
        /* Prévisualisation vidéo */
        <div className="relative group">
          <video
            src={value}
            controls
            className="w-full aspect-video border border-slate-200 dark:border-zinc-800 bg-black"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        /* Zone de drop */
        <div
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center aspect-video w-full cursor-pointer border-2 border-dashed border-slate-200 dark:border-zinc-800 hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 size={24} className="text-blue-600 animate-spin mb-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Upload en cours...
              </span>
              <span className="text-[9px] text-slate-300 dark:text-zinc-700 mt-1">
                Les vidéos peuvent prendre quelques instants
              </span>
            </>
          ) : (
            <>
              <Video size={24} className="text-slate-300 dark:text-zinc-700 mb-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600 mb-1">
                Glisse une vidéo ici
              </span>
              <span className="text-[9px] font-medium text-slate-300 dark:text-zinc-700">
                MP4, WebM, MOV — max 50MB
              </span>
              <div className="mt-4 flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-zinc-800 hover:border-blue-600 transition-colors">
                <Upload size={12} className="text-blue-600" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                  Choisir une vidéo
                </span>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        className="hidden"
      />

      {error && (
        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}