-- ============================================================================
-- ELIMINAR Y RECREAR USUARIO EN SUPABASE
-- ============================================================================
-- INSTRUCCIONES:
-- 1. Ve a Supabase Dashboard > SQL Editor
-- 2. Ejecuta estas consultas EN ORDEN (una por una)
-- 3. Verifica el resultado después de cada paso
-- ============================================================================

-- PASO 1: Verificar si el usuario existe
SELECT email, id, email_confirmed_at, created_at
FROM auth.users 
WHERE email = 'admin@certificaingenieria.es';

-- PASO 2: Eliminar el usuario existente (si existe)
DELETE FROM auth.users 
WHERE email = 'admin@certificaingenieria.es';

-- PASO 3: Crear el usuario de nuevo CON email confirmado
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@certificaingenieria.es',
  crypt('Admin2024!', gen_salt('bf')),
  NOW(),  -- ⚠️ IMPORTANTE: email_confirmed_at = NOW() confirma el email
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- PASO 4: Verificar que se creó correctamente
SELECT 
  id,
  email,
  email_confirmed_at,  -- Debe tener una fecha (no NULL)
  created_at,
  last_sign_in_at
FROM auth.users 
WHERE email = 'admin@certificaingenieria.es';

-- ============================================================================
-- RESULTADO ESPERADO:
-- ============================================================================
-- Después del PASO 4, deberías ver:
-- - email: admin@certificaingenieria.es
-- - email_confirmed_at: [una fecha/hora] ← Esto es CRUCIAL, no debe ser NULL
-- - created_at: [una fecha/hora]
-- 
-- Si email_confirmed_at es NULL, el usuario NO podrá iniciar sesión.
-- ============================================================================

