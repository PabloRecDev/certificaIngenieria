import type { Metadata } from "next";
import { ContactoPage } from "@/components/ContactoPage";

export const metadata: Metadata = {
  title: "Contacto - Habla con Certifica Ingeniería | Presupuesto sin compromiso",
  description: "Cuéntanos tu proyecto de obra nueva o rehabilitación y te preparamos un presupuesto sin compromiso. Te responderemos en menos de 48 horas laborables. Constructora en Madrid.",
  keywords: [
    "contacto constructora Madrid",
    "presupuesto obra nueva",
    "consulta constructora",
    "presupuesto sin compromiso",
    "constructora Carabanchel",
    "teléfono constructora Madrid",
  ],
  openGraph: {
    title: "Contacto - Habla con Certifica Ingeniería",
    description: "Cuéntanos tu proyecto y te ayudamos a definir los siguientes pasos. Presupuesto sin compromiso.",
    type: "website",
    url: "https://certificaingenieria.com/contacto",
  },
  alternates: {
    canonical: "https://certificaingenieria.com/contacto",
  },
};

export default function Contacto() {
  return <ContactoPage />;
}



