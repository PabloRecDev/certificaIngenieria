import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "../components/Layout";
import {
  Buildings,
  IdentificationBadge,
  Factory,
  SunHorizon,
  MagnifyingGlass,
  ListChecks,
  Wrench,
  ChartLineUp,
} from "phosphor-react";

// Variantes de animación para scroll
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Animaciones para el hero
const heroBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

const heroTitleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.4,
    },
  },
};

const heroTitleSpanVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10,
      delay: 0.7,
    },
  },
};

const heroDescriptionVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.6,
    },
  },
};

const heroButtonsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      delay: 0.8,
    },
  },
};

const heroFeaturesVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 1,
    },
  },
};

const heroFeatureItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animación original para las tarjetas de servicios
const cardVariants = {
  hidden: (index: number) => {
    const directions = [
      { x: -100, y: -50, rotate: -15 }, // Izquierda arriba
      { x: 100, y: -50, rotate: 15 },  // Derecha arriba
      { x: -100, y: 50, rotate: -15 }, // Izquierda abajo
      { x: 100, y: 50, rotate: 15 },  // Derecha abajo
    ];
    const direction = directions[index % 4];
    return {
      opacity: 0,
      x: direction.x,
      y: direction.y,
      rotate: direction.rotate,
      scale: 0.7,
    };
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
      duration: 0.8,
    },
  },
};

const heroImages = [
  "https://images.pexels.com/photos/8853507/pexels-photo-8853507.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/189569/pexels-photo-189569.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/1294945/pexels-photo-1294945.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative border-b border-slate-200 bg-slate-900 overflow-hidden">
        {/* Imágenes del fondo con transición */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              backgroundImage: `url('${heroImages[currentImageIndex]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </AnimatePresence>
        {/* Capa oscura neutra sobre la imagen */}
        <motion.div
          className="absolute inset-0 z-10 bg-black/45 md:bg-black/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Indicadores de imagen */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "w-8 bg-brand-secondary"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
        <div className="relative section-container flex items-center py-40 lg:py-48 z-10">
          <div className="max-w-3xl space-y-6 text-slate-50">
            <motion.h1
              className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
              variants={heroTitleVariants}
              initial="hidden"
              animate="visible"
            >
              Viviendas nuevas{" "}
              <motion.span
                className="text-brand-secondary"
                variants={heroTitleSpanVariants}
                initial="hidden"
                animate="visible"
              >
                bien pensadas
              </motion.span>{" "}
              desde el primer plano hasta la entrega de llaves.
            </motion.h1>
            <motion.div
              className="flex flex-wrap items-center gap-4"
              variants={heroButtonsVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contacto"
                  className="btn-primary px-6 py-2.5 shadow-lg shadow-black/40"
                >
                  Hablar con Certifica
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/servicios"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200/80 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-100/90 transition hover:border-slate-50 hover:bg-white/10 hover:text-white"
                >
                  Ver servicios
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUÉ CONSTRUIMOS */}
      <motion.section
        id="servicios"
        className="border-b border-slate-200 bg-white py-14 sm:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="section-container space-y-10">
          {/* Cabecera tipo referencia */}
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] md:items-center">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
                Qué construimos
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Obra nueva residencial: viviendas unifamiliares y edificios en
                bloque.
              </h2>
            </div>
            <div className="space-y-4 text-sm text-slate-600">
              <p>
                Coordinamos todas las fases de la obra —desde el movimiento de
                tierras hasta los últimos remates— para que la vivienda quede
                como se proyectó y se entregue en plazo.
              </p>
              <Link
                to="/contacto"
                className="btn-primary block w-full rounded-xl px-4 py-3 text-center text-xs uppercase tracking-[0.08em] shadow-md shadow-black/30"
              >
                ¿TIENES UNA VIVIENDA O PROMOCIÓN EN MENTE? HABLEMOS
              </Link>
            </div>
          </div>

          {/* Tarjetas de servicios, con la última destacada en hover */}
          <motion.div
            className="grid gap-5 md:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              custom={0}
              variants={cardVariants}
            >
              <ServiceTile
                icon={<Buildings size={40} weight="duotone" />}
                title="Vivienda unifamiliar"
                description="Casas aisladas, adosadas o pareadas, diseñadas para aprovechar la parcela y la luz natural."
                cta="Ver proyectos"
              />
            </motion.div>
            <motion.div
              custom={1}
              variants={cardVariants}
            >
              <ServiceTile
                icon={<IdentificationBadge size={40} weight="duotone" />}
                title="Vivienda colectiva"
                description="Edificios de viviendas en altura, con estructuras cuidadas y zonas comunes bien resueltas."
                cta="Ver proyectos"
              />
            </motion.div>
            <motion.div
              custom={2}
              variants={cardVariants}
            >
              <ServiceTile
                icon={<SunHorizon size={40} weight="duotone" />}
                title="Promociones completas"
                description="Conjuntos residenciales y urbanizaciones, coordinando todos los oficios y suministros."
                cta="Ver promociones"
              />
            </motion.div>
            <motion.div
              custom={3}
              variants={cardVariants}
            >
              <ServiceTile
                icon={<Factory size={40} weight="duotone" />}
                title="Proyectos singulares"
                description="Viviendas de autor y ampliaciones especiales que requieren un seguimiento de obra muy cercano."
                cta="Ver proyectos"
                highlight
              />
            </motion.div>
          </motion.div>

          {/* Pasos del proceso */}
          <div className="mt-6 space-y-8 rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-7 sm:px-7 sm:py-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
                Cómo trabajamos una obra
              </p>
              <p className="mt-2 text-sm font-medium text-slate-800 sm:text-base">
                Tres fases claras para convertir un plano en una vivienda terminada.
              </p>
            </div>

            <div className="relative">
              {/* Línea discontinua de fondo (solo en desktop) */}
              <div className="pointer-events-none absolute inset-x-10 top-16 hidden h-px border-t-2 border-dashed border-slate-300/70 md:block" />

              <motion.div
                className="relative grid gap-10 md:grid-cols-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div variants={fadeInUp}>
                  <ProcessStep
                    icon={<MagnifyingGlass size={36} weight="duotone" />}
                    step="1"
                    title="Anteproyecto y presupuesto"
                    text="Definimos contigo la vivienda, estudiamos la parcela y preparamos un presupuesto claro y desglosado."
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ProcessStep
                    icon={<ListChecks size={36} weight="duotone" />}
                    step="2"
                    title="Proyecto y licencias"
                    text="Coordinamos el proyecto técnico y la tramitación con el ayuntamiento para arrancar la obra con todo en regla."
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ProcessStep
                    icon={<Wrench size={36} weight="duotone" />}
                    step="3"
                    title="Obra y entrega de llaves"
                    text="Ejecutamos la obra, coordinamos oficios y controlamos plazos y acabados hasta la entrega y puesta en marcha."
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* POR QUÉ CERTIFICA INGENIERÍA */}
      <motion.section
        className="border-b border-slate-200 bg-white py-14 sm:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="section-container grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] md:items-center">
          {/* Círculo con pilares */}
          <div className="relative flex items-center justify-center">
            {/* Círculo exterior */}
            <div className="flex h-72 w-72 items-center justify-center rounded-full border border-slate-200">
              <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-slate-900 px-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-md shadow-black/20">
                <span>CRECIMIENTO</span>
                <span className="mt-1">SÓLIDO Y</span>
                <span className="mt-1">PLANIFICADO</span>
              </div>
            </div>

            {/* Iconos alrededor */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-2 -translate-x-1/2 text-slate-700">
                <SunHorizon size={26} weight="duotone" />
              </div>
              <div className="absolute right-6 top-1/3 text-slate-700">
                <Factory size={26} weight="duotone" />
              </div>
              <div className="absolute right-1/3 bottom-6 text-slate-700">
                <ChartLineUp size={26} weight="duotone" />
              </div>
              <div className="absolute left-1/3 bottom-6 text-slate-700">
                <IdentificationBadge size={26} weight="duotone" />
              </div>
              <div className="absolute left-6 top-1/3 text-slate-700">
                <Buildings size={26} weight="duotone" />
              </div>
            </div>
          </div>

          {/* Texto + CTA */}
          <div className="space-y-5 text-sm text-slate-600">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
                Por qué Certifica Ingeniería
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Más que una constructora: un equipo que planifica, ejecuta y
                acompaña.
              </h2>
              <p>
                Nos avalan años de experiencia ejecutando vivienda nueva
                residencial. Nuestro objetivo principal es que el proceso de
                obra sea claro y que el resultado final se corresponda con lo
                que se proyectó y se acordó contigo.
              </p>
            </div>

            <div className="space-y-2 text-sm">
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

            <div className="pt-2">
              <Link
                to="/contacto"
                className="btn-primary inline-flex gap-2 px-6 py-2.5 shadow-md shadow-black/20"
              >
                Hablar sobre tu proyecto
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* NUESTROS TRABAJOS */}
      <motion.section
        id="proyectos"
        className="border-b border-slate-200 bg-white py-14 sm:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="section-container space-y-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
                Nuestros trabajos
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Viviendas y edificios residenciales construidos por nuestro equipo.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-600">
              Algunos ejemplos de viviendas unifamiliares y edificios en bloque
              que hemos ejecutado, combinando estructura, acabados y
              coordinación de oficios.
            </p>
          </div>

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeInUp}>
              <ProjectPhotoCard
                imageUrl="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200"
                title="Conjunto de 10 viviendas unifamiliares"
                location="Urbanización residencial"
                savings="Obra nueva llave en mano"
                description="Ejecución completa de estructura, cerramientos, cubiertas y acabados interiores, coordinando todos los oficios."
                tags={["Unifamiliar", "Obra nueva", "Urbanización"]}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ProjectPhotoCard
                imageUrl="https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200"
                title="Edificio de 24 viviendas en bloque"
                location="Zona urbana consolidada"
                savings="Estructura y acabados completos"
                description="Edificio residencial con plantas tipo, garaje y zonas comunes, ejecutado con control de plazos y calidad de materiales."
                tags={["Vivienda colectiva", "Bloque residencial", "Zonas comunes"]}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ProjectPhotoCard
                imageUrl="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200"
                title="Vivienda unifamiliar aislada"
                location="Parcela independiente"
                savings="Proyecto y obra completa"
                description="Vivienda de diseño contemporáneo con grandes ventanales, ejecutada desde movimiento de tierras hasta paisajismo exterior."
                tags={["Unifamiliar aislada", "Diseño contemporáneo", "Obra completa"]}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section
        className="border-b border-slate-200 bg-slate-50 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="section-container flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-md shadow-black/10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
              ¿Hablamos de energía?
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Te enviamos un prediagnóstico energético en 48 horas laborables.
            </h2>
            <p className="max-w-xl text-sm text-slate-600">
              Cuéntanos, en un par de párrafos, cómo es tu edificio o
              instalación y adjunta, si quieres, la última factura de luz o
              gas. Te responderemos con una estimación orientativa de ahorro y
              propuestas de mejora.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:items-end">
            <Link to="/contacto" className="btn-primary px-7 py-2.5 shadow-md shadow-black/30">
              Solicitar prediagnóstico
            </Link>
            <p className="text-[11px] text-slate-500 sm:text-right">
              También puedes llamarnos al{" "}
              <a
                href="tel:+34900123456"
                className="font-semibold text-brand-secondary"
              >
                +34 614 06 91 54
              </a>{" "}
              y te orientamos por teléfono.
            </p>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

type ServiceTileProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  highlight?: boolean;
};

const ServiceTile: React.FC<ServiceTileProps> = ({
  icon,
  title,
  description,
  cta,
  highlight,
}) => (
  <article
    className={`group flex h-full min-h-[380px] flex-col justify-between rounded-2xl border border-slate-100 px-7 py-10 text-sm shadow-md shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:bg-slate-900 hover:border-slate-900 bg-white text-slate-900`}
  >

    <div className="space-y-4">
      <motion.div
        className={`inline-flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-semibold text-slate-900 border-slate-300 bg-white/70 backdrop-blur-sm`}
        whileHover={{
          borderColor: "#0f172a",
          backgroundColor: "rgba(15,23,42,0.12)",
          color: "#f9fafb",
          rotate: [0, -5, 5, -5, 0],
          scale: 1.15,
          y: -4,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.span
          className="scale-110"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {icon}
        </motion.span>
      </motion.div>
      <h3 className="text-base font-semibold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-amber-50">
        {title}
      </h3>
      <p className="text-xs leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-100">
        {description}
      </p>
    </div>
    <button
      type="button"
      className={`mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 transition-colors duration-300 group-hover:text-white`}
    >
      {cta}
    </button>
  </article>
);

type ProcessStepProps = {
  icon: React.ReactNode;
  step: string;
  title: string;
  text: string;
};

const ProcessStep: React.FC<ProcessStepProps> = ({
  icon,
  step,
  title,
  text,
}) => (
  <div className="flex flex-col items-center gap-4 text-center">
    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-900/80 bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:rotate-1 hover:shadow-lg">
      <div className="text-slate-900">{icon}</div>
      <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-md ring-2 ring-slate-200">
        {step}
      </div>
    </div>
    <div className="space-y-1 max-w-xs">
      <p className="text-sm font-semibold text-slate-900 sm:text-base">
        {title}
      </p>
      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
        {text}
      </p>
    </div>
  </div>
);

type ProjectPhotoCardProps = {
  imageUrl: string;
  title: string;
  location: string;
  savings: string;
  description: string;
  tags: string[];
};

const ProjectPhotoCard: React.FC<ProjectPhotoCardProps> = ({
  imageUrl,
  title,
  location,
  savings,
  description,
  tags,
}) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
    <div className="relative h-40 overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-50">
        <div className="space-y-0.5">
          <p className="font-semibold">{title}</p>
          <p className="text-[11px] text-slate-200">{location}</p>
        </div>
        <span className="rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
          {savings}
        </span>
      </div>
    </div>
    <div className="flex flex-1 flex-col justify-between p-4">
      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
        {description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </article>
);

export default Home;

