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
  const [progress, setProgress]   = useState(0);

  async function handleFile(file: File) {
    setError("");
    setProgress(0);

    if (!file.type.startsWith("video/")) {
      setError("Seules les vidéos sont acceptées.");
      return;
    }

    // Max 200MB pour les vidéos
    if (file.size > 200 * 1024 * 1024) {
      setError("La vidéo ne doit pas dépasser 200MB.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Récupère la signature depuis notre API
      const sigRes = await fetch("/api/cloudinary-signature", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ folder: `portfolio/${folder}` }),
      });

      if (!sigRes.ok) throw new Error("Erreur de signature");

      const { timestamp, signature, cloudName, apiKey, folder: signedFolder } = await sigRes.json();

      // 2. Upload direct vers Cloudinary via FormData
      const formData = new FormData();
      formData.append("file",           file);
      formData.append("api_key",        apiKey);
      formData.append("timestamp",      timestamp.toString());
      formData.append("signature",      signature);
      formData.append("folder",         signedFolder);
      formData.append("resource_type",  "video");

      // 3. XHR pour suivre la progression
      const url = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            resolve(data.secure_url);
          } else {
            reject(new Error("Erreur Cloudinary"));
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Erreur réseau")));

        xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`);
        xhr.send(formData);
      });

      onChange(url);

    } catch {
      setError("Une erreur est survenue lors de l'upload.");
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
        {label}
      </label>

      {value ? (
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
        <div
          onClick={() => !isLoading && inputRef.current?.click()}
          className={`flex flex-col items-center justify-center aspect-video w-full border-2 border-dashed transition-all duration-200 ${
            isLoading
              ? "border-blue-600/30 bg-blue-600/5 cursor-wait"
              : "border-slate-200 dark:border-zinc-800 hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-zinc-900/50 cursor-pointer"
          }`}
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 w-full px-8">
              <Loader2 size={24} className="text-blue-600 animate-spin" />
              <div className="w-full">
                {/* Barre de progression */}
                <div className="w-full h-1 bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2 text-center">
                  Upload en cours... {progress}%
                </p>
              </div>
            </div>
          ) : (
            <>
              <Video size={24} className="text-slate-300 dark:text-zinc-700 mb-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600 mb-1">
                Glisse une vidéo ici
              </span>
              <span className="text-[9px] font-medium text-slate-300 dark:text-zinc-700">
                MP4, WebM, MOV — max 200MB
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