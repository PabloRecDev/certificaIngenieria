import type { Metadata } from "next";
import { NosotrosPage } from "@/components/NosotrosPage";

export const metadata: Metadata = {
  title: "Nosotros - Certifica Ingeniería | Constructora especializada en obra nueva",
  description: "Construimos viviendas nuevas pensando en cómo se van a vivir. Equipo de arquitectos, arquitectos técnicos y jefes de obra especializados en vivienda unifamiliar y colectiva.",
  keywords: ["constructora", "equipo", "arquitectos", "obra nueva", "viviendas", "Madrid"],
  openGraph: {
    title: "Nosotros - Certifica Ingeniería",
    description: "Construimos viviendas nuevas pensando en cómo se van a vivir.",
    type: "website",
  },
};

export default function Nosotros() {
  return <NosotrosPage />;
}



