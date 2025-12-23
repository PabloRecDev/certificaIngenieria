# 📝 Instrucciones para Añadir Contenido al Blog

## Cómo añadir un nuevo artículo

1. Abre el archivo `src/data/blog/blogPosts.json` en tu editor de código (VS Code, etc.)

2. Añade un nuevo objeto al array con la siguiente estructura:

```json
{
  "id": "7",
  "title": "Título de tu artículo",
  "excerpt": "Breve descripción del artículo (2-3 líneas máximo)",
  "date": "25 Mar 2024",
  "readTime": "5 min",
  "category": "Eficiencia energética",
  "imageUrl": "URL_de_la_imagen",
  "slug": "titulo-del-articulo-en-minusculas-con-guiones"
}
```

### Campos explicados:

- **id**: Número único, incrementa el último número usado
- **title**: Título del artículo
- **excerpt**: Resumen breve (aparece en la lista del blog)
- **date**: Fecha en formato "DD MMM YYYY" (ej: "25 Mar 2024")
- **readTime**: Tiempo estimado de lectura (ej: "5 min", "8 min")
- **category**: Categoría del artículo (puedes usar: "Eficiencia energética", "Certificación", "Renovables", "Normativa", "Auditorías")
- **imageUrl**: URL de una imagen (puedes usar imágenes de Pexels, Unsplash, o subir tus propias imágenes)
- **slug**: URL amigable (sin espacios, con guiones, en minúsculas)

### Ejemplo completo:

```json
{
  "id": "7",
  "title": "Cómo optimizar la factura eléctrica en comunidades de vecinos",
  "excerpt": "Guía práctica para reducir los costes energéticos en comunidades de propietarios mediante la optimización de contratos y la gestión eficiente del consumo.",
  "date": "28 Mar 2024",
  "readTime": "6 min",
  "category": "Eficiencia energética",
  "imageUrl": "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "slug": "optimizar-factura-electrica-comunidades"
}
```

## Consejos importantes:

1. **Mantén el formato JSON válido**: Asegúrate de que todas las comillas estén cerradas y las comas estén correctas
2. **Orden**: Los artículos más recientes deberían ir al principio del array
3. **Imágenes**: Usa imágenes de buena calidad (mínimo 1200px de ancho)
4. **Slug único**: Cada artículo debe tener un slug diferente

## Después de añadir el artículo:

1. Guarda el archivo
2. Si estás en desarrollo, el servidor se recargará automáticamente
3. Si estás en producción, necesitarás hacer un nuevo build y desplegar

## ¿Necesitas ayuda con imágenes?

Puedes usar estas fuentes gratuitas:
- **Pexels**: https://www.pexels.com/es-es/
- **Unsplash**: https://unsplash.com/
- **Pixabay**: https://pixabay.com/es/

Busca imágenes relacionadas con eficiencia energética, edificios, energía solar, etc.

