// src/app/dashboard/projects/_components/DeleteButton.tsx
// =============================================================================
// COMPOSANT - Bouton de suppression
// Description : Bouton client qui demande confirmation avant suppression.
//               Réutilisable pour projets, skills et expériences.
// =============================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteButtonProps {
  id: string;
  name: string;
  type: "project" | "skill" | "experience" | "message";
}

// Mapping type → endpoint API
const apiEndpoints = {
  project:    "projects",
  skill:      "skills",
  experience: "experiences",
  message:    "messages",   // ← ajouter cette ligne
};

export default function DeleteButton({ id, name, type }: DeleteButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    // Demande de confirmation
    const confirmed = window.confirm(
      `Supprimer "${name}" ? Cette action est irréversible.`
    );
    if (!confirmed) return;

    setIsLoading(true);

    try {
      const endpoint = apiEndpoints[type];
      const res = await fetch(`/api/${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "Erreur lors de la suppression.");
        return;
      }

      // Rafraîchit la page pour mettre à jour la liste
      router.refresh();

    } catch {
      alert("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
      title="Supprimer"
    >
      {isLoading
        ? <Loader2 size={14} className="animate-spin" />
        : <Trash2 size={14} />
      }
    </button>
  );
}