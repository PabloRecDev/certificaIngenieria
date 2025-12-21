import type { Metadata } from "next";
import { PorQuePage } from "@/components/PorQuePage";

export const metadata: Metadata = {
  title: "Por qué Certifica - Constructora con experiencia en obra nueva residencial",
  description: "Más que una constructora: un equipo que planifica, ejecuta y acompaña. Calidad en la ejecución, cuidado por el detalle y planificación realista de plazos.",
  keywords: ["por qué elegir", "calidad", "experiencia", "constructora", "obra nueva", "Madrid"],
  openGraph: {
    title: "Por qué Certifica Ingeniería",
    description: "Más que una constructora: un equipo que planifica, ejecuta y acompaña.",
    type: "website",
  },
};

export default function PorQue() {
  return <PorQuePage />;
}



