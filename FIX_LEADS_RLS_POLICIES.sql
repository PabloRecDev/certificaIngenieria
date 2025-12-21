-- ============================================================================
-- SOLUCIÓN AL ERROR 403 EN LEADS
-- ============================================================================
-- Este script corrige las políticas RLS para permitir que usuarios anónimos
-- puedan insertar leads desde el formulario de contacto.
--
-- INSTRUCCIONES:
-- 1. Ve a Supabase Dashboard > SQL Editor
-- 2. Copia y pega este script completo
-- 3. Ejecuta el script
-- ============================================================================

-- Paso 1: Verificar que RLS está habilitado (debe estar habilitado)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Paso 2: Eliminar TODAS las políticas existentes de leads para empezar limpio
DROP POLICY IF EXISTS "Allow anonymous insert on leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated select on leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated update on leads" ON leads;
DROP POLICY IF EXISTS "Allow authenticated delete on leads" ON leads;
DROP POLICY IF EXISTS "leads_anon_insert" ON leads;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON leads;

-- Paso 3: Crear la política correcta para INSERT anónimo
-- IMPORTANTE: Usar WITH CHECK (true) para permitir cualquier inserción anónima
CREATE POLICY "Allow anonymous insert on leads"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

-- Paso 4: Recrear las políticas para usuarios autenticados
CREATE POLICY "Allow authenticated select on leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update on leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on leads"
  ON leads FOR DELETE
  TO authenticated
  USING (true);

-- Paso 3: Verificar que la tabla leads existe y tiene las columnas correctas
-- (Si la tabla no existe, créala primero con el script SUPABASE_SETUP_COMPLETO.sql)

-- Paso 4: Verificar las políticas actuales
-- Ejecuta esto después para verificar:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies 
-- WHERE tablename = 'leads';

-- ============================================================================
-- SOLUCIÓN AL ERROR 403 EN CONTACTS (para upsert)
-- ============================================================================

-- Paso 1: Verificar que RLS está habilitado
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Paso 2: Eliminar TODAS las políticas existentes de contacts
DROP POLICY IF EXISTS "Allow anonymous insert on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow anonymous update on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated select on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated update on contacts" ON contacts;
DROP POLICY IF EXISTS "Allow authenticated delete on contacts" ON contacts;
DROP POLICY IF EXISTS "contacts_anon_insert" ON contacts;
DROP POLICY IF EXISTS "contacts_anon_update" ON contacts;

-- Paso 3: Crear las políticas correctas para INSERT y UPDATE anónimo
CREATE POLICY "Allow anonymous insert on contacts"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update on contacts"
  ON contacts FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Paso 4: Recrear las políticas para usuarios autenticados
CREATE POLICY "Allow authenticated select on contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update on contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Paso 3: Verificar las políticas actuales
-- Ejecuta esto después para verificar:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies 
-- WHERE tablename = 'contacts';

-- ============================================================================
-- VERIFICACIÓN FINAL
-- ============================================================================
-- Para verificar que todo funciona, ejecuta estas consultas:

-- Ver todas las políticas de leads:
SELECT 
  policyname, 
  cmd as operation, 
  roles,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'leads'
ORDER BY cmd;

-- Ver todas las políticas de contacts:
SELECT 
  policyname, 
  cmd as operation, 
  roles,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'contacts'
ORDER BY cmd;

