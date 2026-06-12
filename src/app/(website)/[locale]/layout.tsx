import "../../globals.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { montserrat, poppins } from "@/lib/fonts";
import {
  getLanguageAlternates,
  getLocaleMeta,
  getLocalizedUrl,
  isValidLocale,
  siteConfig,
} from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    return {};
  }

  const isEn = locale === "en";
  const localeMeta = getLocaleMeta(locale);
  const title = isEn
    ? "Masmoud Yacoubou | Full-Stack Developer — Cotonou, Benin"
    : "Masmoud Yacoubou | Développeur Full-Stack — Cotonou, Bénin";
  const description = isEn
    ? "Full-Stack Developer based in Cotonou, Benin. Specialized in React, Next.js, Node.js, Django. Available for freelance projects."
    : "Développeur Full-Stack basé à Cotonou, Bénin. Spécialisé en React, Next.js, Node.js, Django. Disponible pour vos projets.";

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.siteName,
    keywords: [
      "Développeur Full-Stack",
      "Full-Stack Developer",
      "Masmoud Yacoubou",
      "React",
      "Next.js",
      "Node.js",
      "Django",
      "TypeScript",
      "Portfolio",
      "Cotonou",
      "Bénin",
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    verification: {
      google: "-L7ScPIvkULP8yBBxT5EpeadqPfuulVjtjVTHjINBl4",
    },
    alternates: {
      canonical: getLocalizedUrl(locale),
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale),
      siteName: siteConfig.siteName,
      locale: localeMeta.ogLocale,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Masmoud Yacoubou — Développeur Full-Stack",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteConfig.url}/og-image.png`],
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const isEn = locale === "en";

  return (
    <html
      lang={getLocaleMeta(locale).htmlLang}
      suppressHydrationWarning
      className={`${poppins.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body
  suppressHydrationWarning
  className="font-poppins antialiased"
>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          {children}

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: siteConfig.name,
                givenName: "Masmoud",
                familyName: "Yacoubou",
                jobTitle: isEn ? "Full-Stack Developer" : "Développeur Full-Stack",
                description: isEn
                  ? "Full-Stack Developer based in Cotonou, Benin. Specialized in React, Next.js, Node.js, Django and robust web architectures."
                  : "Développeur Full-Stack basé à Cotonou, Bénin. Spécialisé en React, Next.js, Node.js, Django et architectures web robustes.",
                url: siteConfig.url,
                image: `${siteConfig.url}/photo.png`,
                email: siteConfig.email,
                telephone: siteConfig.phone,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: siteConfig.location.city,
                  addressRegion: siteConfig.location.region,
                  addressCountry: siteConfig.location.countryCode,
                },
                sameAs: siteConfig.socialLinks,
                knowsAbout: [
                  "React",
                  "Next.js",
                  "Node.js",
                  "Django",
                  "TypeScript",
                  "PostgreSQL",
                  "Prisma",
                  "Tailwind CSS",
                ],
                knowsLanguage: ["fr", "en"],
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
