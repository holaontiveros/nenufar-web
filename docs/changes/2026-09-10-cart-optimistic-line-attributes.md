# Cart optimistic line rendering

## Objective

Prevent the cart from failing with a 500 error immediately after a product is added.

## Scope

Make the cart line-item display tolerate optimistic Shopify cart data that does
not yet include option selections or custom attributes.

## Decisions

- Keep the existing Storefront Cart API and optimistic-cart behavior.
- Treat `selectedOptions` and `attributes` as empty lists until Shopify returns
  their full values. This is a presentation safeguard only; it does not change
  cart payloads or persistence.

## Files modified

- `app/components/CartLineItem.tsx`
- `docs/changes/2026-09-10-cart-optimistic-line-attributes.md`

## Validation

- `npm run typecheck`
- `npm run build`

Both commands completed successfully. A local browser interaction could not be
run because the in-app browser cannot connect to this environment's localhost
listener; deployment preview verification remains pending.

## Remaining risks

The deployed storefront must be checked with a live add-to-cart action. Other
optional fields supplied by a future cart customization should receive the same
defensive treatment where they are rendered.

## Rollback

Revert the commit for this change. The previous strict list rendering will be
restored.
