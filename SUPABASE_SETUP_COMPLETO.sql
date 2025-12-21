-- ============================================================================
-- CONFIGURACIÓN COMPLETA DE SUPABASE PARA CERTIFICA INGENIERÍA
-- ============================================================================
-- Este archivo contiene todas las consultas SQL necesarias para configurar
-- la base de datos de Supabase para el CRM interno.
--
-- INSTRUCCIONES:
-- 1. Copia y pega cada sección en el SQL Editor de Supabase
-- 2. Ejecuta las consultas en orden
-- 3. Configura el bucket de Storage al final
-- ============================================================================

-- ============================================================================
-- 1. TABLA: leads (Mensajes del formulario de contacto)
-- ============================================================================
-- Almacena todos los mensajes recibidos desde el formulario de contacto
-- de la web pública.

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Habilitar Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política: Permitir INSERT a usuarios anónimos (formulario web)
CREATE POLICY "Allow anonymous insert on leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política: Permitir SELECT a usuarios autenticados (CRM)
CREATE POLICY "Allow authenticated select on leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

-- Política: Permitir UPDATE a usuarios autenticados (CRM)
CREATE POLICY "Allow authenticated update on leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true);

-- Política: Permitir DELETE a usuarios autenticados (CRM)
CREATE POLICY "Allow authenticated delete on leads"
  ON leads FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- 2. TABLA: contacts (Contactos/Clientes)
-- ============================================================================
-- Almacena información de los clientes que han enviado mensajes.
-- Se crea/actualiza automáticamente cuando llega un nuevo mensaje.

CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Habilitar Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Política: Permitir INSERT a usuarios anónimos (formulario web)
CREATE POLICY "Allow anonymous insert on contacts"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política: Permitir UPDATE a usuarios anónimos (formulario web - upsert)
CREATE POLICY "Allow anonymous update on contacts"
  ON contacts FOR UPDATE
  TO anon
  USING (true);

-- Política: Permitir SELECT a usuarios autenticados (CRM)
CREATE POLICY "Allow authenticated select on contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Política: Permitir UPDATE a usuarios autenticados (CRM)
CREATE POLICY "Allow authenticated update on contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true);

-- Política: Permitir DELETE a usuarios autenticados (CRM)
CREATE POLICY "Allow authenticated delete on contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_contacts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_contacts_updated_at();

-- ============================================================================
-- 3. TABLA: users (Usuarios del CRM)
-- ============================================================================
-- Almacena información adicional de los usuarios autenticados del CRM.
-- Se relaciona con auth.users de Supabase Auth.

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Habilitar Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Política: Los usuarios solo pueden actualizar su propio perfil
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Política: Permitir INSERT cuando se crea un usuario (se ejecuta desde el código)
-- IMPORTANTE: Esta política permite que usuarios autenticados inserten su propio perfil
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_users_updated_at();

-- ============================================================================
-- CONFIGURACIÓN DE STORAGE (SUPABASE STORAGE)
-- ============================================================================
-- 
-- PASOS MANUALES EN EL DASHBOARD DE SUPABASE:
--
-- 1. Ve a "Storage" en el menú lateral
-- 2. Haz clic en "Create bucket"
-- 3. Configura el bucket:
--    - Nombre: "avatars"
--    - Public bucket: SÍ (marcar como público)
--    - File size limit: 5 MB (o el que prefieras)
--    - Allowed MIME types: image/*
--
-- 4. Configura las políticas de acceso del bucket:
--    - Ve a "Policies" del bucket "avatars"
--    - Crea una política para permitir lectura pública:
--      * Policy name: "Public read access"
--      * Allowed operation: SELECT
--      * Target roles: anon, authenticated
--      * Policy definition: (bucket_id = 'avatars')
--
--    - Crea una política para permitir subida a usuarios autenticados:
--      * Policy name: "Authenticated upload"
--      * Allowed operation: INSERT
--      * Target roles: authenticated
--      * Policy definition: (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1])
--
--    - Crea una política para permitir actualización a usuarios autenticados:
--      * Policy name: "Authenticated update"
--      * Allowed operation: UPDATE
--      * Target roles: authenticated
--      * Policy definition: (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1])
--
--    - Crea una política para permitir eliminación a usuarios autenticados:
--      * Policy name: "Authenticated delete"
--      * Allowed operation: DELETE
--      * Target roles: authenticated
--      * Policy definition: (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1])
--
-- ============================================================================
-- RESUMEN DE TABLAS CREADAS
-- ============================================================================
--
-- 1. leads
--    - Almacena mensajes del formulario de contacto
--    - Campos: id, name, email, message, status, created_at
--    - RLS: INSERT anónimo, SELECT/UPDATE/DELETE autenticado
--
-- 2. contacts
--    - Almacena información de clientes
--    - Campos: id, name, email, created_at, updated_at
--    - RLS: INSERT/UPDATE anónimo, SELECT/UPDATE/DELETE autenticado
--    - Unique constraint en email
--
-- 3. users
--    - Almacena información adicional de usuarios del CRM
--    - Campos: id (FK a auth.users), name, email, profile_image_url, created_at, updated_at
--    - RLS: Solo acceso a su propio perfil
--
-- ============================================================================
-- CREAR USUARIOS DE PRUEBA
-- ============================================================================
--
-- Para crear usuarios de prueba:
-- 1. Ve a "Authentication" > "Users" en el dashboard de Supabase
-- 2. Haz clic en "Add user" > "Create new user"
-- 3. Ingresa email y contraseña
-- 4. El usuario se creará automáticamente en auth.users
-- 5. Cuando el usuario inicie sesión por primera vez, se creará
--    automáticamente un registro en la tabla users
--
-- ============================================================================
-- VERIFICACIÓN
-- ============================================================================
--
-- Para verificar que todo está correcto, ejecuta estas consultas:
--
-- SELECT COUNT(*) FROM leads;
-- SELECT COUNT(*) FROM contacts;
-- SELECT COUNT(*) FROM users;
--
-- Todas deberían devolver 0 (o el número de registros que tengas).
--
-- ============================================================================

