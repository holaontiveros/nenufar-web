# Add Search & Discovery complementary products

## Objective

Add a complementary-products section above the existing collection-based related-products section on individual product pages.

## Scope

- Query Shopify Storefront API product recommendations using `COMPLEMENTARY` intent.
- Render merchant-configured Search & Discovery recommendations above `.related-products`.
- Add responsive Nenúfar-styled complementary product cards.
- Document the Shopify Admin configuration workflow.

## Decisions

The product owner selected Shopify Search & Discovery as the source of truth. The approved architecture is recorded in `docs/architecture/ADR-2026-09-12-search-discovery-complementary-products.md`. The collection-based related-products section stays unchanged; no fallback list is used when Search & Discovery has no configuration.

## Files modified

- `app/routes/products.$handle.tsx`
- `app/styles/app.css`
- `storefrontapi.generated.d.ts`
- `docs/architecture/ADR-2026-09-12-search-discovery-complementary-products.md`
- `docs/shopify/product-page-data.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

`npm run lint` and the scoped Biome run complete with the repository's existing warning backlog; this chunk introduces no new product-route diagnostics. The Hydrogen skill validator is unavailable in this environment because its bundled script cannot resolve its `typescript` dependency.

## Risks and rollback

The section is only visible after a merchant configures complementary products in Search & Discovery and they are available to the storefront. Short caching can delay an Admin change briefly. Revert this commit to remove the section and query without affecting existing Search & Discovery configuration.
