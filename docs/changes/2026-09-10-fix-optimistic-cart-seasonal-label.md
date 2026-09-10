# Fix optimistic cart seasonal label

## Objective

Fix the add-to-cart 500 introduced by the cart drawer's seasonal label.

## Scope

- Made the cart-line seasonal-label helper tolerate a missing product tag list.
- Preserved the seasonal label once Shopify's authoritative cart response provides product tags.

## Root cause

Hydrogen creates an optimistic cart line immediately after add-to-cart. That line contains the selected variant but does not include the additional product tags queried by the authoritative cart fragment. The seasonal-label helper called `tags.map(...)` unconditionally, causing `Cannot read properties of undefined (reading 'map')` while the optimistic line rendered.

## Decisions

- Treat missing tags as an empty list during optimistic rendering. This preserves instant cart feedback and uses the existing fallback label without altering the Shopify cart request or data model.

## Files modified

- `app/components/CartLineItem.tsx`

## Validation

- Reviewed the deployed preview path until Oxygen account selection blocked storefront interaction in this browser session.
- `npm run typecheck`
- `npm run build`
- `git diff --check`

All local validation commands completed successfully. The build output includes the existing dependency warnings about `envFile`, React Router future flags, and the Hydrogen bundle analyzer.

## Remaining risks

- The corrected add-to-cart flow needs verification in the next authenticated Oxygen preview.

## Rollback

Revert this commit to restore the previous helper behavior. No Shopify cart data or configuration is changed by this fix.
