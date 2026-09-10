# Integración real de catálogo y pago

## Objetivo

Conectar el catálogo, carrito y pago a Shopify Storefront API sin mostrar detalles de la integración al cliente.

## Alcance

- Se sustituyeron los enlaces de carrito por las mutaciones Cart API (`cartCreate`, `cartLinesAdd`, `cartLinesUpdate` y `cartLinesRemove`).
- El catálogo consulta productos, variantes, precios, imágenes y metafields desde Shopify cuando el entorno está configurado.
- El carrito guarda únicamente su ID en el navegador y redirige al `checkoutUrl` real.
- Se retiraron las pantallas, indicadores y textos visibles de configuración de Shopify.
- Se añadió el CSV demo, el generador reproducible y la documentación de configuración de metafields.

## Decisiones

- Se implementó la decisión aprobada en `docs/architecture/ADR-2026-09-10-shopify-storefront-api.md`.
- Los productos locales se mantienen sólo como contenido semilla para desarrollo sin una tienda configurada; no son la fuente de verdad en entornos configurados.

## Archivos modificados

- `src/App.tsx`
- `src/components/CatalogProductsSection.tsx`
- `src/components/CartDrawer.tsx`
- `src/components/ProductPersonalizeModal.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/Hero.tsx`
- `src/components/SeasonalCatalogs.tsx`
- `src/utils/shopify.ts`
- `src/types.ts`
- `src/vite-env.d.ts`
- `docs/shopify/`
- `scripts/generate-shopify-demo-csv.ts`

## Validación

- `npm run lint` — correcto.
- `npm run build` — correcto.
- CSV validado: 34 filas de producto/variante y 32 columnas con estructura CSV UTF-8 consistente.

## Riesgos pendientes

- Faltan el dominio, token Storefront y publicación de productos de la tienda real para completar una prueba end-to-end.
- La calidad, licencias y permanencia de las imágenes demo deben validarse antes de producción.

## Rollback

Revertir el commit de integración. Los datos demo y los ajustes de Shopify externos permanecen intactos.
