import "../../globals.css";
import { Montserrat, Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700", "900"],
  variable: "--font-poppins" 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat" 
});

export const metadata = {
  title: "Masmoud Y. | Full-Stack Developer",
  description: "Portfolio de Masmoud Yacoubou, Développeur Full-Stack basé à Cotonou.",
  icons: {
    icon: "/favicon.ico", // Le fichier que tu as mis dans /public
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    // On utilise une div pour injecter les polices et le thème
    // sans recréer de balises html/body
    <div lang={locale} className={`${poppins.variable} ${montserrat.variable} font-sans antialiased bg-white dark:bg-[#020202] min-h-screen`}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Navbar />
        {children}
      </ThemeProvider>
    </div>
  );
}