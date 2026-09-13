# Redirect `/catalogo` to `/collections/all`

## Objective

Complete the catalog URL migration by making `/collections/all` the canonical catalog route.

## Scope

- Return a permanent redirect from `/catalogo` to `/collections/all`.
- Preserve query parameters so legacy collection-filter links continue to work.
- Update hard-coded internal catalog links in the home page, cart, collection stories, product recommendations, and 404 page.
- Leave Shopify Admin navigation configuration unchanged; its catalog links must be updated by the merchant to `/collections/all`.

## Decisions

This completes the third chunk of `docs/architecture/ADR-2026-09-12-collections-all-catalog-migration.md`.

## Files modified

- `app/routes/catalogo.tsx`
- `app/routes/_index.tsx`
- `app/components/CartMain.tsx`
- `app/components/NenufarStory.tsx`
- `app/components/NotFoundPage.tsx`
- `app/routes/products.$handle.tsx`
- `docs/architecture/ADR-2026-09-12-collections-all-catalog-migration.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

The redirect changes the canonical catalog URL while preserving legacy entry points. Revert this commit to restore `/catalogo` as a directly rendered route.
