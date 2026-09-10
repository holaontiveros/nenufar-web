# ADR: Use Shopify collections for seasonal catalogues

## Status

Accepted on 2026-09-10.

## Context

The storefront initially grouped seasonal products with the
`custom.catalog_name` metafield and a client-side filter on `/catalogo`.
Home-page collection cards therefore did not resolve to native Shopify
catalogue resources.

## Decision

Use Shopify automated collections as the source of truth for seasonal
catalogues. Each collection includes products matching one existing product
tag:

| Collection | Handle | Tag rule |
| --- | --- | --- |
| Día de la Madre | `dia-de-la-madre` | `madre` |
| Día del Padre | `dia-del-padre` | `padre` |
| Día del Maestro | `dia-del-maestro` | `maestro` |
| Navidad & Fin de Año | `navidad-fin-de-ano` | `navidad` |
| Bodas & Eventos Especiales | `bodas-eventos-especiales` | `bodas` |

Home-page cards link to `/catalogo?collection=<handle>`, while the central
catalogue page derives its seasonal tabs from those native collections. The legacy
`custom.catalog_id` and `custom.catalog_name` product metafields are retired
from new imports and storefront reads.

## Alternatives considered

- Continue using query-string filters backed by `custom.catalog_name`.
  This is simple but duplicates Shopify's native collection capability and
  does not provide canonical collection resources.
- Create a bespoke seasonal routing/data model. This adds unnecessary
  storefront and administrative complexity for the current catalogue.

## Impact

Merchandising can be managed in Shopify Admin through product tags and
collections. Native collection URLs can later receive collection-specific
SEO content and imagery without another data-model migration.

Existing legacy metafield values are retained until the deployed collection
backed catalogue is validated. Their destructive removal is a separate,
explicitly approved cleanup chunk.

## Risks and rollback

Products without the required seasonal tag will not appear in their intended
collection. Revert the home-link change to return to the metafield-filtered
catalogue route; the collections can remain unused or be removed manually in
Shopify Admin if explicitly requested.
