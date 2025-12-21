-- ============================================================================
-- CONSULTA SQL PARA CREAR USUARIO EN SUPABASE
-- ============================================================================
-- INSTRUCCIONES:
-- 1. Ve a Supabase Dashboard > SQL Editor
-- 2. Pega esta consulta
-- 3. Modifica el email y password si quieres
-- 4. Ejecuta la consulta
-- ============================================================================

-- Método 1: Usando la función auth.users (Recomendado - más simple)
-- Nota: Esto requiere permisos de service_role o ejecutarse desde el SQL Editor con permisos adecuados

-- Primero, verifica si el usuario ya existe
SELECT email, id, email_confirmed_at 
FROM auth.users 
WHERE email = 'admin@certificaingenieria.es';

-- Si el usuario NO existe, ejecuta esto para crearlo:
-- (Descomenta las líneas siguientes si el usuario no existe)

/*
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
  NOW(),  -- email_confirmed_at - IMPORTANTE: esto confirma el email
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
*/

-- ============================================================================
-- MÉTODO 2: Usando la función auth.admin_create_user (Más seguro)
-- ============================================================================
-- Este método es más seguro y recomendado si tienes permisos de service_role

-- Descomenta y ejecuta esto (requiere permisos de service_role):
/*
SELECT auth.admin_create_user(
  '{
    "email": "admin@certificaingenieria.es",
    "password": "Admin2024!",
    "email_confirm": true,
    "user_metadata": {}
  }'::jsonb
);
*/

-- ============================================================================
-- MÉTODO 3: ELIMINAR Y RECREAR (Si el usuario ya existe pero no funciona)
-- ============================================================================

-- PASO 1: Elimina el usuario existente (ejecuta esto primero):
DELETE FROM auth.users 
WHERE email = 'admin@certificaingenieria.es';

-- PASO 2: Luego ejecuta el INSERT del Método 1 para crear el usuario de nuevo:
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
  NOW(),  -- email_confirmed_at - IMPORTANTE: esto confirma el email
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
-- PASO 3: Verifica que se creó correctamente:
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users 
WHERE email = 'admin@certificaingenieria.es';

-- ============================================================================
-- VERIFICACIÓN DESPUÉS DE CREAR
-- ============================================================================

-- Ejecuta esto para verificar que el usuario se creó correctamente:
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at
FROM auth.users 
WHERE email = 'admin@certificaingenieria.es';

-- Si email_confirmed_at NO es NULL, el usuario está confirmado y puede iniciar sesión

-- ============================================================================
-- NOTA IMPORTANTE:
-- ============================================================================
-- Si los métodos SQL no funcionan (por permisos), usa el Dashboard:
-- 1. Ve a Authentication > Users
-- 2. Haz clic en "Add user"
-- 3. Email: admin@certificaingenieria.es
-- 4. Password: Admin2024!
-- 5. Marca "Auto Confirm User"
-- 6. Create user
-- ============================================================================

