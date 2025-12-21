# Solución al Error 403 al crear usuario

## Problema
Al intentar iniciar sesión, aparece un error 403 al intentar crear el usuario en la tabla `users`.

## Solución

### Paso 1: Actualizar las políticas RLS en Supabase

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **SQL Editor**
3. Ejecuta esta consulta para actualizar la política de INSERT:

```sql
-- Eliminar la política antigua si existe
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Crear la política correcta
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
```

### Paso 2: Verificar que el usuario existe en auth.users

Asegúrate de que el usuario esté creado en **Authentication > Users** antes de intentar iniciar sesión.

### Paso 3: Verificar las políticas existentes

Si sigues teniendo problemas, ejecuta esta consulta para ver todas las políticas:

```sql
SELECT * FROM pg_policies WHERE tablename = 'users';
```

### Paso 4: Si el problema persiste

Ejecuta este SQL para eliminar todas las políticas y recrearlas:

```sql
-- Eliminar todas las políticas de users
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- Recrear las políticas
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);
```

## Nota importante

El código ahora maneja mejor los errores: si falla la creación del usuario en la tabla `users`, continuará usando los datos básicos del usuario autenticado (nombre extraído del email y el email mismo).

