import type { Metadata } from "next";
import ServiciosPage from "@/components/ServiciosPage";

export const metadata: Metadata = {
  title: "Servicios de Ingeniería Energética - Certifica Ingeniería",
  description:
    "Ingeniería energética 360º: eficiencia energética, certificación, auditorías, energías renovables y proyectos de mejora energética.",
  keywords: [
    "ingeniería energética",
    "eficiencia energética",
    "auditorías energéticas",
    "energías renovables",
    "autoconsumo",
    "proyectos energéticos",
  ],
};

export default function Servicios() {
  return <ServiciosPage />;
}

