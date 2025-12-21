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

### 6. Configurar Supabase

Crear `lib/supabaseClient.ts` adaptado para Next.js (ya existe, solo verificar).

### 7. Variables de entorno

Crear `.env.local` con:
```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xdandgvb
```

**Nota sobre Formspree:**
- El endpoint de Formspree ya está configurado por defecto: `https://formspree.io/f/xdandgvb`
- Si quieres usar otro endpoint, puedes sobrescribirlo con la variable `NEXT_PUBLIC_FORMSPREE_ENDPOINT` en `.env.local`
- Si no configuras la variable, se usará el endpoint por defecto

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

