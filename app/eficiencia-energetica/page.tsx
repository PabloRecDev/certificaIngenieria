import type { Metadata } from "next";
import { EficienciaEnergeticaPage } from "@/components/EficienciaEnergeticaPage";

export const metadata: Metadata = {
  title: "Eficiencia Energética - Estudios, Certificación y Planes de Mejora",
  description: "Analizamos tus consumos, identificamos oportunidades de ahorro y diseñamos planes de mejora con retorno claro y medible.",
  keywords: ["eficiencia energética", "certificación energética", "estudios energéticos", "ahorro energético", "Madrid"],
  openGraph: {
    title: "Eficiencia Energética - Certifica Ingeniería",
    description: "Estudios, certificación y planes de mejora energética.",
    type: "website",
  },
};

export default function EficienciaEnergetica() {
  return <EficienciaEnergeticaPage />;
}



