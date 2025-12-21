import React from "react";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import {
  Buildings,
  IdentificationBadge,
  Factory,
  ChartLineUp,
  SunHorizon,
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

const PorQue: React.FC = () => {
  return (
    <Layout>
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container space-y-12">
          {/* Cabecera + gráfico circular */}
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] md:items-center">
            {/* Círculo con pilares */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="relative flex items-center justify-center"
            >
              <div className="flex h-80 w-80 items-center justify-center rounded-full border border-slate-200">
                <div className="flex h-48 w-48 flex-col items-center justify-center rounded-full bg-slate-900 px-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-md shadow-black/20">
                  <span>CRECIMIENTO</span>
                  <span className="mt-1">SÓLIDO Y</span>
                  <span className="mt-1">PLANIFICADO</span>
                </div>
              </div>

              {/* Iconos alrededor */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-3 -translate-x-1/2 text-slate-700">
                  <SunHorizon size={30} weight="duotone" />
                </div>
                <div className="absolute right-8 top-1/3 text-slate-700">
                  <Factory size={30} weight="duotone" />
                </div>
                <div className="absolute right-1/3 bottom-6 text-slate-700">
                  <ChartLineUp size={30} weight="duotone" />
                </div>
                <div className="absolute left-1/3 bottom-6 text-slate-700">
                  <IdentificationBadge size={30} weight="duotone" />
                </div>
                <div className="absolute left-8 top-1/3 text-slate-700">
                  <Buildings size={30} weight="duotone" />
                </div>
              </div>
            </motion.div>

            {/* Texto + razones */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-5 text-sm text-slate-600"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Por qué Certifica Ingeniería
                </p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Construimos viviendas nuevas con una forma de trabajar muy clara.
                </h1>
                <p className="text-sm leading-relaxed sm:text-base">
                  Nuestro foco está en conseguir viviendas cómodas, luminosas y
                  duraderas. Coordinamos a todos los oficios y controlamos cada
                  fase de la obra para que el resultado final sea coherente con
                  el proyecto y con tus expectativas.
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-slate-900">La calidad</span>{" "}
                  en la ejecución y{" "}
                  <span className="font-semibold text-slate-900">
                    el cuidado por el detalle
                  </span>{" "}
                  son dos de nuestros pilares, junto con una planificación
                  realista de plazos y un seguimiento constante de obra.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">
                    El equipo
                  </span>{" "}
                  es nuestro activo principal. Contamos con profesionales de obra y
                  técnicos comprometidos, acostumbrados a coordinar oficios y a
                  comunicar de forma transparente.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Tres razones en tarjetas con imágenes */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 border-t border-slate-200 pt-8 md:grid-cols-3"
          >
            <motion.article
              variants={fadeInUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Experiencia"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Experiencia en obra nueva
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Años ejecutando promociones de vivienda unifamiliar y colectiva,
                  con estructuras cuidadas y detalles constructivos resueltos.
                </p>
              </div>
            </motion.article>
            <motion.article
              variants={fadeInUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Acompañamiento"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Acompañamiento completo
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Te ayudamos con proyecto, licencias, obra y entrega de llaves,
                  con un único interlocutor técnico durante todo el proceso.
                </p>
              </div>
            </motion.article>
            <motion.article
              variants={fadeInUp}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Calidad"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Cuidado por los acabados
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Seleccionamos soluciones y materiales pensando en el uso diario:
                  cocinas, baños, carpinterías y detalles que se notan al vivir la
                  vivienda.
                </p>
              </div>
            </motion.article>
          </motion.div>

          {/* Cómo trabajamos (más visual) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="grid gap-8 border-t border-slate-200 pt-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center"
          >
            <div className="space-y-4 text-sm text-slate-600">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Cómo trabajamos en cada proyecto
              </h2>
              <p>
                Desde el primer boceto hasta la entrega de llaves, mantenemos una forma
                de trabajar muy clara, con comunicación constante y decisiones técnicas
                explicadas en lenguaje sencillo.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={18}
                    weight="duotone"
                    className="mt-0.5 text-slate-500"
                  />
                  <span>
                    <span className="font-semibold text-slate-900">
                      Fase de estudio y propuestas
                    </span>
                    : analizamos tu caso y te planteamos varias opciones realistas.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={18}
                    weight="duotone"
                    className="mt-0.5 text-slate-500"
                  />
                  <span>
                    <span className="font-semibold text-slate-900">
                      Proyecto y planificación
                    </span>
                    : definimos plazos, hitos y presupuesto con márgenes claros.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle
                    size={18}
                    weight="duotone"
                    className="mt-0.5 text-slate-500"
                  />
                  <span>
                    <span className="font-semibold text-slate-900">
                      Dirección y seguimiento de obra
                    </span>
                    : visitas de obra, coordinación de oficios y control de calidad.
                  </span>
                </li>
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative h-32 overflow-hidden rounded-xl border border-slate-200">
                <img
                  src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Reunión inicial de proyecto"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-6 text-[11px] text-slate-50">
                  Reuniones iniciales y definición del encargo.
                </div>
              </div>
              <div className="relative h-32 overflow-hidden rounded-xl border border-slate-200">
                <img
                  src="https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Supervisión de obra"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-6 text-[11px] text-slate-50">
                  Supervisión de obra y control de detalles constructivos.
                </div>
              </div>
            </div>
          </motion.div>

          {/* Galería de proyectos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="space-y-6 border-t border-slate-200 pt-8"
          >
            <div>
              <h2 className="mb-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                Proyectos entregados
              </h2>
              <p className="text-sm text-slate-600">
                Ejemplos de viviendas que hemos construido, desde el proyecto inicial hasta la entrega final.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200",
                  title: "Vivienda unifamiliar",
                  description: "Proyecto completo desde cero",
                },
                {
                  image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
                  title: "Edificio residencial",
                  description: "Promoción de 12 viviendas",
                },
                {
                  image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200",
                  title: "Vivienda pareada",
                  description: "Diseño personalizado y ejecución",
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl border border-slate-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA final */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center"
          >
            <p className="text-sm text-slate-600">
              ¿Tienes en mente una vivienda unifamiliar o una promoción
              residencial y quieres saber cómo podríamos ayudarte?
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Ver opciones y hablar con nosotros
              <ArrowRight size={16} weight="bold" />
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PorQue;


