import type { Metadata } from "next";
import { ObraNuevaPage } from "@/components/ObraNuevaPage";

export const metadata: Metadata = {
  title: "Obra Nueva Residencial - Viviendas Unifamiliares y Edificios Colectivos en Madrid",
  description: "Proyectos completos de obra nueva residencial desde cero: diseño, estructura, instalaciones y coordinación de oficios. Especialistas en viviendas unifamiliares y edificios en bloque en Madrid.",
  keywords: [
    "obra nueva residencial Madrid",
    "viviendas unifamiliares",
    "edificios colectivos",
    "promociones vivienda Madrid",
    "constructora obra nueva",
    "viviendas llave en mano",
    "edificios en bloque",
    "dirección de obra",
  ],
  openGraph: {
    title: "Obra Nueva Residencial - Viviendas Unifamiliares y Edificios Colectivos",
    description: "Proyectos completos desde cero: diseño, estructura, instalaciones y coordinación para entregar viviendas eficientes y confortables.",
    type: "website",
    url: "https://certificaingenieria.com/obra-nueva",
    images: [
      {
        url: "/assets/img4.jpeg",
        width: 1200,
        height: 630,
        alt: "Obra nueva residencial - Promoción de viviendas",
      },
    ],
  },
  alternates: {
    canonical: "https://certificaingenieria.com/obra-nueva",
  },
};

export default function ObraNueva() {
  return <ObraNuevaPage />;
}



