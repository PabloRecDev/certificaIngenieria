import type { Metadata } from "next";
import { ExperienciaPage } from "@/components/ExperienciaPage";

export const metadata: Metadata = {
  title: "Experiencia - Proyectos de obra nueva residencial | Certifica Ingeniería",
  description: "Viviendas y edificios residenciales construidos por nuestro equipo. Ejemplos de promociones y viviendas unifamiliares ejecutadas con calidad y en plazo.",
  keywords: ["proyectos", "experiencia", "viviendas construidas", "edificios residenciales", "obra nueva", "Madrid"],
  openGraph: {
    title: "Experiencia - Certifica Ingeniería",
    description: "Viviendas que ya están construidas y entregadas.",
    type: "website",
  },
};

export default function Experiencia() {
  return <ExperienciaPage />;
}



