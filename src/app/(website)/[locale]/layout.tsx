import "../../globals.css";
import { Montserrat, Poppins } from "next/font/google";
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

export const metadata = {
  title:       "Masmoud Y. | Full-Stack Developer",
  description: "Portfolio de Masmoud Yacoubou, Développeur Full-Stack basé à Cotonou.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple:    "/favicon.svg",
    shortcut: "/favicon.svg",
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