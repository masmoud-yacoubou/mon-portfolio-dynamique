// src/app/dashboard/layout.tsx
// =============================================================================
// LAYOUT DASHBOARD
// Description : Structure principale du dashboard.
//               Combine Sidebar + Header + zone de contenu.
//               Protège toutes les pages enfants (auth requise via proxy.ts).
// =============================================================================

import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Dashboard — M.Y Portfolio",
  description: "Interface d'administration du portfolio",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased bg-slate-50 dark:bg-zinc-950" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {/* Sidebar fixe à gauche */}
          <Sidebar />

          {/* Zone principale — décalée de la largeur de la sidebar */}
          <div className="ml-64 min-h-screen flex flex-col">

            {/* Header sticky */}
            <Header />

            {/* Contenu de la page */}
            <main className="flex-1 p-8">
              {children}
            </main>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}