import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google"
 
const roboto = Roboto({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Mapa de Memórias",
  description: "Mapa de memórias da turma do 4° ano do curso Técnico em Informática pelo Campus Feliz do IFRS, ano de 2024.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
