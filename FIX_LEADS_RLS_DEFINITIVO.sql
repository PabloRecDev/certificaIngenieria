-- ============================================================================
-- SOLUCIÓN DEFINITIVA AL ERROR 403 EN LEADS
-- ============================================================================
-- Este script elimina TODAS las políticas existentes y las recrea correctamente
--
-- INSTRUCCIONES:
-- 1. Ve a Supabase Dashboard > SQL Editor
-- 2. Copia y pega este script completo
-- 3. Ejecuta el script
-- 4. Verifica con las consultas al final
-- ============================================================================

-- ============================================================================
-- PASO 1: VERIFICAR Y ELIMINAR TODAS LAS POLÍTICAS DE LEADS
-- ============================================================================

-- Ver todas las políticas existentes antes de eliminarlas
SELECT 
  'Políticas existentes de leads:' as info,
  policyname, 
  cmd as operation, 
  roles
FROM pg_policies 
WHERE tablename = 'leads';

-- Eliminar TODAS las políticas de leads (sin importar el nombre)
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'leads') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON leads';
    END LOOP;
END $$;

-- ============================================================================
-- PASO 2: VERIFICAR QUE LA TABLA EXISTE Y TIENE RLS HABILITADO
-- ============================================================================

-- Asegurar que RLS está habilitado
ALTER TABLE IF EXISTS leads ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PASO 3: CREAR LAS POLÍTICAS CORRECTAS PARA LEADS
-- ============================================================================

-- Política para INSERT anónimo (formulario web)
CREATE POLICY "leads_anon_insert"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Políticas para usuarios autenticados (CRM)
CREATE POLICY "leads_auth_select"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "leads_auth_update"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "leads_auth_delete"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- PASO 4: VERIFICAR Y ELIMINAR TODAS LAS POLÍTICAS DE CONTACTS
-- ============================================================================

-- Ver todas las políticas existentes antes de eliminarlas
SELECT 
  'Políticas existentes de contacts:' as info,
  policyname, 
  cmd as operation, 
  roles
FROM pg_policies 
WHERE tablename = 'contacts';

-- Eliminar TODAS las políticas de contacts
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'contacts') LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON contacts';
    END LOOP;
END $$;

-- ============================================================================
-- PASO 5: CREAR LAS POLÍTICAS CORRECTAS PARA CONTACTS
-- ============================================================================

-- Asegurar que RLS está habilitado
ALTER TABLE IF EXISTS contacts ENABLE ROW LEVEL SECURITY;

-- Política para INSERT anónimo
CREATE POLICY "contacts_anon_insert"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para UPDATE anónimo (necesaria para upsert)
CREATE POLICY "contacts_anon_update"
  ON contacts
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Políticas para usuarios autenticados
CREATE POLICY "contacts_auth_select"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "contacts_auth_update"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "contacts_auth_delete"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- PASO 6: VERIFICACIÓN FINAL
-- ============================================================================

-- Verificar políticas de leads
SELECT 
  'VERIFICACIÓN LEADS:' as info,
  policyname, 
  cmd as operation, 
  roles,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'leads'
ORDER BY cmd, policyname;

-- Verificar políticas de contacts
SELECT 
  'VERIFICACIÓN CONTACTS:' as info,
  policyname, 
  cmd as operation, 
  roles,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'contacts'
ORDER BY cmd, policyname;

-- ============================================================================
-- NOTAS IMPORTANTES
-- ============================================================================
-- 
-- Si después de ejecutar este script sigues teniendo el error 403:
-- 
-- 1. Verifica que estás usando la clave ANON_KEY (no service_role)
-- 2. Verifica que las variables de entorno están correctas:
--    - NEXT_PUBLIC_SUPABASE_URL
--    - NEXT_PUBLIC_SUPABASE_ANON_KEY
-- 
-- 3. Si el problema persiste, prueba desactivar RLS temporalmente:
--    ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
--    (Solo para diagnóstico, NO en producción)
-- 
-- 4. Verifica que la tabla leads tiene la estructura correcta:
--    SELECT column_name, data_type, is_nullable
--    FROM information_schema.columns
--    WHERE table_name = 'leads';
-- 
-- ============================================================================

