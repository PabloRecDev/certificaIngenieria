import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "../components/Layout";
import {
  Envelope,
  Phone,
  PaperPlaneTilt,
  CheckCircle,
} from "phosphor-react";
import { supabase } from "../lib/supabaseClient";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    rgpd: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: leadsError } = await supabase.from("leads").insert({
        name: formData.nombre,
        email: formData.email,
        message: formData.mensaje,
        status: "new",
      });

      // Actualizar/crear contacto en tabla contacts (por email)
      // Primero intentamos insertar, si falla por conflicto hacemos update
      const { error: insertError } = await supabase.from("contacts").insert({
        name: formData.nombre,
        email: formData.email,
      });

      let contactsError = insertError;
      // Si el error es por conflicto único (email ya existe), hacemos update
      if (insertError?.code === "23505") {
        const { error: updateError } = await supabase
          .from("contacts")
          .update({ name: formData.nombre })
          .eq("email", formData.email);
        contactsError = updateError;
      }

      if (leadsError || contactsError) {
        // eslint-disable-next-line no-console
        console.error(leadsError || contactsError);
        setError(
          "Ha habido un problema al enviar el mensaje. Inténtalo de nuevo en unos minutos."
        );
      } else {
        setSubmitted(true);
        setFormData({
          nombre: "",
          email: "",
          mensaje: "",
          rgpd: false,
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError(
        "Ha habido un problema al enviar el mensaje. Inténtalo de nuevo en unos minutos."
      );
    } finally {
      setLoading(false);
      if (!error) {
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center space-y-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-secondary">
              Contacto
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Hablemos de tu proyecto energético
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Cuéntanos tu caso y te responderemos en menos de 48 horas laborables.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-20">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Texto a la izquierda */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  ¿Cómo podemos ayudarte?
                </h2>
                <p className="text-base leading-relaxed text-slate-600">
                  Cuéntanos tu caso y te preparamos un prediagnóstico energético sin compromiso. 
                  Te responderemos en menos de 48 horas laborables.
                </p>
              </div>

              {/* Qué tipo de consultas atendemos */}
              <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Proyectos habituales
                  </p>
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li>· Viviendas unifamiliares de obra nueva.</li>
                    <li>· Reformas integrales con mejora energética.</li>
                    <li>· Edificios plurifamiliares y comunidades.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Qué puedes pedirnos
                  </p>
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li>· Estudio energético inicial y opciones de mejora.</li>
                    <li>· Acompañamiento en obra y coordinación técnica.</li>
                    <li>· Dudas sobre normativa y certificación energética.</li>
                  </ul>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="space-y-4 pt-4">
                <a
                  href="mailto:administración@certificaingenieria.com"
                  className="flex items-center gap-3 text-slate-700 transition hover:text-brand-secondary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
                    <Envelope size={20} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Correo</p>
                    <p className="text-sm font-medium">
                      administración@certificaingenieria.com
                    </p>
                  </div>
                </a>
                <a
                  href="tel:+34614069154"
                  className="flex items-center gap-3 text-slate-700 transition hover:text-brand-secondary"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
                    <Phone size={20} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Teléfono</p>
                    <p className="text-sm font-medium">+34 614 06 91 54</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Formulario a la derecha */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 rounded-xl bg-emerald-50 p-8 text-center"
                  >
                    <CheckCircle
                      size={48}
                      weight="fill"
                      className="text-brand-secondary"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">
                        ¡Mensaje enviado!
                      </p>
                      <p className="text-sm text-slate-600">
                        Te responderemos en menos de 48 horas laborables.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Nombre y apellidos *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        className="field-input"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="field-input"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">
                        Mensaje *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.mensaje}
                        onChange={(e) =>
                          setFormData({ ...formData, mensaje: e.target.value })
                        }
                        className="field-textarea"
                        placeholder="Cuéntanos brevemente tu caso o consulta..."
                      />
                    </div>
                    <div className="flex items-start gap-2">
                      <input
                        id="rgpd"
                        type="checkbox"
                        required
                        checked={formData.rgpd}
                        onChange={(e) =>
                          setFormData({ ...formData, rgpd: e.target.checked })
                        }
                        className="field-checkbox"
                      />
                      <label
                        htmlFor="rgpd"
                        className="text-xs leading-relaxed text-slate-600"
                      >
                        He leído y acepto la política de privacidad y autorizo el
                        tratamiento de mis datos. *
                      </label>
                    </div>
                    {error && (
                      <p className="text-xs text-red-500">{error}</p>
                    )}
                    <motion.button
                      type="submit"
                      className="btn-primary w-full rounded-full px-6 py-3 text-sm shadow-md shadow-black/30 disabled:opacity-60"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {loading ? "Enviando..." : "Enviar mensaje"}
                        <PaperPlaneTilt size={18} weight="bold" />
                      </span>
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mapa de la oficina */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-secondary">
                Nuestra oficina
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Calle Haya, 13 · Carabanchel, Madrid
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Te podemos atender en remoto o de forma presencial con cita previa en nuestra
                oficina de Carabanchel. Aquí tienes el mapa para que puedas ubicarnos fácilmente.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-72 w-full sm:h-96">
                <iframe
                  title="Ubicación Certifica Ingeniería - Calle Haya 13, Carabanchel, Madrid"
                  src="https://www.google.com/maps?q=Calle%20Haya%2013,%20Carabanchel,%20Madrid&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default Contacto;

