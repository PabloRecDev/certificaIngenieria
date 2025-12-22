import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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

const sections = [
  { id: "nosotros", label: "Nosotros", path: "/nosotros" },
  {
    id: "por-que",
    label: "Por qué Certifica",
    path: "/por-que-certifica",
  },
  { id: "experiencia", label: "Experiencia", path: "/experiencia" },
  { id: "blog", label: "Blog", path: "/blog" },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const isHome = location.pathname === "/";
  const isServicesActive = [
    "/rehabilitacion",
    "/servicios",
    "/experiencia",
    "/sate",
  ].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Subnavbar corporativa */}
      <motion.div
        className="bg-[#151515] text-white text-xs sm:text-[13px]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="section-container flex flex-col gap-1 py-1.5 sm:flex-row sm:items-center sm:justify-between">
          <motion.p
            className="font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Constructora especializada en obra nueva residencial: viviendas unifamiliares y en bloque.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <a
              href="tel:+34614069154"
              className="font-bold transition hover:scale-105 hover:text-emerald-100"
            >
              +34 614 06 91 54
            </a>
            <span className="hidden h-3 w-px bg-emerald-100/60 sm:inline-block" />
            <Link to="/contacto">
              <motion.span
                className="inline-flex items-center rounded-full border border-emerald-100/70 px-3 py-0.5 text-[11px] font-bold transition hover:bg-white/10 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: "inline-block" }}
              >
                Solicitar estudio energético
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Navbar principal */}
      <motion.header
        className="sticky top-0 z-40 border-b backdrop-blur-xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.98)"
            : "rgba(255, 255, 255, 0.95)",
          borderColor: scrolled
            ? "rgba(226, 232, 240, 0.8)"
            : "rgba(226, 232, 240, 1)",
          boxShadow: scrolled
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <div className="section-container flex items-center justify-between py-5 overflow-visible">
          <Link to="/">
            <motion.div
              className="relative flex h-12 items-center overflow-visible"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260 }}
            >
              <img
                src="/assets/logo.png"
                alt="Certifica Ingeniería"
                className="h-12 w-auto"
              />
            </motion.div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 md:flex">
            {/* Dropdown Servicios, más a la izquierda */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                type="button"
                className={`relative inline-flex items-center gap-1 transition-colors ${
                  isServicesActive ? "text-brand-secondary" : "hover:text-brand-secondary"
                }`}
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + sections.length * 0.1, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                  className="relative flex items-center gap-1"
                >
                  <span>Servicios</span>
                  <span className="text-[9px] text-slate-400">▼</span>
                  {isServicesActive && (
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-brand-secondary"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {!isServicesActive && (
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-brand-secondary"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.span>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-8 z-50 w-[440px] rounded-xl border border-slate-200 bg-white text-[13px] text-slate-900 shadow-xl"
                  >
                    <div className="px-4 pb-2 pt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Servicios
                      </p>
                    </div>
                    <div className="h-px w-full bg-slate-200" />
                    <div className="grid gap-1.5 p-2 sm:grid-cols-2">
                      <Link
                        to="/obra-nueva"
                        className="flex items-start gap-2 rounded-lg px-2 py-2 text-left text-[13px] hover:bg-slate-50"
                      >
                        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                          <ChartLineUp size={15} weight="duotone" />
                        </div>
                        <div>
                          <p className="font-medium">Obra nueva residencial</p>
                          <p className="text-[11px] text-slate-500">
                            Viviendas Unifamiliares y edificios colectivos.
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/eficiencia-energetica"
                        className="flex items-start gap-2 rounded-lg px-2 py-2 text-left text-[13px] hover:bg-slate-50"
                      >
                        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                          <ListChecks size={15} weight="duotone" />
                        </div>
                        <div>
                          <p className="font-medium">Eficiencia energética</p>
                          <p className="text-[11px] text-slate-500">
                            Estudios, certificación y planes de mejora energética.
                          </p>
                        </div>
                      </Link>
                      <Link
                        to="/rehabilitacion-sate"
                        className="flex items-start gap-2 rounded-lg px-2 py-2 text-left text-[13px] hover:bg-slate-50 sm:col-span-2"
                      >
                        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                          <Buildings size={15} weight="duotone" />
                        </div>
                        <div>
                          <p className="font-medium">Rehabilitación y SATE</p>
                          <p className="text-[11px] text-slate-500">
                            Mejora de envolvente y sistemas de aislamiento térmico por el exterior.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Resto de secciones */}
            {sections.map((s, index) => {
              const isActive = location.pathname === s.path;
              return (
                <Link key={s.id} to={s.path}>
                  <motion.span
                    className="relative transition-colors hover:text-brand-secondary"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    {s.label}
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-secondary"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-secondary"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.span>
                </Link>
              );
            })}
          </nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Link
              to="/contacto"
              className="hidden btn-primary px-4 py-1.5 text-sm font-bold shadow-md shadow-black/40 md:inline-flex"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: "inline-block" }}
              >
                Hablemos
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.header>

      <main>{children}</main>

      <footer className="border-t border-black bg-black text-slate-50">
        <div className="section-container grid gap-8 py-10 md:grid-cols-[1.2fr,1fr]">
          <div className="space-y-4">
            <img
              src="/assets/logo.png"
              alt="Certifica Ingeniería"
              className="h-10 w-auto"
            />
            <p className="max-w-md text-xs leading-relaxed text-slate-50/90">
              Ingeniería especializada en analizar, diseñar y acompañar proyectos
              de mejora energética en edificios e industria: menos consumo, más
              confort y activos más sostenibles.
            </p>
            <p className="text-[11px] text-slate-50/70">
              Web de ejemplo. Sustituya estos datos por los de su empresa antes
              de publicar.
            </p>
          </div>

          <div className="grid gap-6 text-[11px] sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-50/80">
                Navegación
              </p>
              <div className="flex flex-col gap-1">
                <Link to="/servicios" className="hover:text-slate-200">
                  Servicios
                </Link>
                <Link to="/contacto" className="hover:text-slate-200">
                  Contacto
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-50/80">
                Contacto
              </p>
              <div className="space-y-1">
                <p className="text-[11px] text-slate-50/70">Correo</p>
                <a
                  href="mailto:administración@certificaingenieria.com"
                  className="block text-[11px] hover:text-slate-200"
                >
                  administración@certificaingenieria.com
                </a>
                <p className="mt-2 text-[11px] text-slate-50/70">Teléfono</p>
                <a
                  href="tel:+34614069154"
                  className="block text-[11px] hover:text-slate-200"
                >
                  +34 614 06 91 54
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-black/20">
          <div className="section-container flex flex-col gap-2 py-4 text-[11px] text-slate-100/80 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Certifica Ingeniería. Todos los
              derechos reservados.
            </p>
            <span className="text-slate-50/70">
              Diseño creado con React + TypeScript + Tailwind CSS.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

