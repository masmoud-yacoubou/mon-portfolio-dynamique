// src/app/dashboard/page.tsx
// =============================================================================
// PAGE D'ACCUEIL - Dashboard
// Description : Vue d'ensemble avec les statistiques principales.
//               Affiche le nombre de projets, skills, expériences et messages.
// =============================================================================

export const dynamic = "force-dynamic";

import { LayoutDashboard, FolderKanban, Wrench, Briefcase, MessageSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

/**
 * Récupère les statistiques depuis la base de données
 */
async function getStats() {
  const [projects, skills, experiences, messages, unreadMessages] =
    await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.experience.count(),
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
    ]);

  return { projects, skills, experiences, messages, unreadMessages };
}

// ---- Carte de statistique ----
function StatCard({
  label,
  value,
  icon,
  href,
  badge,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="group relative bg-white dark:bg-[#050505] border border-slate-100 dark:border-zinc-900 p-6 hover:border-blue-600 transition-all duration-300"
    >
      {/* Badge messages non lus */}
      {badge ? (
        <span className="absolute top-4 right-4 bg-blue-600 text-white text-[9px] font-black px-2 py-1 uppercase tracking-widest">
          {badge} nouveau{badge > 1 ? "x" : ""}
        </span>
      ) : null}

      <div className="flex items-start justify-between mb-6">
        <div className="text-blue-600">{icon}</div>
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-300 dark:text-zinc-700 group-hover:text-blue-600 transition-colors">
          Gérer →
        </span>
      </div>

      <div className="font-montserrat text-4xl font-black text-black dark:text-white mb-2">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
        {label}
      </div>
    </Link>
  );
}

export default async function DashboardPage() {
  const stats = await getStats();

  return (
    <div className="space-y-10">

      {/* En-tête de bienvenue */}
      <div>
        <h2 className="font-montserrat text-3xl font-black uppercase tracking-tighter text-black dark:text-white mb-2">
          Bonjour, Masmoud <span className="text-blue-600">.</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-zinc-500 font-medium">
          Voici un aperçu de ton portfolio en temps réel.
        </p>
      </div>

      {/* Grille de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Projets"
          value={stats.projects}
          icon={<FolderKanban size={20} />}
          href="/dashboard/projects"
        />
        <StatCard
          label="Compétences"
          value={stats.skills}
          icon={<Wrench size={20} />}
          href="/dashboard/skills"
        />
        <StatCard
          label="Expériences"
          value={stats.experiences}
          icon={<Briefcase size={20} />}
          href="/dashboard/experiences"
        />
        <StatCard
          label="Messages"
          value={stats.messages}
          icon={<MessageSquare size={20} />}
          href="/dashboard/messages"
          badge={stats.unreadMessages}
        />
      </div>

      {/* Accès rapides */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600 mb-4">
          Accès rapides
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Nouveau projet", href: "/dashboard/projects/new" },
            { label: "Nouvelle compétence", href: "/dashboard/skills/new" },
            { label: "Nouvelle expérience", href: "/dashboard/experiences/new" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all duration-200"
            >
              + {item.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}