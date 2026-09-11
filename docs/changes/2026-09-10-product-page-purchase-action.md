# Simplify the product-page purchase action

## Objective

Keep the single-product purchase path focused on adding the selected variant to the Shopify cart.

## Scope

- Removed the WhatsApp action from the single-product page only.
- Kept all global WhatsApp actions, including the header, homepage, and floating contact action, unchanged.
- Explicitly sized the product cart form to the full width of its product column so the primary Add to Cart button fills that space.

## Decisions

- Customers add a product to the cart before contacting the workshop from the product view; no checkout, cart, or contact-data behavior changes.

## Files modified

- `app/routes/products.$handle.tsx`
- `app/styles/app.css`
- `docs/changes/2026-09-10-product-page-purchase-action.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `git diff --check`

## Rollback

Revert this commit to restore the product-page WhatsApp action and its previous product-form sizing.
