import type { Metadata } from "next";
import CertificacionPage from "@/components/CertificacionPage";

export const metadata: Metadata = {
  title: "Certificación Energética - Preguntas Frecuentes - Certifica Ingeniería",
  description:
    "Resolvemos tus dudas sobre la certificación energética de edificios y viviendas. ¿Qué es? ¿Cuándo es obligatoria? ¿Cuánto vale?",
  keywords: [
    "certificación energética",
    "certificado energético",
    "calificación energética",
    "etiqueta energética",
    "certificar vivienda",
  ],
};

export default function Certificacion() {
  return <CertificacionPage />;
}

