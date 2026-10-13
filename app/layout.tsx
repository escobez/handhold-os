import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Handhold | Um Guia Dedicado por IA para Cada Comprador",
  description:
    "Agentes de IA executando demonstrações interativas sob medida e onboarding personalizado 24 horas por dia. Transforme cada visitante em um cliente engajado e qualificado.",
  keywords: [
    "Agentes de IA",
    "demonstrações interativas",
    "onboarding de clientes",
    "automação de vendas B2B",
    "prospector TRCP",
  ],
  authors: [{ name: "Handhold Systems" }],
  openGraph: {
    title: "Handhold | Guias Autônomos de Produto para Empresas Modernas",
    description: "Agentes de inteligência artificial executando tours guiados sob medida 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="min-h-screen bg-[#080A0F] text-[#F3F4F6] antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
