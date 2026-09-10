# Route home collections through the catalogue

## Objective

Keep `/catalogo` as the single product browsing experience while continuing to
use native Shopify collections as its data source.

## Scope

- Change home seasonal card links from `/collections/<handle>` to
  `/catalogo?collection=<handle>`.
- Resolve the native collection handle to the corresponding preselected
  catalogue tab.

## Decision

Native Shopify collections classify and supply the products. The storefront
does not use the generic `/collections/<handle>` pages for the Nenúfar product
browsing experience.

## Files modified

- `app/components/NenufarStory.tsx`
- `app/routes/catalogo.tsx`
- `app/components/NenufarCatalogue.tsx`
- `docs/architecture/ADR-2026-09-10-shopify-seasonal-collections.md`
- `docs/changes/2026-09-10-route-home-collections-through-catalogue.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

All commands completed successfully.

## Rollback

Revert this commit to send home cards back to the generic Shopify collection
pages.
