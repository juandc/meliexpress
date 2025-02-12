import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NavBarContainer } from "@/ui/containers/NavBarContainer";
import { ProgressBar } from "@/ui/components/client-only/ProgressBar";
import { getDictionaryFromServer } from "@/ui/dictionaries";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionaryFromServer();
  const { title, description } = dictionary.meta.default;
  return { title, description };
}

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable}`}>
        <ProgressBar />
        <NavBarContainer />
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}
