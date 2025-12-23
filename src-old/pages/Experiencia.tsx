import React from "react";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import { ArrowRight, CheckCircle } from "phosphor-react";

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

type ProjectProps = {
  imageUrl: string;
  title: string;
  location: string;
  type: string;
};

const projects: ProjectProps[] = [
  {
    imageUrl:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Conjunto de 12 viviendas unifamiliares",
    location: "Urbanización residencial",
    type: "Obra nueva · Vivienda unifamiliar",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Edificio de 32 viviendas en bloque",
    location: "Zona urbana consolidada",
    type: "Obra nueva · Vivienda colectiva",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Vivienda unifamiliar aislada",
    location: "Parcela independiente",
    type: "Obra nueva · Unifamiliar de diseño",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Promoción de 8 viviendas pareadas",
    location: "Zona residencial",
    type: "Obra nueva · Vivienda pareada",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Edificio de 24 viviendas",
    location: "Centro urbano",
    type: "Obra nueva · Vivienda colectiva",
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Vivienda unifamiliar con diseño moderno",
    location: "Parcela privada",
    type: "Obra nueva · Unifamiliar",
  },
];

const Experiencia: React.FC = () => {
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
                Experiencia
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Viviendas que ya están construidas y entregadas.
              </h1>
              <p className="text-base text-slate-600 sm:text-lg">
                Algunos ejemplos de promociones y viviendas unifamiliares que hemos
                ejecutado, combinando estructura, acabados y coordinación de
                oficios para entregar en plazo.
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
                alt="Experiencia Certifica"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-16">
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              { number: "50+", label: "Viviendas entregadas" },
              { number: "15+", label: "Años de experiencia" },
              { number: "100%", label: "Proyectos en plazo" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-4xl font-semibold text-slate-900 sm:text-5xl">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container space-y-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="max-w-2xl"
          >
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Proyectos destacados
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Ejemplos representativos de nuestro trabajo en obra nueva residencial.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                variants={fadeInUp}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {project.type}
                    </p>
                    <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                      {project.title}
                    </h2>
                    <p className="text-xs text-slate-500">{project.location}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Valores destacados */}
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
              Nuestro compromiso en cada proyecto
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              Principios que aplicamos en todos nuestros proyectos para garantizar la calidad y el cumplimiento de plazos.
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
                title: "Calidad en ejecución",
                description:
                  "Estructuras cuidadas, acabados de calidad y detalles constructivos bien resueltos en cada fase del proyecto.",
              },
              {
                title: "Cumplimiento de plazos",
                description:
                  "Planificación realista y seguimiento constante para entregar cada proyecto en el tiempo acordado.",
              },
              {
                title: "Coordinación integral",
                description:
                  "Gestión eficiente de todos los oficios y agentes implicados para un resultado coherente y profesional.",
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
                ¿Tienes un proyecto en mente?
              </p>
              <p className="text-sm text-slate-700 sm:text-base">
                Cuéntanos tu idea y te mostramos cómo podemos ayudarte con nuestra experiencia.
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

export default Experiencia;


