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

Home-page cards link to `/collections/<handle>`. The existing `/catalogo`
page remains the all-products browsing view during this migration.

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

## Risks and rollback

Products without the required seasonal tag will not appear in their intended
collection. Revert the home-link change to return to the metafield-filtered
catalogue route; the collections can remain unused or be removed manually in
Shopify Admin if explicitly requested.
