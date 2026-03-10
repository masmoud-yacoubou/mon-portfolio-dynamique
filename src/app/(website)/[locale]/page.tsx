// src/app/(website)/[locale]/page.tsx
// =============================================================================
// PAGE D'ACCUEIL - Portfolio Public
// Description : Charge les données depuis Prisma (remplace Sanity).
//               Rendu côté serveur (SSR) pour le SEO.
// =============================================================================

import prisma from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { getDictionary } from "@/dictionaries/get-dictionary";

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
  // Résolution des paramètres de route (Next.js 15+)
  const { locale } = await params;

  // Sécurité locale (fallback sur 'fr')
  const activeLocale = (locale === "en" || locale === "fr") ? locale : "fr";

  // Chargement parallèle des données Prisma et du dictionnaire
  const [{ projects, skills, experiences }, dict] = await Promise.all([
    getPortfolioData(),
    getDictionary(activeLocale),
  ]);

  return (
    <HomeClient
      projects={projects}
      skills={skills}
      experiences={experiences}
      activeLocale={activeLocale}
      dict={dict}
    />
  );
}