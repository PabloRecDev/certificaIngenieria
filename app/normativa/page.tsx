import type { Metadata } from "next";
import NormativaPage from "@/components/NormativaPage";

export const metadata: Metadata = {
  title: "Normativa Energética - Certifica Ingeniería",
  description:
    "Información sobre la normativa vigente en materia de eficiencia y certificación energética de edificios. RD 390/2021, CTE, Directiva Europea.",
  keywords: [
    "normativa energética",
    "RD 390/2021",
    "certificación energética",
    "CTE",
    "directiva europea",
    "obligaciones propietario",
  ],
};

export default function Normativa() {
  return <NormativaPage />;
}

