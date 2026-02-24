"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider 
      attribute="class" // Indique à next-themes d'ajouter la classe "dark" au <html>
      defaultTheme="system" 
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}