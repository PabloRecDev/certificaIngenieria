"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle, XCircle, Warning, MagnifyingGlass } from "phosphor-react";

export default function VerificarUsuario() {
  const [email, setEmail] = useState("admin@certificaingenieria.es");
  const [password, setPassword] = useState("Admin2024!");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error" | "info";
    title: string;
    message: string;
    details?: any;
  } | null>(null);

  const handleVerificar = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Intentar iniciar sesión
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        console.error("Error completo:", error);
        if (error.message.includes("Invalid login credentials") || error.status === 400) {
          setResult({
            type: "error",
            title: "Credenciales inválidas",
            message:
              "El usuario no existe o las credenciales son incorrectas. Verifica:",
            details: {
              checklist: [
                "¿El usuario existe en Supabase Dashboard > Authentication > Users?",
                "¿El email es exactamente el mismo (sin espacios)?",
                "¿La contraseña es correcta?",
                "¿El usuario está confirmado? (debe tener 'Auto Confirm User' o estar verificado)",
              ],
            },
          });
        } else {
          setResult({
            type: "error",
            title: "Error de autenticación",
            message: error.message,
            details: error,
          });
        }
      } else if (data.user) {
        setResult({
          type: "success",
          title: "¡Login exitoso!",
          message: `Usuario autenticado correctamente: ${data.user.email}`,
          details: {
            userId: data.user.id,
            email: data.user.email,
            confirmed: data.user.email_confirmed_at ? "Sí" : "No",
          },
        });
        // Cerrar sesión después de verificar
        await supabase.auth.signOut();
      }
    } catch (error: any) {
      setResult({
        type: "error",
        title: "Error inesperado",
        message: error.message || "Error desconocido",
        details: error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 p-8 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Verificar Usuario</h1>
          <p className="text-slate-400">
            Herramienta para verificar si las credenciales funcionan correctamente
          </p>
        </div>

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
              onClick={handleVerificar}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Verificando...
                </>
              ) : (
                <>
                  <MagnifyingGlass size={18} weight="bold" />
                  Verificar credenciales
                </>
              )}
            </button>
          </div>
        </div>

        {result && (
          <div
            className={`mt-6 rounded-xl border p-6 ${
              result.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10"
                : result.type === "error"
                ? "border-red-500/30 bg-red-500/10"
                : "border-yellow-500/30 bg-yellow-500/10"
            }`}
          >
            <div className="flex items-start gap-3">
              {result.type === "success" ? (
                <CheckCircle size={24} className="mt-0.5 text-emerald-400" />
              ) : result.type === "error" ? (
                <XCircle size={24} className="mt-0.5 text-red-400" />
              ) : (
                <Warning size={24} className="mt-0.5 text-yellow-400" />
              )}
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold">{result.title}</h3>
                <p className="mb-3 text-sm text-slate-300">{result.message}</p>
                {result.details?.checklist && (
                  <ul className="space-y-2 text-sm text-slate-300">
                    {result.details.checklist.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 text-slate-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {result.details && !result.details.checklist && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-xs text-slate-400">
                      Ver detalles técnicos
                    </summary>
                    <pre className="mt-2 overflow-auto rounded bg-slate-900/50 p-3 text-xs">
                      {JSON.stringify(result.details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold">Pasos para crear el usuario:</h2>
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
              <span>Haz clic en <strong>"Add user"</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold">
                5
              </span>
              <span>
                Completa:
                <ul className="ml-4 mt-2 list-disc space-y-1">
                  <li>
                    Email: <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">{email}</code>
                  </li>
                  <li>
                    Password: <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs">{password}</code>
                  </li>
                  <li className="text-yellow-400">
                    <strong>⚠️ IMPORTANTE:</strong> Marca{" "}
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
                Vuelve aquí y haz clic en <strong>"Verificar credenciales"</strong>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

