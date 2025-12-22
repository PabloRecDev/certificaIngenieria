import type { Metadata } from "next";
import { PorQuePage } from "@/components/PorQuePage";

export const metadata: Metadata = {
  title: "Por qué Certifica - Constructora con Experiencia en Obra Nueva Residencial en Madrid",
  description: "Más que una constructora: un equipo que planifica, ejecuta y acompaña. Calidad en la ejecución, cuidado por el detalle, planificación realista de plazos y seguimiento constante de obra en Madrid.",
  keywords: [
    "por qué elegir constructora",
    "calidad construcción",
    "experiencia constructora Madrid",
    "constructora de confianza",
    "calidad ejecución",
    "cuidado detalle construcción",
    "planificación obra",
  ],
  openGraph: {
    title: "Por qué Certifica - Constructora con Experiencia en Obra Nueva",
    description: "Más que una constructora: un equipo que planifica, ejecuta y acompaña con calidad y cuidado por el detalle.",
    type: "website",
    url: "https://certificaingenieria.com/por-que-certifica",
  },
  alternates: {
    canonical: "https://certificaingenieria.com/por-que-certifica",
  },
};

export default function PorQue() {
  return <PorQuePage />;
}



