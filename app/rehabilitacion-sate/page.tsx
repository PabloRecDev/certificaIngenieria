import type { Metadata } from "next";
import { RehabilitacionSatePage } from "@/components/RehabilitacionSatePage";

export const metadata: Metadata = {
  title: "Rehabilitación y SATE - Mejora de Envolvente y Aislamiento Térmico",
  description: "Rehabilitación integral de edificios existentes y sistemas SATE para mejorar la eficiencia energética, el confort y prolongar la vida útil.",
  keywords: ["rehabilitación", "SATE", "aislamiento térmico", "envolvente", "edificios existentes", "Madrid"],
  openGraph: {
    title: "Rehabilitación y SATE - Certifica Ingeniería",
    description: "Mejora de envolvente y sistemas de aislamiento térmico por el exterior.",
    type: "website",
  },
};

export default function RehabilitacionSate() {
  return <RehabilitacionSatePage />;
}



