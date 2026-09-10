# 2026-09-10 home-collections-metafield

## Objetivo

Reemplazar la lista estática de colecciones en la home por colecciones reales de Shopify, filtradas mediante un metafield `custom.show_on_home` (booleano).

## Alcance

- **Tienda**: Crear definición de metafield de colección `custom.show_on_home` (True/false).
- **Code**: Loader en `_index.tsx` consulta colecciones con metafield, filtra las que tienen `show_on_home = "true"`, las pasa a `NenufarStory`.
- **UI**: `NenufarStory` acepta `collections` prop en lugar de array hardcodeado; renderiza cards con title, description, image.
- **Docs**: `docs/shopify/metafields.md` actualizada con la sección de collection metafields.

## Decisiones

- **Metafield booleano en lugar de texto**: El valor se compara como string `"true"` en el filtro (el Storefront API devuelve booleanos como strings). Se documenta como True/false en Admin.
- **Descripción de colección**: Se añade al query para que la card muestre `collection.description` en lugar del `copy` hardcodeado.
- **Sin refactor de `NenufarCatalogue`**: El catálogo sigue filtrando por `catalogName` en metafields de producto. Las tabs del catálogo se generan automáticamente a partir de los productos existentes.

## Archivos modificados

- `app/routes/_index.tsx` — nuevo `COLLECTIONS_QUERY`, loader filtra `show_on_home`, pasa collections a `NenufarStory`
- `app/components/NenufarStory.tsx` — prop `collections: CollectionCard[]` en lugar de array hardcodeado; campo `description`
- `app/components/Header.tsx` — botón WhatsApp eliminado
- `docs/shopify/metafields.md` — sección de collection metafields añadida

## Validación

- `npm run codegen` — pass
- `npm run typecheck` — pass
- Metafield verificado con `shopify store execute` (query de `metafieldDefinitions`)

## Riesgos

- **Colecciones sin `show_on_home` habilitado**: La home no mostrará cards de colecciones hasta que se active el checkbox en Admin. El usuario debe activar las colecciones deseadas manualmente.
- **Descripción vacía**: Si una colección no tiene descripción, la card no muestra el párrafo (solo título, imagen y link). Esto es acceptable.

## Rollback

- Revertir a la lista hardcodeada de `collections` en `NenufarStory.tsx` y eliminar la consulta `COLLECTIONS_QUERY` del loader.
- El metafield `custom.show_on_home` puede eliminarse desde Shopify Admin > Settings > Custom data > Collections si se desea.
