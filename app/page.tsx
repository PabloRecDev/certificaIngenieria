import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Constructora especializada en obra nueva residencial en Madrid | Certifica Ingeniería",
  description: "Construimos viviendas unifamiliares y edificios en bloque desde el primer boceto hasta la entrega de llaves. Constructora especializada en obra nueva residencial en Madrid y Comunidad de Madrid.",
  keywords: [
    "constructora Madrid",
    "obra nueva residencial",
    "viviendas unifamiliares Madrid",
    "edificios residenciales",
    "promociones vivienda Madrid",
    "constructora Carabanchel",
    "viviendas llave en mano",
    "dirección de obra",
    "coordinación de oficios",
  ],
  openGraph: {
    title: "Certifica Ingeniería - Constructora especializada en obra nueva residencial",
    description: "Construimos viviendas pensadas para vivir. Desde el primer boceto hasta la entrega de llaves en Madrid.",
    type: "website",
    url: "https://certificaingenieria.com",
    images: [
      {
        url: "/assets/img4.jpeg",
        width: 1200,
        height: 630,
        alt: "Viviendas construidas por Certifica Ingeniería",
      },
    ],
  },
  alternates: {
    canonical: "https://certificaingenieria.com",
  },
};

export default function Home() {
  return <HomePage />;
}

