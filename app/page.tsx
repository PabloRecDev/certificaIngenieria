import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Certifica Ingeniería - Constructora especializada en obra nueva residencial",
  description: "Construimos viviendas nuevas pensando en cómo se van a vivir. Especialistas en viviendas unifamiliares y edificios en bloque en Madrid.",
  keywords: ["constructora", "obra nueva", "viviendas unifamiliares", "edificios residenciales", "Madrid", "promociones"],
  openGraph: {
    title: "Certifica Ingeniería - Constructora especializada en obra nueva residencial",
    description: "Viviendas nuevas bien pensadas desde el primer plano hasta la entrega de llaves.",
    type: "website",
  },
};

export default function Home() {
  return <HomePage />;
}

