import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import {
  Buildings,
  IdentificationBadge,
  Factory,
  SunHorizon,
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
    transition: { staggerChildren: 0.1 },
  },
};

const servicios = [
  {
    icon: <Buildings size={48} weight="duotone" />,
    title: "Eficiencia energética",
    description:
      "Analizamos tus consumos con lupa para identificar dónde se está escapando el dinero y proponer mejoras con retorno claro.",
    features: [
      "Revisión completa de facturas y contratos",
      "Análisis de curvas de carga y horarios",
      "Optimización de tarifas y potencias",
      "Simulación de escenarios de ahorro",
      "Planes directores de energía",
    ],
    color: "emerald",
  },
  {
    icon: <IdentificationBadge size={48} weight="duotone" />,
    title: "Certificación y auditorías",
    description:
      "Certificados energéticos y auditorías que cumplen normativa y te ayudan a tomar decisiones con datos claros.",
    features: [
      "Certificados para viviendas y edificios terciarios",
      "Auditorías según RD 56/2016",
      "Justificación de HE0, HE1 y HE4",
      "Asesoría para compraventas y alquileres",
      "Informes ejecutivos para dirección",
    ],
    color: "emerald",
  },
  {
    icon: <SunHorizon size={48} weight="duotone" />,
    title: "Energías renovables",
    description:
      "Estudios de autoconsumo y soluciones renovables adaptadas a tu perfil de uso real, sin inflar cifras.",
    features: [
      "Estudios de autoconsumo individual y compartido",
      "Diseño de instalaciones fotovoltaicas",
      "Análisis de producción y sombreado",
      "Integración con consumos existentes",
      "Memorias técnicas y tramitación",
    ],
    color: "emerald",
  },
  {
    icon: <Factory size={48} weight="duotone" />,
    title: "Proyectos de mejora energética",
    description:
      "Del «esto habría que mejorarlo» al «ya está funcionando y se nota en la factura». Proyectos llave en mano.",
    features: [
      "Proyectos de iluminación LED",
      "Mejora de climatización y ACS",
      "Rehabilitación de envolvente térmica",
      "Sistemas de gestión energética (BMS)",
      "Dirección facultativa y verificación de ahorros",
    ],
    color: "emerald",
  },
];

const Servicios: React.FC = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 py-16 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
              Nuestros servicios
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Ingeniería energética{" "}
              <span className="text-brand-secondary">360º</span>
            </h1>
            <p className="text-lg text-slate-600 sm:text-xl">
              Desde el análisis inicial hasta la verificación de resultados,
              acompañamos cada proyecto con rigor técnico y comunicación clara.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Servicios detallados */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-16"
          >
            {servicios.map((servicio, index) => (
              <motion.div
                key={servicio.title}
                variants={fadeInUp}
                className="grid gap-8 md:grid-cols-[200px,1fr] lg:grid-cols-[240px,1fr]"
              >
                <div className="flex flex-col items-start">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-secondary/10 text-brand-secondary">
                    {servicio.icon}
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                      {servicio.title}
                    </h2>
                    <p className="mt-2 text-base leading-relaxed text-slate-600 sm:text-lg">
                      {servicio.description}
                    </p>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {servicio.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle
                          size={20}
                          weight="fill"
                          className="mt-0.5 flex-shrink-0 text-brand-secondary"
                        />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 py-12">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col gap-6 rounded-3xl border border-emerald-100 bg-white/80 px-6 py-7 shadow-md shadow-emerald-900/10 sm:flex-row sm:items-center sm:justify-between sm:px-8"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                ¿Quieres saber más sobre nuestros servicios?
              </h2>
              <p className="max-w-xl text-sm text-slate-600">
                Cuéntanos tu caso y te explicamos cómo podemos ayudarte de forma
                concreta y sin tecnicismos.
              </p>
            </div>
            <Link to="/contacto">
              <motion.span
                className="btn-primary gap-2 px-7 py-2.5 shadow-md shadow-black/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: "inline-flex" }}
              >
                Hablar con nosotros
                <ArrowRight size={18} weight="bold" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Servicios;

