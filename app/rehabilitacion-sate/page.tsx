import type { Metadata } from "next";
import { RehabilitacionSatePage } from "@/components/RehabilitacionSatePage";

export const metadata: Metadata = {
  title: "Rehabilitación y SATE - Mejora de Envolvente y Aislamiento Térmico en Madrid",
  description: "Rehabilitación integral de edificios existentes y sistemas SATE (Sistema de Aislamiento Térmico por el Exterior) para mejorar la eficiencia energética, el confort y prolongar la vida útil del edificio en Madrid.",
  keywords: [
    "rehabilitación edificios Madrid",
    "SATE Madrid",
    "aislamiento térmico exterior",
    "rehabilitación fachadas",
    "sistema SATE",
    "mejora envolvente térmica",
    "rehabilitación energética",
  ],
  openGraph: {
    title: "Rehabilitación y SATE - Mejora de Envolvente y Aislamiento Térmico",
    description: "Rehabilitación integral de edificios existentes y sistemas SATE para mejorar la eficiencia energética y el confort.",
    type: "website",
    url: "https://certificaingenieria.com/rehabilitacion-sate",
    images: [
      {
        url: "/assets/img1.jpeg",
        width: 1200,
        height: 630,
        alt: "Rehabilitación de fachada con sistema SATE",
      },
    ],
  },
  alternates: {
    canonical: "https://certificaingenieria.com/rehabilitacion-sate",
  },
};

export default function RehabilitacionSate() {
  return <RehabilitacionSatePage />;
}



