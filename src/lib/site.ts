export const siteConfig = {
  name: "Masmoud Yacoubou",
  siteName: "Masmoud Yacoubou Portfolio",
  titleSuffix: "Masmoud Yacoubou",
  description:
    "Développeur Full-Stack basé à Cotonou, Bénin. Spécialisé en React, Next.js, Node.js, Django et architectures web robustes.",
  url: "https://masmoud-yacoubou.vercel.app",
  email: "maxdomyacoubou@gmail.com",
  phone: "+22969724172",
  location: {
    city: "Cotonou",
    region: "Littoral",
    countryCode: "BJ",
  },
  locales: ["fr", "en"] as const,
  defaultLocale: "fr" as const,
  localeMeta: {
    fr: {
      htmlLang: "fr",
      hreflang: "fr-BJ",
      ogLocale: "fr_FR",
    },
    en: {
      htmlLang: "en",
      hreflang: "en-US",
      ogLocale: "en_US",
    },
  },
  socialLinks: [
    "https://www.linkedin.com/in/masmoud-yacoubou",
    "https://github.com/masmoud-yacoubou",
    "https://wa.me/22969724172",
  ],
} as const;

export type Locale = (typeof siteConfig.locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return siteConfig.locales.includes(locale as Locale);
}

export function getLocaleMeta(locale: Locale) {
  return siteConfig.localeMeta[locale];
}

export function getLocalizedUrl(locale: Locale, pathname = ""): string {
  const normalizedPath = pathname
    ? pathname.startsWith("/")
      ? pathname
      : `/${pathname}`
    : "";

  return `${siteConfig.url}/${locale}${normalizedPath}`;
}

export function getLanguageAlternates(pathname = ""): Record<string, string> {
  return {
    [siteConfig.localeMeta.fr.hreflang]: getLocalizedUrl("fr", pathname),
    [siteConfig.localeMeta.en.hreflang]: getLocalizedUrl("en", pathname),
    "x-default": getLocalizedUrl(siteConfig.defaultLocale, pathname),
  };
}
