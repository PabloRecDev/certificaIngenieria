import type { Metadata } from "next";
import { EficienciaEnergeticaPage } from "@/components/EficienciaEnergeticaPage";

export const metadata: Metadata = {
  title: "Eficiencia Energética - Estudios, Certificación y Planes de Mejora en Madrid",
  description: "Estudios energéticos, certificación energética y planes de mejora para edificios. Analizamos consumos, identificamos oportunidades de ahorro y diseñamos planes con retorno claro y medible en Madrid.",
  keywords: [
    "eficiencia energética Madrid",
    "certificación energética",
    "estudios energéticos",
    "ahorro energético edificios",
    "certificado energético",
    "auditoría energética",
    "mejora eficiencia energética",
  ],
  openGraph: {
    title: "Eficiencia Energética - Estudios, Certificación y Planes de Mejora",
    description: "Analizamos tus consumos, identificamos oportunidades de ahorro y diseñamos planes de mejora con retorno claro y medible.",
    type: "website",
    url: "https://certificaingenieria.com/eficiencia-energetica",
  },
  alternates: {
    canonical: "https://certificaingenieria.com/eficiencia-energetica",
  },
};

export default function EficienciaEnergetica() {
  return <EficienciaEnergeticaPage />;
}



