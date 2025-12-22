"use client";

import React from "react";
import { motion } from "framer-motion";
import { Buildings, Wrench, ArrowRight, CheckCircle } from "phosphor-react";
import Link from "next/link";

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

export const RehabilitacionSatePage: React.FC = () => {
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
                Rehabilitación y SATE
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Mejora de envolvente y sistemas de aislamiento térmico por el exterior.
              </h1>
              <p className="text-base text-slate-600 sm:text-lg">
                Rehabilitación integral de edificios existentes y sistemas SATE para
                mejorar la eficiencia energética, el confort y prolongar la vida útil.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <img
                src="/assets/img4.jpeg"
                alt="Rehabilitación y SATE"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tipos de servicio */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-2"
          >
            <motion.article
              variants={fadeInUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Buildings size={32} weight="duotone" />
                </div>
                <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
                  Rehabilitación de edificios
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  Análisis completo de la envolvente, instalaciones y uso real del edificio
                  para plantear un paquete de actuaciones coherente y eficiente.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Rehabilitación integral de fachadas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Mejora de cubiertas y huecos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Eliminación de puentes térmicos
                  </li>
                </ul>
              </div>
            </motion.article>

            <motion.article
              variants={fadeInUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Wrench size={32} weight="duotone" />
                </div>
                <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
                  SATE y envolvente térmica
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  Sistemas de aislamiento térmico por el exterior que mejoran la eficiencia
                  energética sin reducir espacio interior y mejoran la estética del edificio.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Sistemas SATE completos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Aislamiento térmico exterior
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Mejora de estanqueidad
                  </li>
                </ul>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* Servicios incluidos */}
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
              Servicios incluidos en cada proyecto
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Desde el análisis inicial hasta la verificación de resultados, acompañamos
              cada fase del proyecto de rehabilitación.
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
                title: "Análisis y diagnóstico",
                description:
                  "Estudio completo del edificio, identificación de problemas y propuesta de soluciones.",
              },
              {
                title: "Proyecto y dirección",
                description:
                  "Redacción de proyecto de ejecución y dirección facultativa durante toda la obra.",
              },
              {
                title: "Coordinación y seguimiento",
                description:
                  "Coordinación con arquitectos, comunidades y empresas, control de calidad y plazos.",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-base font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </motion.div>
            ))}
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
              Ejemplos de proyectos de rehabilitación y SATE
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Algunos ejemplos de rehabilitaciones de fachada que hemos ejecutado.
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
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="flex h-full items-center justify-center text-slate-400 text-sm">Imagen no disponible</div>';
                      }
                    }}
                    loading="lazy"
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
                ¿Pensando en rehabilitar tu edificio?
              </p>
              <p className="text-sm text-slate-700 sm:text-base">
                Cuéntanos qué edificio quieres mejorar y te preparamos un esquema de
                actuaciones y plazos sin compromiso.
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Hablar sobre mi edificio
              <ArrowRight size={16} weight="bold" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

