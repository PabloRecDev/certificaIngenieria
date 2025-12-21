import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import {
  Question,
  FileText,
  CheckCircle,
  Clock,
  House,
  User,
  Lightbulb,
} from "phosphor-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const faqs = [
  {
    icon: <Question size={28} weight="duotone" />,
    question: "¿Qué es la certificación energética?",
    answer:
      'La certificación de eficiencia energética de un edificio existente es: "el proceso por el que se verifica la conformidad de la calificación de eficiencia energética obtenida con el edificio existente y que conduce a la expedición de un certificado de eficiencia energética del edificio existente.".',
  },
  {
    icon: <FileText size={28} weight="duotone" />,
    question: "¿Qué es la calificación energética?",
    answer:
      "Es la expresión de la eficiencia energética de un edificio que se determina de acuerdo con una metodología de cálculo y se expresa con indicadores energéticos mediante la etiqueta de eficiencia energética.",
  },
  {
    icon: <User size={28} weight="duotone" />,
    question:
      "¿De quién es la responsabilidad, del comprador/arrendatario o del vendedor/arrendador?",
    answer:
      'La normativa indica: "El propietario del edificio completo, vivienda o local destinado a uso independiente o de titularidad jurídica diferente será responsable de encargar la realización de la certificación de eficiencia energética del edificio, o de la parte del mismo, según corresponda.',
  },
  {
    icon: <House size={28} weight="duotone" />,
    question: "¿Tengo que certificar mi vivienda?",
    answer:
      'Según la normativa vigente: "Los edificios existentes que sean objeto de contrato de compraventa o de arrendamiento deben disponer de un certificado de eficiencia energética."',
  },
  {
    icon: <Clock size={28} weight="duotone" />,
    question: "¿Qué validez tiene el certificado? ¿Tengo que renovarlo?",
    answer:
      "El certificado tiene una validez de 10 años. Y es el propietario del edificio el responsable de la renovación o actualización del certificado de eficiencia energética conforme a las condiciones que establezca el órgano competente de la Comunidad Autónoma.",
  },
  {
    icon: <CheckCircle size={28} weight="duotone" />,
    question: "¿Cuándo debo certificar mi vivienda?",
    answer:
      'En el momento de anunciar el alquiler/venta del inmueble. Puesto que la normativa especifica que: "La etiqueta de eficiencia energética debe ser incluida en toda oferta, promoción y publicidad dirigida a la venta o arrendamiento del edificio."',
  },
  {
    icon: <Lightbulb size={28} weight="duotone" />,
    question: "¿Puedo mejorar la calificación energética de mi vivienda?",
    answer:
      "Sí, junto con la calificación energética del edificio se entregarán propuestas de medidas de mejora y la calificación energética que se obtendrían con ellas.",
  },
];

const Certificacion: React.FC = () => {
  return (
    <Layout>
      <motion.section
        className="relative bg-gradient-to-br from-white to-emerald-50 py-16 sm:py-20"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="section-container text-center">
          <motion.h1
            className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
            variants={fadeInUp}
          >
            Certificación Energética
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-slate-600"
            variants={fadeInUp}
          >
            Resolvemos tus dudas sobre la certificación energética de edificios
            y viviendas.
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className="py-16 sm:py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="section-container max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-secondary/30"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary">
                    {faq.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-8 text-center"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-semibold text-slate-900">
              ¿Necesitas certificar tu vivienda o edificio?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Contacta con nosotros y te ayudamos con todo el proceso de
              certificación energética.
            </p>
            <Link to="/contacto">
              <motion.div
                className="btn-primary mt-6 px-6 py-2.5 text-sm shadow-md shadow-black/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicitar certificación
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Certificacion;

