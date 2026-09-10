# Retire catalogue metafield reads

## Objective

Use native Shopify collections for the `/catalogo` seasonal grouping and retire
the legacy catalogue metafields from new imports and storefront reads.

## Scope

- Load the catalogue from the configured native collection handles.
- Keep the existing technique and lead-time product metafields.
- Add the missing `Bodas & Eventos Especiales` automated collection using the
  existing `bodas` product tag, so no demo products disappear from the
  catalogue.
- Remove `custom.catalog_id` and `custom.catalog_name` columns from the demo
  CSV and from setup documentation.

## Decisions

- Shopify collections are the grouping source of truth; see
  `docs/architecture/ADR-2026-09-10-shopify-seasonal-collections.md`.
- Existing values and definitions of the retired metafields remain in the
  development store until deployment validation completes. Their deletion is a
  separate destructive cleanup chunk.

## Store changes

Created an automated collection:

- `Bodas & Eventos Especiales` (`bodas-eventos-especiales`), matching tag
  `bodas`.

The Shopify CLI read-back confirmed its four expected demo products.

## Files modified

- `app/routes/catalogo.tsx`
- `app/components/NenufarCatalogue.tsx`
- `docs/shopify/nenufar-demo-products.csv`
- `docs/shopify/metafields.md`
- `docs/architecture/ADR-2026-09-10-shopify-seasonal-collections.md`
- `docs/changes/2026-09-10-retire-catalogue-metafields.md`

## Validation

- Shopify CLI authenticated with product read/write access.
- Shopify CLI confirmed the new collection and its four products.
- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

All local validation commands completed successfully. Deployment verification
is pending.

## Risks

The catalogue has an explicit list of five collection handles. If a future
native catalogue is added, its handle must be added to that list. Products
without one of the configured collection tags will not appear in `/catalogo`.

## Rollback

Revert this commit to restore the metafield-backed catalogue loader and demo
CSV columns. The added Shopify collection may remain unused; remove it only in
an explicitly approved store cleanup action.
