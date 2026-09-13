# Use the Nenúfar catalog experience for individual collections

## Objective

Give `/collections/:handle` routes the same Nenúfar catalog presentation as the all-products route without repeating the collection selector.

## Scope

- Add fixed-collection mode to `NenufarCatalogue`.
- Keep search and technique filters on collection pages.
- Hide the catalog tabs when a collection is already established by the URL.
- Replace the starter eight-product pagination with the same first-100-products catalog model used by the full catalog.
- Preserve collection analytics and canonical collection URLs.

## Decisions

This is the second chunk of the approved migration in `docs/architecture/ADR-2026-09-12-collections-all-catalog-migration.md`. The collection title and description become the catalog heading and supporting copy.

## Files modified

- `app/components/NenufarCatalogue.tsx`
- `app/routes/collections.$handle.tsx`
- `app/components/ProductItem.tsx` (removed unused starter component)

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

Collection pages now load up to 100 products instead of paginating at eight. Revert this commit to restore the starter collection layout and pagination.
