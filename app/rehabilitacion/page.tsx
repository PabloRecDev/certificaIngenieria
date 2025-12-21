import type { Metadata } from "next";
import RehabilitacionPage from "@/components/RehabilitacionPage";

export const metadata: Metadata = {
  title: "Rehabilitación Energética - Certifica Ingeniería",
  description:
    "Rehabilitamos tu edificio para consumir menos y vivir mejor. Fachadas SATE, mejora de eficiencia energética y aprovechamiento de ayudas.",
  keywords: [
    "rehabilitación energética",
    "SATE",
    "eficiencia energética",
    "rehabilitación edificios",
    "subvenciones rehabilitación",
  ],
};

export default function Rehabilitacion() {
  return <RehabilitacionPage />;
}

