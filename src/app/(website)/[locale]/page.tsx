// src/app/(website)/[locale]/page.tsx
// =============================================================================
// PAGE D'ACCUEIL - Portfolio Public
// Description : Charge les données depuis Prisma (remplace Sanity).
//               Rendu côté serveur (SSR) pour le SEO.
// =============================================================================

import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/site";

interface Props {
  params: Promise<{ locale: string }>;
}

/**
 * Récupère toutes les données du portfolio depuis Neon
 */
async function getPortfolioData() {
  const [projects, skills, experiences] = await Promise.all([
    prisma.project.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.skill.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.experience.findMany({
      orderBy: { order: "asc" },
    }),
  ]);

  return { projects, skills, experiences };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const [{ projects, skills, experiences }, dict] = await Promise.all([
    getPortfolioData(),
    getDictionary(locale),
  ]);

  return (
    <HomeClient
      projects={projects}
      skills={skills}
      experiences={experiences}
      activeLocale={locale}
      dict={dict}
    />
  );
}
