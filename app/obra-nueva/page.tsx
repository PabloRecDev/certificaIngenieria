import type { Metadata } from "next";
import { ObraNuevaPage } from "@/components/ObraNuevaPage";

export const metadata: Metadata = {
  title: "Obra Nueva Residencial - Viviendas Unifamiliares y Edificios Colectivos",
  description: "Proyectos completos desde cero: diseño, estructura, instalaciones y coordinación para entregar viviendas eficientes y confortables.",
  keywords: ["obra nueva", "viviendas unifamiliares", "edificios colectivos", "promociones", "constructora", "Madrid"],
  openGraph: {
    title: "Obra Nueva Residencial - Certifica Ingeniería",
    description: "Viviendas Unifamiliares y edificios colectivos.",
    type: "website",
  },
};

export default function ObraNueva() {
  return <ObraNuevaPage />;
}



