import React from "react";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import { House, Buildings, ArrowRight, CheckCircle } from "phosphor-react";

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

const ObraNueva: React.FC = () => {
  return (
    <Layout>
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
                Obra nueva residencial
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Viviendas Unifamiliares y edificios colectivos.
              </h1>
              <p className="text-base text-slate-600 sm:text-lg">
                Proyectos completos desde cero: diseño, estructura, instalaciones y
                coordinación para entregar viviendas eficientes y confortables.
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
                src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Vivienda residencial"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tipos de vivienda */}
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
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Vivienda unifamiliar"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <House size={32} weight="duotone" />
                </div>
                <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
                  Viviendas Unifamiliares
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  Casas aisladas o pareadas, diseñadas para maximizar el confort y la
                  eficiencia energética desde el primer día.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Viviendas aisladas y pareadas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Diseño personalizado
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Alta eficiencia energética
                  </li>
                </ul>
              </div>
            </motion.article>

            <motion.article
              variants={fadeInUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Edificio colectivo"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <Buildings size={32} weight="duotone" />
                </div>
                <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
                  Edificios Colectivos
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  Promociones residenciales en bloque, optimizando espacios comunes,
                  instalaciones centralizadas y cumplimiento normativo.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Promociones en bloque
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Espacios comunes optimizados
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Instalaciones centralizadas
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
              Desde el diseño inicial hasta la entrega final, acompañamos cada fase del proyecto.
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
                title: "Diseño y proyecto",
                description: "Redacción de proyecto básico y de ejecución, cumpliendo normativa vigente.",
              },
              {
                title: "Coordinación de oficios",
                description: "Gestión y coordinación de todos los agentes implicados en la obra.",
              },
              {
                title: "Seguimiento y control",
                description: "Control de calidad, plazos y presupuesto durante toda la ejecución.",
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
                ¿Tienes un proyecto en mente?
              </p>
              <p className="text-sm text-slate-700 sm:text-base">
                Cuéntanos tu idea y te ayudamos a definir el proyecto desde el inicio.
              </p>
            </div>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Hablar sobre mi proyecto
              <ArrowRight size={16} weight="bold" />
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ObraNueva;

