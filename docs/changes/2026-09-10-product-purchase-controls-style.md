# Align product purchase controls with the Nenúfar storefront

## Objective

Make the single-product option selectors and Add to Cart control visually consistent with the established Nenúfar catalogue, cart, and call-to-action styles.

## Scope

- Replace the product option controls’ generic/default treatment with the storefront’s rounded white selection cards and pink selected state.
- Preserve available, unavailable, selected, combined-listing, and keyboard-focus behavior.
- Style the Add to Cart control as the storefront’s pink-to-purple primary call to action and add the shared cart icon.
- Scope all new visual rules to the Nenúfar product page.

## Decisions

- This is a presentation-only change: Shopify variant selection, cart submission, quantity, and cart drawer behavior are unchanged.
- Option state is expressed with CSS classes rather than inline border and opacity styles, keeping the interaction state separate from its visual treatment.

## Files modified

- `app/components/AddToCartButton.tsx`
- `app/components/ProductForm.tsx`
- `app/styles/app.css`
- `docs/changes/2026-09-10-product-purchase-controls-style.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `git diff --check`

## Remaining risks

- The visual result should be reviewed with products that have multiple option values and swatches before production launch.

## Rollback

Revert this commit to restore the generic product option and cart-submit presentation without changing Shopify data or cart behavior.
