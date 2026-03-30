import "../../globals.css";
import { Montserrat, Poppins } from "next/font/google";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
  subsets:  ["latin"],
  weight:   ["400", "500", "700", "900"],
  variable: "--font-poppins",
  display:  "swap",
});

const montserrat = Montserrat({
  subsets:  ["latin"],
  weight:   ["400", "500", "700", "800", "900"],
  variable: "--font-montserrat",
  display:  "swap",
});

const baseUrl = "https://masmoud-yacoubou.vercel.app";

// ---- Génération dynamique des metadata selon la locale ----
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const title       = isEn
    ? "Masmoud Y. | Full-Stack Developer"
    : "Masmoud Y. | Développeur Full-Stack Cotonou";

  const description = isEn
    ? "Full-Stack Developer based in Cotonou, Benin. Specialized in React, Next.js and scalable web architectures."
    : "Développeur Full-Stack basé à Cotonou, Bénin. Spécialisé en React, Next.js et architectures web performantes.";

  return {
    title,
    description,

    // ---- Canoniques & hreflang ----
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "fr": `${baseUrl}/fr`,
        "en": `${baseUrl}/en`,
        "x-default": `${baseUrl}/fr`,
      },
    },

    // ---- Open Graph (LinkedIn, WhatsApp, Facebook) ----
    openGraph: {
      title,
      description,
      url:      `${baseUrl}/${locale}`,
      siteName: "Masmoud Y. Portfolio",
      locale:   isEn ? "en_US" : "fr_FR",
      type:     "website",
      images: [
        {
          url:    `${baseUrl}/og-image.png`,
          width:  1200,
          height: 630,
          alt:    "Masmoud Y. Portfolio Preview",
        },
      ],
    },

    // ---- Twitter/X ----
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [`${baseUrl}/og-image.png`],
    },

    // ---- Favicon ----
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple:    "/favicon.svg",
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

  return (
    <div
      lang={locale}
      className={`${poppins.variable} ${montserrat.variable} font-poppins antialiased bg-white dark:bg-[#080808] min-h-screen`}
    >
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Navbar />
        {children}
      </ThemeProvider>
    </div>
  );
}