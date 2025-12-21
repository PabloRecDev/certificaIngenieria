import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Certifica Ingeniería - Constructora especializada en obra nueva residencial",
  description: "Construimos viviendas nuevas pensando en cómo se van a vivir. Especialistas en viviendas unifamiliares y edificios en bloque.",
  keywords: ["constructora", "obra nueva", "viviendas", "edificios residenciales", "Madrid"],
  authors: [{ name: "Certifica Ingeniería" }],
  openGraph: {
    title: "Certifica Ingeniería",
    description: "Constructora especializada en obra nueva residencial",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

