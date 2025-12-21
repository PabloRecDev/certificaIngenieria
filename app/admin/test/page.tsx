"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestSupabase() {
  const [status, setStatus] = useState<string>("Verificando...");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    checkSupabase();
  }, []);

  const checkSupabase = async () => {
    try {
      // Verificar conexión
      const { data: { session } } = await supabase.auth.getSession();
      setStatus(`Conexión OK. Sesión: ${session ? "Activa" : "No activa"}`);

      // Intentar listar usuarios (solo funciona con service_role, pero probamos)
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) {
        console.log("No se pueden listar usuarios (normal sin service_role)");
      } else {
        setUsers(data.users || []);
      }
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Test de Supabase</h1>
      <p className="mb-4">{status}</p>
      <div className="space-y-2">
        <p className="text-sm text-slate-400">
          URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Configurada" : "❌ No configurada"}
        </p>
        <p className="text-sm text-slate-400">
          Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Configurada" : "❌ No configurada"}
        </p>
      </div>
      {users.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Usuarios encontrados:</h2>
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="text-sm">
                {user.email} - {user.email_confirmed_at ? "✅ Confirmado" : "❌ No confirmado"}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6 p-4 bg-slate-900 rounded-lg">
        <p className="text-sm text-slate-300 mb-2">Para verificar usuarios:</p>
        <ol className="text-sm text-slate-400 list-decimal list-inside space-y-1">
          <li>Ve a Supabase Dashboard</li>
          <li>Authentication → Users</li>
          <li>Verifica que existe un usuario con el email que estás usando</li>
          <li>Si no existe, créalo con "Auto Confirm User" marcado</li>
        </ol>
      </div>
    </div>
  );
}

