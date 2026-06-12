import "@/app/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { montserrat, poppins } from "@/lib/fonts";
import DashboardShell from "./_components/DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard | Masmoud Yacoubou",
  description: "Interface d'administration du portfolio de Masmoud Yacoubou.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${poppins.variable} ${montserrat.variable}`}
    >
      <body
        className="font-poppins antialiased bg-slate-50 text-black dark:bg-zinc-950 dark:text-white"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <DashboardShell>{children}</DashboardShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
