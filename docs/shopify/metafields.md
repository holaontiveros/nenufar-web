# Metafields de producto para Nenúfar

Antes de importar el CSV, crea estas definiciones en **Settings > Custom data > Products**. Todas usan el namespace `custom`.

| Nombre | Key | Tipo | Obligatorio para la UI | Uso |
| --- | --- | --- | --- | --- |
| Catálogo | `catalog_id` | Texto de una línea | Sí | Filtro. Valores permitidos: `madre`, `padre`, `maestro`, `navidad`, `bodas`, `todo-el-ano`. |
| Nombre de catálogo | `catalog_name` | Texto de una línea | Sí | Etiqueta visible de la colección. |
| Técnica | `technique` | Texto de una línea | Sí | Técnica mostrada y filtro por técnica. |
| Materiales | `materials` | Texto de varias líneas | Sí | Resumen de materiales en la ficha. |
| Tiempo de producción | `lead_time` | Texto de una línea | Sí | Tiempo de taller mostrado al cliente. |
| Badge | `badge` | Texto de una línea | Sí | Etiqueta breve sobre la imagen. |
| Destacado | `is_popular` | Verdadero o falso | No | Muestra la etiqueta «Más vendido». |
| Permite personalización | `allow_custom_text` | Verdadero o falso | Sí | Activa el campo de texto personalizado. |
| Indicaciones de personalización | `custom_text_placeholder` | Texto de una línea | No | Ejemplo dentro del campo de personalización. |

## Importación del CSV demo

1. Crea las definiciones anteriores con exactamente el namespace y keys indicados.
2. Importa `nenufar-demo-products.csv` desde **Products > Import**. El archivo usa UTF-8 y contiene productos, variantes, imágenes externas y valores de metafields.
3. Revisa que el canal usado por la web publique los productos y permita acceso mediante Storefront API.
4. Sustituye los datos e imágenes demo directamente en Shopify cuando estén disponibles. La web consulta el catálogo en cada carga y no requiere cambios de código para reflejarlos.

Los IDs de SKU del CSV son identificadores demo y no son IDs de variantes Shopify. Shopify generará los IDs GraphQL reales al importar; la web los consulta automáticamente mediante la API.
