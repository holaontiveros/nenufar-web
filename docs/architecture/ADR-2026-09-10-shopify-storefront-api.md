# ADR: Shopify como fuente de verdad comercial

## Estado

Aprobada el 2026-09-10.

## Contexto

La aplicación tenía productos, precios e IDs de variantes demo en el frontend y generaba enlaces de carrito. Se requiere que el cliente compre productos reales sin exponer detalles de la plataforma comercial en la interfaz.

## Alternativas consideradas

1. Mantener enlaces de carrito con IDs en código. Tiene bajo coste, pero precios, inventario y variantes se desincronizan y no hay carrito real.
2. Crear un backend propio que sincronice Shopify. Permite mayor control, pero añade infraestructura, secretos, mantenimiento y coste que no son necesarios para el primer lanzamiento.
3. Consumir Shopify Storefront API desde el frontend con un token Storefront público. Mantiene los datos comerciales en Shopify y permite carritos reales sin backend adicional.

## Decisión

Se adopta la alternativa 3. La aplicación consulta productos y metafields de producto desde Storefront API, crea y actualiza carritos con Cart API, y dirige el pago al `checkoutUrl` devuelto por Shopify. El único estado persistido localmente es el ID del carrito.

## Impacto y coste

- Shopify es la fuente de verdad para productos, variantes, precios, imágenes y disponibilidad.
- La interfaz no muestra marca, dominio ni configuración de Shopify.
- Se requieren un dominio de tienda, un token Storefront API público, productos publicados al canal de la web y las definiciones de metafields documentadas.
- El token Storefront es público por diseño; un token Admin queda expresamente prohibido en el frontend.

## Migración

1. Crear las definiciones de `custom` descritas en `docs/shopify/metafields.md`.
2. Importar el CSV demo o cargar productos reales, imágenes y variantes en Shopify.
3. Publicar los productos en el canal que da acceso a Storefront API.
4. Configurar `VITE_SHOPIFY_STORE_DOMAIN` y `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` en el entorno de despliegue.
5. Validar catálogo, carrito, edición de personalización y pago con una tienda no productiva antes de producción.

## Riesgos

- Si faltan metafields, la UI usará valores de respaldo y algunos filtros no clasificarán los productos como se espera.
- La aplicación no puede verificar una compra real sin credenciales y productos publicados por el responsable de la tienda.
- Un carrito abierto con datos antiguos se descarta si Shopify ya no lo encuentra.

## Rollback

Revertir el commit de integración para volver temporalmente al catálogo local y a los enlaces de carrito. No se deben borrar productos ni configuraciones de Shopify como parte del rollback.
