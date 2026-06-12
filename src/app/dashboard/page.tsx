// src/app/dashboard/page.tsx

export const dynamic = "force-dynamic";

import { FolderKanban, Wrench, Briefcase, MessageSquare, ArrowUpRight } from "lucide-react";
import prisma from "@/lib/prisma";
import Link from "next/link";

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
      className="group relative rounded-[22px] border border-slate-200/80 bg-white/70 p-5 transition-colors duration-300 hover:border-blue-500/40 hover:bg-white dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-blue-300/35"
    >
      {badge ? (
        <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white">
          {badge} nouveau{badge > 1 ? "x" : ""}
        </span>
      ) : null}

      <div className="mb-6 flex items-start justify-between">
        <div className="text-blue-600 dark:text-blue-300">{icon}</div>

        <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400 transition-colors group-hover:text-blue-600 dark:text-zinc-600 dark:group-hover:text-blue-300">
          Gérer
          <ArrowUpRight size={12} />
        </span>
      </div>

      <div className="mb-2 font-montserrat text-4xl font-black tracking-[-0.06em] text-slate-950 dark:text-white">
        {String(value).padStart(2, "0")}
      </div>

      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">
        {label}
      </div>
    </Link>
  );
}

export default async function DashboardPage() {
  const stats = await getStats();

  const quickLinks = [
    { label: "Nouveau projet", href: "/dashboard/projects/new" },
    { label: "Nouvelle compétence", href: "/dashboard/skills/new" },
    { label: "Nouvelle expérience", href: "/dashboard/experiences/new" },
  ];

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-200/80 pb-7 dark:border-white/10">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">
          Dashboard
        </p>

        <h2 className="font-montserrat text-3xl font-black uppercase leading-[0.95] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-4xl">
          Bonjour, Masmoud<span className="text-blue-600 dark:text-blue-300">.</span>
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-zinc-400">
          Voici un aperçu clair de ton portfolio, de son contenu et des messages reçus.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <div>
        <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-zinc-500">
          Accès rapides
        </h3>

        <div className="flex flex-wrap gap-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-700 transition-colors duration-300 hover:border-blue-500/40 hover:text-blue-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-zinc-300 dark:hover:border-blue-300/35 dark:hover:text-blue-300"
            >
              + {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}