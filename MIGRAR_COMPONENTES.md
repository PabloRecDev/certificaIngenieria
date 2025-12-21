# Script de Migración de Componentes

Para migrar los componentes de página de React Router a Next.js, ejecuta:

```bash
# Este script adapta automáticamente los imports y Links
for file in src/pages/*.tsx; do
  name=$(basename "$file" .tsx)
  # Crear componente adaptado
  sed 's/from "react-router-dom"/from "next\/link"/g; s/import { Link }/import Link/g; s/<Layout>/<>\//g; s/<\/Layout>/<\/>/g; s/from "..\/components\/Layout"/\/\/ Layout ya no se importa/g' "$file" > "components/${name}Page.tsx"
  # Añadir "use client" al inicio
  echo '"use client";' | cat - "components/${name}Page.tsx" > temp && mv temp "components/${name}Page.tsx"
done
```

**Nota**: Este script es una guía. Los componentes deben revisarse manualmente para:
1. Cambiar `to=` por `href=` en los Links
2. Eliminar el wrapper `<Layout>` (ya está en el layout raíz)
3. Añadir `"use client"` al inicio
4. Adaptar imports de `react-router-dom` a `next/link`



