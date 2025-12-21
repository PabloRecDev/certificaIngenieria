import React from "react";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import {
  ChartLineUp,
  FileText,
  Lightbulb,
  ArrowRight,
  CheckCircle,
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

const EficienciaEnergetica: React.FC = () => {
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
                Eficiencia energética
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Estudios, certificación y planes de mejora energética.
              </h1>
              <p className="text-base text-slate-600 sm:text-lg">
                Analizamos tus consumos, identificamos oportunidades de ahorro y
                diseñamos planes de mejora con retorno claro y medible.
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
                src="https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Eficiencia energética"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Servicios principales */}
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
                  src="https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Estudios energéticos"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <ChartLineUp size={32} weight="duotone" />
                </div>
                <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
                  Estudios energéticos
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  Análisis completo de consumos, facturas y curvas de carga para
                  identificar oportunidades de ahorro y optimización.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Revisión de facturas y contratos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Análisis de curvas de carga
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Optimización de tarifas
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
                  src="https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Certificación energética"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <FileText size={32} weight="duotone" />
                </div>
                <h2 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
                  Certificación energética
                </h2>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">
                  Certificados energéticos para viviendas y edificios terciarios,
                  cumpliendo normativa vigente y facilitando decisiones informadas.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Certificados para viviendas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Certificados para edificios terciarios
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} weight="duotone" className="text-slate-500" />
                    Asesoría para compraventas
                  </li>
                </ul>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* Planes de mejora */}
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
              Planes de mejora energética
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Proyectos llave en mano para reducir consumos y mejorar el confort,
              con verificación de resultados y retorno de inversión claro.
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
                title: "Mejora de instalaciones",
                description:
                  "Proyectos de iluminación LED, climatización y ACS para reducir consumos.",
              },
              {
                title: "Rehabilitación energética",
                description:
                  "Mejora de envolvente térmica y sistemas de aislamiento para edificios existentes.",
              },
              {
                title: "Sistemas de gestión",
                description:
                  "Implementación de BMS y sistemas de monitorización para optimizar consumos.",
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
                ¿Quieres mejorar la eficiencia de tu edificio?
              </p>
              <p className="text-sm text-slate-700 sm:text-base">
                Cuéntanos tu caso y te preparamos un análisis inicial sin compromiso.
              </p>
            </div>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Solicitar estudio
              <ArrowRight size={16} weight="bold" />
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default EficienciaEnergetica;

