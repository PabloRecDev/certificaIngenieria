# Guía de Migración a Next.js

## Pasos para completar la migración

### 1. Instalar dependencias de Next.js

```bash
# Renombrar el package.json actual
mv package.json package-vite.json
mv next-package.json package.json

# Instalar dependencias
npm install
```

### 2. Actualizar configuración

```bash
# Renombrar archivos de configuración
mv tsconfig.json tsconfig-vite.json
mv next-tsconfig.json tsconfig.json

mv tailwind.config.js tailwind-vite.config.js
mv next-tailwind.config.js tailwind.config.js
```

### 3. Crear estructura de directorios

La estructura básica ya está creada:
- `app/` - Directorio de App Router de Next.js
- `components/` - Componentes compartidos
- `public/` - Archivos estáticos (ya existe)

### 4. Migrar páginas

Las páginas deben crearse en `app/[ruta]/page.tsx`. Ejemplo:

- `app/page.tsx` → Home (/)
- `app/nosotros/page.tsx` → Nosotros (/nosotros)
- `app/blog/page.tsx` → Blog (/blog)
- etc.

### 5. Migrar componentes

Los componentes que usan hooks de cliente deben tener `"use client"` al inicio.

### 6. Configurar Resend para formularios de contacto

El formulario de contacto utiliza Resend para enviar notificaciones por correo electrónico.

**Pasos para configurar Resend:**

1. Regístrate en [Resend](https://resend.com/) (gratis hasta 3,000 emails/mes)
2. Crea una API Key desde el dashboard de Resend
3. Verifica tu dominio o usa el dominio de prueba de Resend
4. Añade las siguientes variables a tu `.env.local`:

```env
RESEND_API_KEY=re_tu_api_key_aqui
RESEND_FROM_EMAIL=noreply@certificaingenieria.com
RESEND_TO_EMAIL=administración@certificaingenieria.com
```

**Notas:**
- `RESEND_API_KEY`: Tu API key de Resend (obligatorio)
- `RESEND_FROM_EMAIL`: Email desde el que se enviarán los mensajes (debe estar verificado en Resend)
- `RESEND_TO_EMAIL`: Email donde recibirás los mensajes de contacto (por defecto: administración@certificaingenieria.com)

### 7. Variables de entorno (opcional - solo si usas Supabase para otras funciones)

Si necesitas Supabase para otras funcionalidades (no para el formulario de contacto), crea `.env.local` con:
```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

### 8. Ejecutar

```bash
npm run dev
```

## Archivos creados

- ✅ `next.config.js` - Configuración de Next.js
- ✅ `app/layout.tsx` - Layout raíz con metadata SEO
- ✅ `app/globals.css` - Estilos globales
- ✅ `components/Layout.tsx` - Componente Layout adaptado para Next.js

## Próximos pasos

1. Migrar todas las páginas de `src/pages/` a `app/[ruta]/page.tsx`
2. Añadir metadata SEO a cada página
3. Migrar página Admin (requiere autenticación)
4. Configurar generación estática para Blog
5. Probar todas las rutas

