import type { Metadata } from "next";
import { NosotrosPage } from "@/components/NosotrosPage";

export const metadata: Metadata = {
  title: "Nosotros - Equipo de Constructora Especializada en Obra Nueva | Certifica Ingeniería",
  description: "Más de 20 años construyendo viviendas nuevas pensando en cómo se van a vivir. Equipo de arquitectos, arquitectos técnicos y jefes de obra especializados en vivienda unifamiliar y colectiva en Madrid.",
  keywords: [
    "equipo constructora Madrid",
    "arquitectos constructora",
    "arquitectos técnicos",
    "jefes de obra",
    "constructora especializada",
    "experiencia constructora",
    "profesionales construcción",
  ],
  openGraph: {
    title: "Nosotros - Equipo de Constructora Especializada en Obra Nueva",
    description: "Equipo de arquitectos, arquitectos técnicos y jefes de obra especializados en vivienda unifamiliar y colectiva.",
    type: "website",
    url: "https://certificaingenieria.com/nosotros",
  },
  alternates: {
    canonical: "https://certificaingenieria.com/nosotros",
  },
};

export default function Nosotros() {
  return <NosotrosPage />;
}



