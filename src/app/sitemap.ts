// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dev-masmoud-yacoubou.vercel.app'
  const locales = ['fr', 'en']
  
  // Tu peux ajouter tes slugs de projets dynamiquement ici plus tard
  const routes = ['', '/projects', '/contact'].flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  return routes
}