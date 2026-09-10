# Hydrogen commerce core

## Objective

Move the product catalogue, personalization data, and cart line handling to Hydrogen's server-aware commerce runtime.

## Scope

- Replaced the starter homepage with a server-rendered Nenúfar product catalogue.
- Added product metafield queries for catalogue name, technique, and lead time.
- Added product-level customization input driven by the existing `custom.allow_custom_text` and `custom.custom_text_placeholder` metafields.
- Sends the personalization value as a cart line attribute and displays cart line attributes in the cart.

## Decisions

- The existing Hydrogen cart route and Cart API mutations remain the single cart implementation.
- Per the owner decision, the root Vite project will be replaced at cutover instead of retained as a fallback.

## Files changed

- `hydrogen/app/routes/_index.tsx`
- `hydrogen/app/routes/products.$handle.tsx`
- `hydrogen/app/components/ProductForm.tsx`
- `hydrogen/app/components/CartLineItem.tsx`
- `hydrogen/app/components/ProductItem.tsx`
- `hydrogen/storefrontapi.generated.d.ts`
- `docs/architecture/ADR-2026-09-10-hydrogen-migration.md`
- `AGENTS.md`

## Validation

- `npm run codegen` — correct.
- `npm run typecheck` — correct.
- `npm run build` — correct.
- Linked development server returned HTTP 200 for the catalogue and a personalized product route.
- The verified product route rendered its real store image, variants, price, and the metafield-driven customization field.

## Risks pending

- The visual landing-page parity migration is not complete.
- Shopify CLI emits upstream React Router and bundle-analyzer warnings during validation; the build exits successfully.
- The dev store must contain published products and the documented metafield definitions to exercise the catalogue and personalization UI with real data.

## Rollback

Revert this commit. The Hydrogen starter's generic catalogue and cart behavior remain available.
