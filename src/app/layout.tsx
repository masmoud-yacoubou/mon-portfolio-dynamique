// src/app/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://masmoud-yacoubou.vercel.app"),

  verification: {
    google: "-L7ScPIvkULP8yBBxT5EpeadqPfuulVjtjVTHjINBl4",
  },

  title: {
    template: "%s | Masmoud Yacoubou",
    default:  "Masmoud Yacoubou | Développeur Full-Stack Cotonou",
  },

  description:
    "Masmoud Yacoubou, Développeur Full-Stack basé à Cotonou, Bénin. Spécialisé en React, Next.js, Node.js et architectures web robustes.",

  keywords: [
    "Développeur Full-Stack",
    "Masmoud Yacoubou",
    "React",
    "Next.js",
    "Node.js",
    "Cotonou",
    "Bénin",
    "Portfolio",
    "Full-Stack Developer",
  ],

  authors: [{ name: "Masmoud Yacoubou", url: "https://masmoud-yacoubou.vercel.app" }],

  alternates: {
    canonical: "/",
    languages: {
      "fr-BJ": "/fr",
      "en-US": "/en",
    },
  },

  openGraph: {
    title:       "Masmoud Yacoubou | Full-Stack Developer",
    description: "Développeur Full-Stack basé à Cotonou, Bénin. Spécialisé en React, Next.js et architectures web performantes.",
    url:         "https://masmoud-yacoubou.vercel.app",
    siteName:    "Masmoud Yacoubou Portfolio",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "Masmoud Yacoubou — Développeur Full-Stack",
      },
    ],
    locale: "fr_FR",
    type:   "website",
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Masmoud Yacoubou | Full-Stack Developer",
    description: "Développeur Full-Stack basé à Cotonou, Bénin.",
    images:      ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple:    "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        {children}

        {/* JSON-LD — Données structurées enrichies */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type":    "Person",

              // Identité
              name:       "Masmoud Yacoubou",
              givenName:  "Masmoud",
              familyName: "Yacoubou",
              jobTitle:   "Développeur Full-Stack",
              description: "Développeur Full-Stack basé à Cotonou, Bénin. Spécialisé en React, Next.js, Node.js et architectures web robustes.",

              // URL principale
              url: "https://masmoud-yacoubou.vercel.app",

              // Photo — pointe vers ta vraie photo
              image: "https://masmoud-yacoubou.vercel.app/photo.png",

              // Email et téléphone
              email:       "maxdomyacoubou@gmail.com",
              telephone:   "+22969724172",

              // Localisation
              address: {
                "@type":          "PostalAddress",
                addressLocality:  "Cotonou",
                addressRegion:    "Littoral",
                addressCountry:   "BJ",
              },

              // Profils sociaux
              sameAs: [
                "https://www.linkedin.com/in/masmoud-yacoubou",
                "https://github.com/masmoud-yacoubou",
                "https://wa.me/22969724172",
              ],

              // Compétences
              knowsAbout: [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "PostgreSQL",
                "Prisma",
                "Tailwind CSS",
              ],

              // Langue
              knowsLanguage: ["fr", "en"],
            }),
          }}
        />
      </body>
    </html>
  );
}