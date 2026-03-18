// src/app/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://masmoud-yacoubou.vercel.app"),

  title: {
    template: "%s | Masmoud Y.",
    default: "Masmoud Y. | Développeur Full-Stack Cotonou",
  },

  description:
    "Développeur Full-Stack basé à Cotonou. Expertise en React, Next.js et architectures robustes pour vos projets web.",

  alternates: {
    canonical: "/",
    languages: {
      "fr-BJ": "/fr",
      "en-US": "/en",
    },
  },

  openGraph: {
    title: "Masmoud Y. | Full-Stack Developer",
    description:
      "Conception d'écosystèmes numériques performants et centrés sur l'utilisateur.",
    url: "https://masmoud-yacoubou.vercel.app",
    siteName: "Masmoud Y. Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Masmoud Y. Portfolio Preview",
      },
    ],
    locale: "fr_BJ",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Masmoud Y. | Full-Stack Developer",
    description: "Développeur Full-Stack basé à Cotonou.",
    images: ["/og-image.png"],
  },

  // ← Favicon SVG + fallbacks
  icons: {
    icon:      [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },           // fallback vieux navigateurs
    ],
    apple:     "/favicon.svg",
    shortcut:  "/favicon.svg",
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

        {/* Données structurées JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context":  "https://schema.org",
              "@type":     "Person",
              name:        "Masmoud Yacoubou",
              jobTitle:    "Développeur Full-Stack",
              url:         "https://masmoud-yacoubou.vercel.app",
              address: {
                "@type":          "PostalAddress",
                addressLocality:  "Cotonou",
                addressCountry:   "BJ",
              },
              sameAs: [
                "https://www.linkedin.com/in/masmoud-yacoubou",
                "https://github.com/masmoud-yacoubou",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}