 // src/app/dashboard/messages/page.tsx
// =============================================================================
// PAGE - Liste des Messages
// Description : Affiche tous les messages reçus avec statut lu/non lu.
//               Données chargées côté serveur (SSR).
// =============================================================================

import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Mail, MailOpen } from "lucide-react";
import DeleteButton from "../projects/_components/DeleteButton";
import MarkReadButton from "./_components/MarkReadButton";

/**
 * Récupère tous les messages triés par date (plus récent en premier)
 */
async function getMessages() {
  try {
    return await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    notFound();
  }
}

/**
 * Formate une date en format lisible
 * Ex: "10 mars 2026 à 14h30"
 */
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day:    "numeric",
    month:  "long",
    year:   "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  });
}

export default async function MessagesPage() {
  const messages = await getMessages();

  const unreadCount = messages?.filter((m) => !m.read).length ?? 0;

  return (
    <div className="space-y-8">

      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium">
            {messages?.length ?? 0} message{(messages?.length ?? 0) > 1 ? "s" : ""} au total
          </p>
          {unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest">
              {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* État vide */}
      {!messages || messages.length === 0 ? (
        <div className="border border-dashed border-slate-200 dark:border-zinc-800 p-16 text-center">
          <Mail size={32} className="mx-auto text-slate-300 dark:text-zinc-700 mb-4" />
          <p className="text-sm font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-widest">
            Aucun message pour l&apos;instant
          </p>
        </div>

      ) : (

        /* Liste des messages */
        <div className="border border-slate-100 dark:border-zinc-900 divide-y divide-slate-100 dark:divide-zinc-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start justify-between px-6 py-5 transition-colors group ${
                !message.read
                  ? "bg-blue-600/[0.02] hover:bg-blue-600/[0.04]"
                  : "hover:bg-slate-50 dark:hover:bg-zinc-900/50"
              }`}
            >
              {/* Indicateur lu/non lu */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className={`mt-1 flex-shrink-0 ${!message.read ? "text-blue-600" : "text-slate-300 dark:text-zinc-700"}`}>
                  {message.read
                    ? <MailOpen size={16} />
                    : <Mail size={16} />
                  }
                </div>

                {/* Contenu */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className={`font-montserrat font-black text-sm uppercase tracking-tight ${
                      !message.read ? "text-black dark:text-white" : "text-slate-500 dark:text-zinc-500"
                    }`}>
                      {message.name}
                    </h3>
                    <span className="text-[10px] font-medium text-slate-400 dark:text-zinc-600">
                      {message.email}
                    </span>
                    {!message.read && (
                      <span className="text-[8px] font-black uppercase tracking-widest bg-blue-600/10 text-blue-600 px-2 py-0.5">
                        Nouveau
                      </span>
                    )}
                  </div>

                  {/* Sujet */}
                  {message.subject && (
                    <p className="text-xs font-bold text-slate-600 dark:text-zinc-400 mb-1 uppercase tracking-widest">
                      {message.subject}
                    </p>
                  )}

                  {/* Aperçu du message */}
                  <p className="text-xs text-slate-500 dark:text-zinc-500 line-clamp-2 font-medium">
                    {message.content}
                  </p>

                  {/* Date */}
                  <p className="text-[9px] font-bold text-slate-300 dark:text-zinc-700 uppercase tracking-widest mt-2">
                    {formatDate(message.createdAt)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">

                {/* Voir le détail */}
                <Link
                  href={`/dashboard/messages/${message.id}`}
                  className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors px-2 py-1 border border-slate-200 dark:border-zinc-800 hover:border-blue-600"
                >
                  Lire
                </Link>

                {/* Marquer lu/non lu */}
                <MarkReadButton id={message.id} isRead={message.read} />

                {/* Supprimer */}
                <DeleteButton id={message.id} name={`le message de ${message.name}`} type="experience" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}