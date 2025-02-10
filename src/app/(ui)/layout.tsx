import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NavBarContainer } from "@/ui/containers/NavBarContainer";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeliExpress: una versión lite de Mercado Libre",
  description: "Encuentra todos los productos que necesitas y guárdalos como favoritos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable}`}>
        <NavBarContainer />
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}
