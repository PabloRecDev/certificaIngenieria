-- ============================================================================
-- DIAGNÓSTICO Y SOLUCIÓN DEFINITIVA PARA ERROR 403 EN LEADS
-- ============================================================================
-- Este script primero diagnostica el problema y luego lo soluciona
-- ============================================================================

-- ============================================================================
-- PASO 1: DIAGNÓSTICO - Ver estado actual
-- ============================================================================

-- Ver si RLS está habilitado
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename IN ('leads', 'contacts');

-- Ver TODAS las políticas actuales de leads
SELECT 
  '=== POLÍTICAS ACTUALES DE LEADS ===' as info;
  
SELECT 
  policyname, 
  cmd as operation, 
  roles,
  qual as using_expression,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'leads'
ORDER BY cmd, policyname;

-- ============================================================================
-- PASO 2: SOLUCIÓN - Eliminar TODAS las políticas
-- ============================================================================

-- Eliminar todas las políticas de leads (método más seguro)
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'leads'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON leads', pol.policyname);
        RAISE NOTICE 'Política eliminada: %', pol.policyname;
    END LOOP;
END $$;

-- Eliminar todas las políticas de contacts
DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'contacts'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON contacts', pol.policyname);
        RAISE NOTICE 'Política eliminada: %', pol.policyname;
    END LOOP;
END $$;

-- ============================================================================
-- PASO 3: Asegurar que RLS está habilitado
-- ============================================================================

ALTER TABLE IF EXISTS leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS contacts ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PASO 4: Crear políticas nuevas (método más permisivo)
-- ============================================================================

-- Política para INSERT anónimo en leads (MÁS PERMISIVA)
CREATE POLICY "anon_insert_leads"
  ON public.leads
  AS PERMISSIVE
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Políticas para usuarios autenticados en leads
CREATE POLICY "auth_select_leads"
  ON public.leads
  AS PERMISSIVE
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_leads"
  ON public.leads
  AS PERMISSIVE
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "auth_delete_leads"
  ON public.leads
  AS PERMISSIVE
  FOR DELETE
  TO authenticated
  USING (true);

-- Políticas para contacts
CREATE POLICY "anon_insert_contacts"
  ON public.contacts
  AS PERMISSIVE
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_update_contacts"
  ON public.contacts
  AS PERMISSIVE
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "auth_select_contacts"
  ON public.contacts
  AS PERMISSIVE
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth_update_contacts"
  ON public.contacts
  AS PERMISSIVE
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "auth_delete_contacts"
  ON public.contacts
  AS PERMISSIVE
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- PASO 5: VERIFICACIÓN FINAL
-- ============================================================================

SELECT 
  '=== VERIFICACIÓN FINAL - POLÍTICAS DE LEADS ===' as info;

SELECT 
  policyname, 
  cmd as operation, 
  roles,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'leads'
ORDER BY cmd, policyname;

SELECT 
  '=== VERIFICACIÓN FINAL - POLÍTICAS DE CONTACTS ===' as info;

SELECT 
  policyname, 
  cmd as operation, 
  roles,
  with_check as with_check_expression
FROM pg_policies 
WHERE tablename = 'contacts'
ORDER BY cmd, policyname;

-- ============================================================================
-- PASO 6: PRUEBA MANUAL (OPCIONAL)
-- ============================================================================
-- Si quieres probar manualmente que funciona, ejecuta esto:
-- 
-- INSERT INTO leads (name, email, message, status)
-- VALUES ('Test', 'test@example.com', 'Mensaje de prueba', 'new');
-- 
-- Si funciona, deberías ver el registro insertado.
-- Si falla, el error te dirá qué está mal.

