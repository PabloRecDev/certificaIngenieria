import type { Metadata } from "next";
import { ExperienciaPage } from "@/components/ExperienciaPage";

export const metadata: Metadata = {
  title: "Experiencia - Proyectos de Obra Nueva Residencial en Madrid | Certifica Ingeniería",
  description: "Más de 20 años de experiencia construyendo viviendas unifamiliares y edificios en bloque en Madrid. Ejemplos de promociones y viviendas ejecutadas con calidad y entregadas en plazo.",
  keywords: [
    "proyectos constructora Madrid",
    "experiencia constructora",
    "viviendas construidas Madrid",
    "edificios residenciales",
    "obra nueva entregada",
    "promociones vivienda",
    "portfolio constructora",
  ],
  openGraph: {
    title: "Experiencia - Proyectos de Obra Nueva Residencial",
    description: "Más de 20 años construyendo viviendas unifamiliares y edificios en bloque en Madrid.",
    type: "website",
    url: "https://certificaingenieria.com/experiencia",
    images: [
      {
        url: "/assets/img4.jpeg",
        width: 1200,
        height: 630,
        alt: "Proyectos de obra nueva residencial - Certifica Ingeniería",
      },
    ],
  },
  alternates: {
    canonical: "https://certificaingenieria.com/experiencia",
  },
};

export default function Experiencia() {
  return <ExperienciaPage />;
}



