# Instrucciones para crear un usuario en Supabase

## Método 1: Desde el Dashboard (Recomendado)

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **Authentication** > **Users** en el menú lateral
3. Haz clic en el botón **"Add user"** o **"Create new user"**
4. Selecciona **"Create new user"**
5. Completa el formulario:
   - **Email**: `admin@certificaingenieria.es`
   - **Password**: `Admin2024!`
   - (Opcional) Marca **"Auto Confirm User"** para que no necesite verificar el email
6. Haz clic en **"Create user"**

El usuario se creará automáticamente y podrás iniciar sesión con estas credenciales.

---

## Método 2: Usando SQL (Requiere permisos de service_role)

Si tienes acceso al SQL Editor con permisos de service_role, puedes ejecutar:

```sql
-- Crear usuario en auth.users
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
  NOW(),
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

-- Nota: Este método es más complejo y requiere permisos especiales.
-- Es mejor usar el Método 1 desde el Dashboard.
```

---

## Credenciales de ejemplo sugeridas:

**Email**: `admin@certificaingenieria.es`  
**Password**: `Admin2024!`

O si prefieres otras credenciales:

**Email**: `crm@certificaingenieria.es`  
**Password**: `CertificaCRM2024!`

---

## Nota importante:

Después de crear el usuario en Authentication, cuando inicies sesión por primera vez desde el CRM, se creará automáticamente un registro en la tabla `users` con la información básica (nombre extraído del email y el email mismo).

