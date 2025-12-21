"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle, XCircle, Warning } from "phosphor-react";

export default function CrearUsuario() {
  const [email, setEmail] = useState("admin@certificaingenieria.es");
  const [password, setPassword] = useState("Admin2024!");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  const handleCrearUsuario = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Intentar crear usuario con signUp
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (error) {
        console.error("Error completo:", error);
        if (error.message.includes("already registered") || error.message.includes("already exists")) {
          setMessage({
            type: "info",
            text: "Este usuario ya existe. Si no puedes iniciar sesión, verifica la contraseña o resetea la contraseña desde Supabase Dashboard > Authentication > Users.",
          });
        } else if (error.status === 422 || error.message.includes("Signups not allowed")) {
          setMessage({
            type: "error",
            text: `El registro desde el cliente está deshabilitado por seguridad (esto es normal). DEBES crear el usuario desde Supabase Dashboard: Authentication > Users > Add user > Marca "Auto Confirm User" > Create user.`,
          });
        } else {
          setMessage({
            type: "error",
            text: `Error: ${error.message}. La creación de usuarios desde el cliente puede estar deshabilitada. Es mejor crear el usuario desde Supabase Dashboard.`,
          });
        }
      } else if (data.user) {
        setMessage({
          type: "success",
          text: `Usuario creado: ${data.user.email}. Sin embargo, necesitas confirmarlo desde Supabase Dashboard o usar "Auto Confirm User" al crearlo manualmente.`,
        });
      }
    } catch (error: any) {
      setMessage({
        type: "error",
        text: `Error inesperado: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 p-8 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Crear Usuario en Supabase</h1>
        <p className="mb-8 text-slate-400">
          Esta herramienta intenta crear un usuario, pero es mejor hacerlo desde Supabase Dashboard.
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none"
                placeholder="admin@certificaingenieria.es"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-600 focus:outline-none"
                placeholder="Admin2024!"
              />
            </div>

            <button
              onClick={handleCrearUsuario}
              disabled={loading}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? "Creando..." : "Intentar crear usuario"}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mt-6 flex items-start gap-3 rounded-lg border p-4 ${
              message.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10"
                : message.type === "error"
                ? "border-red-500/30 bg-red-500/10"
                : "border-yellow-500/30 bg-yellow-500/10"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle size={20} className="mt-0.5 text-emerald-400" />
            ) : message.type === "error" ? (
              <XCircle size={20} className="mt-0.5 text-red-400" />
            ) : (
              <Warning size={20} className="mt-0.5 text-yellow-400" />
            )}
            <p className="flex-1 text-sm">{message.text}</p>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2">
            <XCircle size={20} className="text-red-400" />
            <h2 className="text-lg font-semibold">⚠️ Signups Deshabilitados</h2>
          </div>
          <p className="mb-4 text-sm text-slate-300">
            El registro desde el cliente está <strong>deshabilitado por seguridad</strong> (esto es normal y correcto). 
            <strong className="text-white"> DEBES crear el usuario desde Supabase Dashboard.</strong>
          </p>
          <p className="text-sm text-slate-400">
            Esto es una medida de seguridad estándar. Solo los administradores pueden crear usuarios desde el Dashboard.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold">Instrucciones paso a paso:</h2>
          <ol className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold">
                1
              </span>
              <span>
                Ve a{" "}
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline"
                >
                  Supabase Dashboard
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold">
                2
              </span>
              <span>Selecciona tu proyecto</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold">
                3
              </span>
              <span>Ve a <strong>Authentication</strong> → <strong>Users</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold">
                4
              </span>
              <span>Haz clic en <strong>"Add user"</strong> o <strong>"Create new user"</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold">
                5
              </span>
              <span>
                Completa el formulario:
                <ul className="ml-4 mt-2 list-disc space-y-1">
                  <li>Email: <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">{email}</code></li>
                  <li>Password: <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">{password}</code></li>
                  <li>
                    <strong className="text-yellow-400">IMPORTANTE:</strong> Marca{" "}
                    <strong>"Auto Confirm User"</strong>
                  </li>
                </ul>
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold">
                6
              </span>
              <span>Haz clic en <strong>"Create user"</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold">
                7
              </span>
              <span>
                Vuelve a{" "}
                <a
                  href="/admin"
                  className="text-emerald-400 underline"
                >
                  /admin
                </a>{" "}
                e inicia sesión
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

