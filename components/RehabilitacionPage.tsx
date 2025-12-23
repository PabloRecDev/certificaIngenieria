"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Buildings, Leaf, Thermometer, ArrowRight } from "phosphor-react";

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

const blocks = [
  {
    icon: <Buildings size={40} weight="duotone" />,
    title: "Rehabilitación integral de edificios",
    description:
      "Analizamos la envolvente, las instalaciones y el uso real del edificio para plantear un paquete de actuaciones coherente.",
    items: [
      "Fachadas SATE, cubiertas y huecos acristalados.",
      "Mejora de puentes térmicos y estanqueidad.",
      "Coordinación con arquitectos y comunidades.",
    ],
  },
  {
    icon: <Leaf size={40} weight="duotone" />,
    title: "Mejora de la eficiencia energética",
    description:
      "Reducimos demanda y consumo combinando soluciones pasivas y activas, con un foco claro en el retorno de la inversión.",
    items: [
      "Sustitución de calderas y sistemas de climatización.",
      "Integración de energías renovables (autoconsumo, aerotermia).",
      "Sistemas de control, regulación y monitorización.",
    ],
  },
  {
    icon: <Thermometer size={40} weight="duotone" />,
    title: "Confort, normativa y ayudas",
    description:
      "Te acompañamos para que la rehabilitación cumpla normativa, mejore el confort y aproveche las ayudas disponibles.",
    items: [
      "Justificación del CTE y certificados energéticos antes/después.",
      "Apoyo en tramitación de subvenciones y fondos NextGen.",
      "Informes claros para comunidades y propiedad.",
    ],
  },
];

export default function RehabilitacionPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
              Rehabilitación energética
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Rehabilitar tu edificio para consumir menos y vivir mejor.
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Te ayudamos a pasar de un edificio que gasta demasiado a uno más eficiente,
              confortable y preparado para los próximos años.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bloques de servicio */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container space-y-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {blocks.map((block, index) => (
              <motion.article
                key={block.title}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  {block.icon}
                </div>
                <h2 className="mb-2 text-lg font-semibold tracking-tight text-slate-900">
                  {block.title}
                </h2>
                <p className="mb-3 text-sm leading-relaxed text-slate-600">
                  {block.description}
                </p>
                <ul className="mb-4 space-y-1.5 text-xs text-slate-700">
                  {block.items.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
                <div className="mt-auto pt-2 text-xs text-slate-500">
                  Pensado para comunidades, promotores y propietarios individuales que
                  quieren un proyecto bien planteado desde el principio.
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* CTA hacia contacto */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-slate-900 px-6 py-6 text-slate-50 sm:flex-row sm:items-center sm:px-8"
          >
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                ¿Pensando en rehabilitar?
              </p>
              <p className="text-sm text-slate-100 sm:text-base">
                Cuéntanos qué edificio quieres mejorar y te preparamos un esquema de
                actuaciones y plazos.
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-md shadow-black/30 transition hover:bg-slate-100"
            >
              Hablar sobre mi edificio
              <ArrowRight size={16} weight="bold" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ejemplos de proyectos */}
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
              Ejemplos de proyectos de rehabilitación
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Algunos ejemplos de rehabilitaciones que hemos ejecutado.
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
                image: "/assets/img1.jpeg",
                title: "Rehabilitación de fachada",
                location: "Calle Manzanos 34, San Sebastián de los Reyes",
              },
              {
                image: "/assets/img2.jpeg",
                title: "Rehabilitación de fachada",
                location: "Calle Manzanos 34, San Sebastián de los Reyes",
              },
              {
                image: "/assets/img3.jpeg",
                title: "Rehabilitación de fachada",
                location: "Calle Manzanos 34, San Sebastián de los Reyes",
              },
            ].map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                variants={fadeInUp}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-1 text-base font-semibold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

