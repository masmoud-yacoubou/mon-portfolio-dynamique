// src/app/dashboard/experiences/[id]/edit/page.tsx
// =============================================================================
// PAGE - Modifier une expérience
// Description : Charge l'expérience côté serveur et hydrate le formulaire client.
// =============================================================================

import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import EditExperienceForm from "./_components/EditExperienceForm";

async function getExperience(id: string) {
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) notFound();
  return experience;
}

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = await getExperience(id);

  return (
    <div className="max-w-3xl space-y-8">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
        <Link href="/dashboard/experiences" className="hover:text-blue-600 transition-colors">
          Expériences
        </Link>
        <span>/</span>
        <span className="text-black dark:text-white truncate">{experience.role}</span>
      </div>

      <EditExperienceForm experience={experience} />
    </div>
  );
}