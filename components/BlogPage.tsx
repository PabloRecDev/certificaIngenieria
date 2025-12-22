"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


export const BlogPage: React.FC = () => {
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
              Blog
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Artículos sobre eficiencia energética y renovables
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Guías prácticas, normativas actualizadas y casos reales para ayudarte
              a entender y mejorar la eficiencia energética de tu edificio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mensaje de no hay artículos */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-16">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <p className="text-base text-slate-600 sm:text-lg">
              Aún no hay artículos publicados.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Próximamente publicaremos contenido sobre eficiencia energética y renovables.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

