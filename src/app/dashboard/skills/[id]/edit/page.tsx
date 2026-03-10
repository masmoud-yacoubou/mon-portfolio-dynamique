// src/app/dashboard/skills/[id]/edit/page.tsx
// =============================================================================
// PAGE - Modifier une compétence
// Description : Charge la compétence côté serveur et hydrate le formulaire client.
// =============================================================================

import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditSkillForm from "./_components/EditSkillForm";
import Link from "next/link";

async function getSkill(id: string) {
  const skill = await prisma.skill.findUnique({ where: { id } });
  if (!skill) notFound();
  return skill;
}

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await getSkill(id);

  return (
    <div className="max-w-xl space-y-8">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-600">
        <Link href="/dashboard/skills" className="hover:text-blue-600 transition-colors">
          Compétences
        </Link>
        <span>/</span>
        <span className="text-black dark:text-white">{skill.name}</span>
      </div>

      <EditSkillForm skill={skill} />
    </div>
  );
}