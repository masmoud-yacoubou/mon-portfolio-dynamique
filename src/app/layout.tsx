// src/app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Masmoud Y.',
    default: 'Masmoud Y. | Full-Stack Developer',
  },
  description: 'Développeur Full-Stack basé à Cotonou. Expertise en React, Next.js et architectures robustes.',
  metadataBase: new URL('https://ton-portfolio.com'), // REMPLACE PAR TON URL RÉELLE
  
  // Balises pour LinkedIn, Facebook, WhatsApp
  openGraph: {
    title: 'Masmoud Y. | Full-Stack Developer',
    description: 'Conception d’écosystèmes numériques performants et centrés sur l’utilisateur.',
    url: 'https://ton-portfolio.com',
    siteName: 'Masmoud Y. Portfolio',
    images: [
      {
        url: '/og-image.png', // Image de 1200x630px dans ton dossier public
        width: 1200,
        height: 630,
        alt: 'Masmoud Y. Portfolio Preview',
      },
    ],
    locale: 'fr_FR',
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
    <html suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}