"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scales,
  FileText,
  BookOpen,
  CheckCircle,
  Warning,
  Calendar,
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

const normativas = [
  {
    icon: <FileText size={28} weight="duotone" />,
    title: "Real Decreto 390/2021",
    subtitle: "Certificación de eficiencia energética de edificios",
    description:
      "Normativa que regula la certificación de eficiencia energética de los edificios existentes, estableciendo los procedimientos y requisitos para la obtención del certificado energético.",
    fecha: "2021",
  },
  {
    icon: <Scales size={28} weight="duotone" />,
    title: "Directiva 2010/31/UE",
    subtitle: "Eficiencia energética de los edificios",
    description:
      "Directiva europea que establece el marco normativo para mejorar el rendimiento energético de los edificios, incluyendo la obligatoriedad de certificación energética.",
    fecha: "2010",
  },
  {
    icon: <BookOpen size={28} weight="duotone" />,
    title: "Código Técnico de la Edificación (CTE)",
    subtitle: "Documento Básico HE - Ahorro de Energía",
    description:
      "Reglamento que establece las exigencias básicas de ahorro de energía que deben cumplir los edificios, tanto en obra nueva como en rehabilitación.",
    fecha: "Actualizado 2022",
  },
  {
    icon: <CheckCircle size={28} weight="duotone" />,
    title: "Obligaciones del propietario",
    subtitle: "Responsabilidades legales",
    description:
      "El propietario es responsable de encargar y conservar el certificado de eficiencia energética, así como de exhibirlo en toda oferta, promoción y publicidad dirigida a la venta o arrendamiento.",
    fecha: "Vigente",
  },
  {
    icon: <Warning size={28} weight="duotone" />,
    title: "Sanciones y multas",
    subtitle: "Incumplimiento normativo",
    description:
      "El incumplimiento de la normativa de certificación energética puede conllevar sanciones económicas que varían según la gravedad de la infracción y la Comunidad Autónoma.",
    fecha: "Vigente",
  },
  {
    icon: <Calendar size={28} weight="duotone" />,
    title: "Validez del certificado",
    subtitle: "10 años de vigencia",
    description:
      "El certificado de eficiencia energética tiene una validez de 10 años, debiendo ser renovado o actualizado por el propietario cuando corresponda según la normativa autonómica.",
    fecha: "Vigente",
  },
];

export default function NormativaPage() {
  return (
    <>
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
            Normativa Energética
          </motion.h1>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-slate-600"
            variants={fadeInUp}
          >
            Información sobre la normativa vigente en materia de eficiencia y
            certificación energética de edificios.
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
        <div className="section-container max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {normativas.map((normativa, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-brand-secondary/30"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/10 text-brand-secondary transition group-hover:bg-brand-secondary/20">
                    {normativa.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {normativa.title}
                        </h3>
                        <p className="text-xs font-medium text-brand-secondary">
                          {normativa.subtitle}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600">
                        {normativa.fecha}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {normativa.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-semibold text-slate-900">
              ¿Necesitas asesoramiento sobre normativa?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Nuestro equipo está al día de toda la normativa vigente y puede
              ayudarte a cumplir con todos los requisitos legales.
            </p>
            <Link href="/contacto">
              <motion.div
                className="btn-primary mt-6 px-6 py-2.5 text-sm shadow-md shadow-black/30 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Consultar con expertos
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

