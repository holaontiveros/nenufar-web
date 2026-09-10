# Product-page quantity and subtotal

## Objective

Complete the product-page purchase controls with a quantity selector and an immediate subtotal, while retaining the approved Add to Cart-only flow.

## Scope

- Add accessible decrement and increment controls, with a minimum quantity of one.
- Calculate and display the selected-variant subtotal in the product form.
- Submit the selected quantity through the existing Shopify Cart API line-add request.
- Add regression coverage for subtotal calculation and invalid quantities.

## Decisions

- The direct “Buy now” action is intentionally omitted. The approved purchase action is Add to Cart, followed by the existing cart and checkout flow.
- The subtotal uses the selected variant's Storefront API price and the client-selected positive integer quantity.

## Files modified

- `app/components/ProductForm.tsx`
- `app/components/ProductForm.test.ts`
- `app/styles/app.css`

## Validation

- `npm run typecheck`
- `npm test`
- `npm run build`
- `git diff --check`

## Risks and rollback

- The subtotal is an indicative pre-checkout amount; Shopify remains the authority for final cart and checkout pricing.
- Revert this commit to restore fixed one-unit Add to Cart behavior.
