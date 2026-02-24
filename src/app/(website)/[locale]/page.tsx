// src/app/(website)/[locale]/page.tsx
import { client } from "@/sanity/lib/client";
import { PROJECTS_QUERY, SKILLS_QUERY, EXPERIENCES_QUERY } from "@/sanity/lib/queries";
import HomeClient from "@/components/HomeClient";
import { getDictionary } from "@/dictionaries/get-dictionary";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: Props) {
  // On attend la résolution des paramètres de la route (Next.js 15+)
  const { locale } = await params;
  
  // Sécurité pour la locale (fallback sur 'fr')
  const activeLocale = (locale === 'en' || locale === 'fr') ? locale : 'fr';

  // Chargement parallèle des données Sanity et du dictionnaire local
  const [projects, skills, experiences, dict] = await Promise.all([
    client.fetch(PROJECTS_QUERY, { locale: activeLocale }),
    client.fetch(SKILLS_QUERY, { locale: activeLocale }),
    client.fetch(EXPERIENCES_QUERY, { locale: activeLocale }),
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