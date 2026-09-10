# Dedicated catalogue page

## Objective

Reduce homepage length by moving the live Nenúfar product catalogue into its own page.

## Scope

- Added `/catalogo` with the existing live Shopify product query, catalogue tabs, search, technique filters, cards, and product links.
- Removed catalogue data loading and the full product grid from `/`.
- Updated header, footer, hero, collection, and custom-order links to route users appropriately.

## Decisions

- This is a route and presentation change only. Storefront API product data, personalization, cart, and checkout remain unchanged.
- The homepage retains seasonal collections as a lightweight discovery path; the complete purchasable catalogue is at `/catalogo`.

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- Local `npm run dev` checks: `/` returned 200 without the catalogue heading; `/catalogo` returned 200 with the live catalogue heading, filters, and product handle.

## Risks

- Links to a seasonal collection currently open the full catalogue; future work can carry the selected catalogue filter through the URL.
- Existing Hydrogen warnings remain non-blocking.

## Rollback

Revert this commit to restore the catalogue onto the homepage and remove `/catalogo`.
