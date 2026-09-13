# Use the Nenúfar catalog experience at `/collections/all`

## Objective

Make Shopify's standard all-products route use the same Nenúfar catalog interface while preserving its filters.

## Scope

- Replace the generic, eight-product paginated `/collections/all` grid with the existing `NenufarCatalogue` presentation.
- Preserve catalog tabs, technique filters, text search, product deduplication, and Nenúfar catalog cards.
- Leave `/catalogo`, collection-specific routes, and existing links unchanged for their later migration chunks.

## Decisions

The approved URL migration and pagination tradeoff are recorded in `docs/architecture/ADR-2026-09-12-collections-all-catalog-migration.md`. The original complete catalog data-loading model is retained for functional parity; the Hydrogen starter cursor pagination is intentionally not retained in this route.

## Files modified

- `app/routes/collections.all.tsx`
- `app/components/ProductItem.tsx`
- `docs/architecture/ADR-2026-09-12-collections-all-catalog-migration.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

The all-products route has the same 100 collections by 100 products-per-collection limit as the current `/catalogo` implementation. Revert this commit to restore the default Hydrogen paginated all-products page.
