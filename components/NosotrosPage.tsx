"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Buildings,
  UsersThree,
  CheckCircle,
  ArrowRight,
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
    transition: { staggerChildren: 0.12 },
  },
};

export const NosotrosPage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="space-y-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                Nosotros
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Construimos viviendas nuevas pensando en cómo se van a vivir.
              </h1>
              <p className="text-base text-slate-600 sm:text-lg">
                Certifica Ingeniería es una constructora especializada en obra nueva
                residencial. Trabajamos en viviendas unifamiliares y edificios en
                bloque, cuidando estructura, acabados y plazos con el mismo nivel de
                detalle.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src="/assets/img4.jpeg"
                alt="Nosotros"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="relative flex items-center justify-center rounded-2xl bg-white p-8"
            >
              <img
                src="/assets/logo.png"
                alt="Certifica Ingeniería"
                className="h-auto w-full max-w-md object-contain"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <UsersThree size={32} weight="duotone" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Quiénes somos
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Somos un equipo formado por arquitectos, arquitectos técnicos y
                jefes de obra acostumbrados a trabajar en vivienda unifamiliar y
                colectiva. Nos gusta tener los planos muy claros y los detalles
                resueltos antes de ejecutar, pero también saber adaptarnos a lo que
                pasa en obra.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Mantenemos un contacto directo con la propiedad y con los
                industriales. Preferimos explicar bien las opciones, plazos e
                impactos en presupuesto antes de mover una pared o cambiar un
                acabado.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cómo pensamos */}
      <section className="border-b border-slate-200 bg-slate-50 py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-10 max-w-2xl"
          >
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Cómo pensamos una vivienda
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Cada parcela, cada orientación y cada familia es distinta. Por eso
              no repetimos siempre el mismo esquema: analizamos cómo se va a
              vivir la casa, qué usos son prioritarios y cómo entra la luz en
              cada momento del día.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                title: "Luz",
                description:
                  "Ventanas, porches y patios se piensan desde el inicio para maximizar la luz natural.",
              },
              {
                title: "Recorridos",
                description:
                  "Espacios que se usan a diario sin giros raros ni pasillos eternos, pensados para el uso real.",
              },
              {
                title: "Detalle",
                description:
                  "Encuentros y remates pensados para durar, con materiales de calidad y acabados cuidados.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nuestro proceso */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-10 max-w-2xl"
          >
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Nuestro proceso de trabajo
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              De la primera conversación a la entrega de llaves, en cuatro pasos claros.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                number: "01",
                title: "Análisis y definición",
                description:
                  "Reunión inicial, planos, parcela y necesidades. De aquí salen el esquema de vivienda y el presupuesto orientativo.",
              },
              {
                number: "02",
                title: "Proyecto y planificación",
                description:
                  "Coordinamos el proyecto técnico, licencias y un calendario de estructura, cerramientos, instalaciones y acabados.",
              },
              {
                number: "03",
                title: "Ejecución de la obra",
                description:
                  "Seguimiento de obra, coordinación de oficios y resolución de detalles. Te mantenemos al día y visitamos la obra contigo.",
              },
              {
                number: "04",
                title: "Entrega y acompañamiento",
                description:
                  "Revisamos contigo la vivienda, resolvemos los últimos detalles y seguimos disponibles para cualquier duda o ajuste.",
              },
            ].map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {step.number}
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Valores */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="mb-10 max-w-2xl"
          >
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Nuestros valores
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Principios que guían nuestro trabajo en cada proyecto.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                title: "Transparencia",
                description:
                  "Comunicación clara y directa en cada fase del proyecto, explicando opciones, plazos e impactos.",
              },
              {
                title: "Compromiso",
                description:
                  "Dedicación y seguimiento constante para cumplir con calidad y plazos acordados.",
              },
              {
                title: "Detalle",
                description:
                  "Atención al detalle en estructura, acabados y coordinación para un resultado excelente.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">
                  {value.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-6 sm:flex-row sm:items-center sm:px-8"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                ¿Hablamos de tu proyecto?
              </p>
              <p className="text-sm text-slate-700 sm:text-base">
                Cuéntanos en qué punto estás y vemos cómo podemos ayudarte.
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Hablar con el equipo
              <ArrowRight size={16} weight="bold" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};



