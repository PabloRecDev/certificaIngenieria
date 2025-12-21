import type { Metadata } from "next";
import { ContactoPage } from "@/components/ContactoPage";

export const metadata: Metadata = {
  title: "Contacto - Certifica Ingeniería | Habla con nuestro equipo",
  description: "Cuéntanos tu proyecto y te preparamos un prediagnóstico energético sin compromiso. Te responderemos en menos de 48 horas laborables.",
  keywords: ["contacto", "presupuesto", "consulta", "prediagnóstico", "Madrid"],
  openGraph: {
    title: "Contacto - Certifica Ingeniería",
    description: "Cuéntanos tu proyecto y te ayudamos a definir los siguientes pasos.",
    type: "website",
  },
};

export default function Contacto() {
  return <ContactoPage />;
}



