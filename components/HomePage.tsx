"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const heroBadgeVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 },
  },
};

const heroTitleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.4 },
  },
};

const heroTitleSpanVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 10, delay: 0.7 },
  },
};

const heroButtonsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 15, delay: 0.8 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: (index: number) => {
    const directions = [
      { x: -100, y: -50, rotate: -15 },
      { x: 100, y: -50, rotate: 15 },
      { x: -100, y: 50, rotate: -15 },
      { x: 100, y: 50, rotate: 15 },
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
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 1, duration: 0.8 },
  },
};

export const HomePage: React.FC = () => {

  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-slate-200 bg-slate-900 overflow-hidden min-h-[750px] sm:min-h-[850px] md:min-h-[950px] lg:min-h-[1050px] xl:min-h-[1150px]">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url('/assets/img4.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundPositionY: "top",
          }}
          aria-label="Promoción de 33 viviendas en Pau de Carabanchel - Obra nueva residencial"
        />
        <motion.div
          className="absolute inset-0 z-10 bg-black/40 sm:bg-black/45 md:bg-black/45 lg:bg-black/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="relative section-container flex items-center py-32 sm:py-44 md:py-60 lg:py-80 xl:py-[28rem] z-10 min-h-[750px] sm:min-h-[850px] md:min-h-[950px] lg:min-h-[1050px] xl:min-h-[1150px]">
          <div className="max-w-3xl space-y-4 sm:space-y-5 md:space-y-6 text-slate-50 w-full">
            <motion.h1
              className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight sm:leading-tight"
              variants={heroTitleVariants}
              initial="hidden"
              animate="visible"
            >
              Construimos viviendas{" "}
              <motion.span
                className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                variants={heroTitleSpanVariants}
                initial="hidden"
                animate="visible"
              >
                pensadas para vivir
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100 leading-relaxed sm:leading-relaxed"
              variants={heroTitleVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              Desde el primer boceto hasta la entrega de llaves.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
              variants={heroButtonsVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/contacto"
                  className="btn-primary w-full sm:w-auto px-6 py-3 sm:py-2.5 text-base sm:text-sm font-bold shadow-lg shadow-black/40 text-center inline-flex items-center justify-center"
                >
                  Hablar con Certifica
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/obra-nueva"
                  className="inline-flex items-center justify-center w-full sm:w-auto border-2 border-slate-200/80 bg-white/10 backdrop-blur-sm px-5 py-3 sm:py-2.5 text-base sm:text-sm font-medium text-slate-100 transition hover:border-slate-50 hover:bg-white/20 hover:text-white"
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
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <div className="section-container space-y-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] lg:items-center">
            <motion.div 
              className="space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <motion.p 
                className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary"
                variants={fadeInUp}
              >
                Qué construimos
              </motion.p>
              <motion.h2 
                className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
                variants={fadeInUp}
              >
                Obra nueva residencial: viviendas unifamiliares y edificios en
                bloque.
              </motion.h2>
            </motion.div>
            <motion.div 
              className="space-y-4 text-sm text-slate-600"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.05 }}
            >
              <p>
                Coordinamos todas las fases de la obra —desde el movimiento de
                tierras hasta los últimos remates— para que la vivienda quede
                como se proyectó y se entregue en plazo.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contacto"
                  className="btn-primary block w-full rounded-xl px-4 py-3 text-center text-xs sm:text-sm uppercase tracking-[0.08em] shadow-md shadow-black/30"
                >
                  <span className="hidden sm:inline">¿TIENES UNA VIVIENDA O PROMOCIÓN EN MENTE? HABLEMOS</span>
                  <span className="sm:hidden">HABLEMOS DE TU PROYECTO</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <motion.div custom={0} variants={cardVariants}>
              <ServiceTile
                icon={<Buildings size={40} weight="duotone" />}
                title="Vivienda unifamiliar"
                description="Casas aisladas, adosadas o pareadas, diseñadas para aprovechar la parcela y la luz natural."
                cta="Ver proyectos"
                href="/experiencia"
              />
            </motion.div>
            <motion.div custom={1} variants={cardVariants}>
              <ServiceTile
                icon={<IdentificationBadge size={40} weight="duotone" />}
                title="Vivienda colectiva"
                description="Edificios de viviendas en altura, con estructuras cuidadas y zonas comunes bien resueltas."
                cta="Ver proyectos"
                href="/experiencia"
              />
            </motion.div>
            <motion.div custom={2} variants={cardVariants}>
              <ServiceTile
                icon={<SunHorizon size={40} weight="duotone" />}
                title="Promociones completas"
                description="Conjuntos residenciales y urbanizaciones, coordinando todos los oficios y suministros."
                cta="Ver promociones"
                href="/experiencia"
              />
            </motion.div>
            <motion.div custom={3} variants={cardVariants}>
              <ServiceTile
                icon={<Factory size={40} weight="duotone" />}
                title="Proyectos singulares"
                description="Viviendas de autor y ampliaciones especiales que requieren un seguimiento de obra muy cercano."
                cta="Ver proyectos"
                href="/experiencia"
                highlight
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-6 space-y-8 rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-7 sm:px-7 sm:py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="text-center"
              variants={fadeInUp}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
                Cómo trabajamos una obra
              </p>
              <p className="mt-2 text-sm font-medium text-slate-800 sm:text-base">
                Tres fases claras para convertir un plano en una vivienda terminada.
              </p>
            </motion.div>

            <div className="relative">
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
          </motion.div>
        </div>
      </motion.section>

      {/* POR QUÉ CERTIFICA */}
      <motion.section
        className="border-b border-slate-200 bg-white py-14 sm:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] lg:items-center">
          <motion.div 
            className="relative flex items-center justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div 
              className="flex h-56 w-56 sm:h-72 sm:w-72 items-center justify-center rounded-full border border-slate-200"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div 
                className="flex h-32 w-32 sm:h-40 sm:w-40 flex-col items-center justify-center rounded-full bg-slate-900 px-4 sm:px-6 text-center text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-md shadow-black/20"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span>CRECIMIENTO</span>
                <span className="mt-1">SÓLIDO Y</span>
                <span className="mt-1">PLANIFICADO</span>
              </motion.div>
            </motion.div>
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
          </motion.div>

          <motion.div 
            className="space-y-5 text-sm text-slate-600"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="space-y-3"
              variants={fadeInUp}
            >
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
            </motion.div>
            <motion.div 
              className="space-y-2 text-sm"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
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
                <span className="font-semibold text-slate-900">El equipo</span>{" "}
                es nuestro activo principal. Contamos con profesionales de obra y
                técnicos comprometidos, acostumbrados a coordinar oficios y a
                comunicar de forma transparente.
              </p>
            </motion.div>
            <motion.div 
              className="pt-2"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contacto"
                  className="btn-primary inline-flex gap-2 px-6 py-2.5 shadow-md shadow-black/20"
                >
                  Hablar sobre tu proyecto
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
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
          <motion.div 
            className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <motion.div variants={fadeInUp}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
                Nuestros trabajos
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Nuestros proyectos
              </h2>
            </motion.div>
            <motion.p 
              className="max-w-xl text-sm text-slate-600"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Algunos ejemplos de viviendas unifamiliares y edificios en bloque
              que hemos ejecutado, combinando estructura, acabados y
              coordinación de oficios.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeInUp}>
              <ProjectPhotoCard
                imageUrl="/assets/img4.jpeg"
                title="Nueva promoción de 33 viviendas"
                location="Pau de Carabanchel"
                savings="Obra nueva llave en mano"
                description="Ejecución completa de estructura, cerramientos, cubiertas y acabados interiores, coordinando todos los oficios."
                tags={["Vivienda colectiva", "Obra nueva", "Promoción"]}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ProjectPhotoCard
                imageUrl="/assets/img5.jpeg"
                title="Vivienda Unifamiliar"
                location="Montepríncipe"
                savings="Proyecto y obra completa"
                description="Vivienda unifamiliar ejecutada desde cero, con estructura, instalaciones y acabados de calidad, coordinando todos los oficios."
                tags={["Unifamiliar", "Obra nueva", "Diseño personalizado"]}
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ProjectPhotoCard
                imageUrl="/assets/img6.jpeg"
                title="Bloque de viviendas más local"
                location="Calle Joaquín Turina dos"
                savings="Estructura y acabados completos"
                description="Edificio residencial con plantas tipo, garaje y zonas comunes, ejecutado con control de plazos y calidad de materiales."
                tags={["Vivienda colectiva", "Bloque residencial", "Zonas comunes"]}
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
        <div className="section-container flex flex-col gap-6 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white px-4 py-6 sm:px-6 sm:py-7 shadow-md shadow-black/10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
              Constructora especializada en obra nueva
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Construimos tu vivienda desde cero hasta la entrega de llaves.
            </h2>
            <p className="max-w-xl text-sm text-slate-600">
              Viviendas unifamiliares y edificios en bloque. Proyecto, dirección de obra y coordinación de oficios para entregar viviendas de calidad en plazo.
            </p>
          </div>
          <motion.div 
            className="flex flex-col gap-3 text-sm sm:items-start lg:items-end"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contacto" className="btn-primary w-full sm:w-auto px-6 sm:px-7 py-2.5 text-center shadow-md shadow-black/30">
                Hablar con la constructora
              </Link>
            </motion.div>
            <p className="text-[11px] text-slate-500 sm:text-left lg:text-right">
              También puedes llamarnos al{" "}
              <a
                href="tel:+34614069154"
                className="font-semibold text-brand-secondary transition hover:text-brand-secondary/80"
              >
                +34 614 06 91 54
              </a>{" "}
              y te orientamos por teléfono.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

type ServiceTileProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  href?: string;
  highlight?: boolean;
};

const ServiceTile: React.FC<ServiceTileProps> = ({
  icon,
  title,
  description,
  cta,
  href,
  highlight,
}) => (
  <article className="group flex h-full min-h-[380px] flex-col justify-between rounded-2xl border border-slate-100 px-7 py-10 text-sm shadow-md shadow-black/10 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-xl hover:bg-slate-900 hover:border-slate-900 bg-white text-slate-900">
    <div className="space-y-4">
      <motion.div
        className="inline-flex h-16 w-16 items-center justify-center rounded-xl border-2 text-xl font-semibold text-slate-900 border-slate-300 bg-white/70 backdrop-blur-sm"
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
    {href ? (
      <Link
        href={href}
        className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 transition-colors duration-300 group-hover:text-white"
      >
        {cta}
      </Link>
    ) : (
      <button
        type="button"
        className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 transition-colors duration-300 group-hover:text-white"
      >
        {cta}
      </button>
    )}
  </article>
);

type ProcessStepProps = {
  icon: React.ReactNode;
  step: string;
  title: string;
  text: string;
};

const ProcessStep: React.FC<ProcessStepProps> = ({ icon, step, title, text }) => (
  <div className="flex flex-col items-center gap-4 text-center">
    <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-900/80 bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:rotate-1 hover:shadow-lg">
      <div className="text-slate-900">{icon}</div>
      <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white shadow-md ring-2 ring-slate-200">
        {step}
      </div>
    </div>
    <div className="space-y-1 max-w-xs">
      <p className="text-sm font-semibold text-slate-900 sm:text-base">{title}</p>
      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{text}</p>
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
        alt={`${title} - ${location} - Proyecto de obra nueva residencial por Certifica Ingeniería`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
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
      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{description}</p>
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



