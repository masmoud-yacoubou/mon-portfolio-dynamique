// src/app/dashboard/messages/_components/MarkReadButton.tsx
// =============================================================================
// COMPOSANT - Bouton marquer lu/non lu
// Description : Bascule le statut de lecture d'un message.
// =============================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MailOpen, Mail, Loader2 } from "lucide-react";

interface MarkReadButtonProps {
  id:     string;
  isRead: boolean;
}

export default function MarkReadButton({ id, isRead }: MarkReadButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggle() {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/messages/${id}`, { method: "PATCH" });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error ?? "Erreur.");
        return;
      }

      router.refresh();

    } catch {
      alert("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      title={isRead ? "Marquer non lu" : "Marquer comme lu"}
      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : isRead ? (
        <Mail size={14} />
      ) : (
        <MailOpen size={14} />
      )}
    </button>
  );
}