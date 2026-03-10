// src/app/dashboard/layout.tsx
// =============================================================================
// LAYOUT DASHBOARD
// Description : Structure principale du dashboard.
//               Sidebar drawer sur mobile, fixe sur desktop (lg+).
// =============================================================================

"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import "@/app/globals.css";

// Note: metadata ne peut pas être exportée depuis un Client Component.
// Déplace-la dans un layout séparé si le SEO est requis.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className="antialiased bg-slate-50 dark:bg-zinc-950"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>

          {/* Sidebar (drawer mobile / fixe desktop) */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Zone principale */}
          <div className="lg:ml-64 min-h-screen flex flex-col">

            {/* Header */}
            <Header onMenuOpen={() => setSidebarOpen(true)} />

            {/* Contenu */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              {children}
            </main>

          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}