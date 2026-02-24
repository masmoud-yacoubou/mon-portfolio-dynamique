// src/app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://dev-masmoud-yacoubou.vercel.app'), // URL RÉELLE MISE À JOUR
  title: {
    template: '%s | Masmoud Y.',
    default: 'Masmoud Y. | Développeur Full-Stack Cotonou', // Titre plus SEO
  },
  description: 'Développeur Full-Stack basé à Cotonou. Expertise en React, Next.js et architectures robustes pour vos projets web.',
  
  // LE PETIT PLUS MULTILINGUE (Hreflang)
  alternates: {
    canonical: '/',
    languages: {
      'fr-BJ': '/fr',
      'en-US': '/en',
    },
  },

  // Balises pour LinkedIn, Facebook, WhatsApp
  openGraph: {
    title: 'Masmoud Y. | Full-Stack Developer',
    description: 'Conception d’écosystèmes numériques performants et centrés sur l’utilisateur.',
    url: 'https://dev-masmoud-yacoubou.vercel.app',
    siteName: 'Masmoud Y. Portfolio',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'Masmoud Y. Portfolio Preview',
      },
    ],
    locale: 'fr_BJ',
    type: 'website',
  },

  // Balises spécifiques à Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'Masmoud Y. | Full-Stack Developer',
    description: 'Développeur Full-Stack basé à Cotonou.',
    images: ['/og-image.png'], 
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Important : On laisse la gestion de la langue se faire par le dossier [locale]
    <html suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        {children}
        
        {/* DONNÉES STRUCTURÉES (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Masmoud Yacoubou",
              "jobTitle": "Développeur Full-Stack",
              "url": "https://dev-masmoud-yacoubou.vercel.app",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Cotonou",
                "addressCountry": "BJ"
              },
              "sameAs": [
                "https://www.linkedin.com/in/masmoud-yacoubou",
                "https://github.com/masmoud-yacoubou"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}