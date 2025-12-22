-- Crear tabla para almacenar mensajes de contacto
CREATE TABLE IF NOT EXISTS mensajes_contacto (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_mensajes_created_at ON mensajes_contacto(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mensajes_leido ON mensajes_contacto(leido);

-- Habilitar RLS (Row Level Security)
ALTER TABLE mensajes_contacto ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción desde la aplicación (anon)
CREATE POLICY "Permitir inserción de mensajes" ON mensajes_contacto
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para permitir lectura solo a usuarios autenticados
-- Nota: En producción, deberías usar autenticación real de Supabase
-- Por ahora, esta política permite lectura a todos (ajusta según necesites)
CREATE POLICY "Permitir lectura de mensajes" ON mensajes_contacto
  FOR SELECT
  TO anon
  USING (true);

-- Política para permitir actualización (marcar como leído)
CREATE POLICY "Permitir actualización de mensajes" ON mensajes_contacto
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

