// src/app/dashboard/messages/[id]/page.tsx
// =============================================================================
// PAGE - Détail d'un message
// Description : Affiche le contenu complet d'un message.
//               Marque automatiquement le message comme lu à l'ouverture.
// =============================================================================

import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Mail, ArrowLeft, Calendar, User } from "lucide-react";
import MarkReadButton from "../_components/MarkReadButton";
import DeleteButton from "../../projects/_components/DeleteButton";

/**
 * Récupère un message et le marque automatiquement comme lu
 */
async function getMessage(id: string) {
  const message = await prisma.message.findUnique({ where: { id } });
  if (!message) notFound();

  // Marque automatiquement comme lu si ce n'est pas déjà le cas
  if (!message.read) {
    await prisma.message.update({
      where: { id },
      data:  { read: true },
    });
  }

  return message;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day:     "numeric",
    month:   "long",
    year:    "numeric",
    hour:    "2-digit",
    minute:  "2-digit",
  });
}

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const message = await getMessage(id);

  return (
    <div className="max-w-2xl space-y-8">

      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
        <Link href="/dashboard/messages" className="hover:text-blue-600 transition-colors flex items-center gap-1">
          <ArrowLeft size={10} />
          Messages
        </Link>
        <span>/</span>
        <span className="text-black dark:text-white truncate">{message.name}</span>
      </div>

      {/* Carte message */}
      <div className="border border-slate-100 dark:border-zinc-900">

        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-zinc-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Expéditeur */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="font-montserrat font-black text-base uppercase tracking-tight text-black dark:text-white">
                    {message.name}
                  </h2>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-[11px] font-medium text-blue-600 hover:underline"
                  >
                    {message.email}
                  </a>
                </div>
              </div>

              {/* Sujet */}
              {message.subject && (
                <div className="mt-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
                    Sujet —
                  </span>
                  <span className="text-sm font-bold text-black dark:text-white ml-2">
                    {message.subject}
                  </span>
                </div>
              )}

              {/* Date */}
              <div className="flex items-center gap-2 mt-3">
                <Calendar size={11} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest">
                  {formatDate(message.createdAt)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <MarkReadButton id={message.id} isRead={true} />
              <DeleteButton id={message.id} name={`le message de ${message.name}`} type="experience" />
            </div>
          </div>
        </div>

        {/* Corps du message */}
        <div className="px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Mail size={14} className="text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
              Message
            </span>
          </div>
          <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        {/* Footer — Répondre */}
        <div className="px-8 py-6 border-t border-slate-100 dark:border-zinc-900 bg-slate-50 dark:bg-zinc-900/50">
          <a
            href={`mailto:${message.email}?subject=Re: ${message.subject ?? "Votre message"}`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
          >
            Répondre par email
            <span>→</span>
          </a>
        </div>
      </div>

    </div>
  );
}