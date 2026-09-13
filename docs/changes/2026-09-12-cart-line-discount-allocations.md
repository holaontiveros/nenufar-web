# Display Shopify line-discount savings in the cart drawer

## Objective

Show product-level Shopify discounts in the cart drawer using the same source
values visible at checkout.

## Scope

- Added the Storefront Cart API's `discountAllocations` to cart-line data.
- Merged line-level and cart-level allocations for drawer display.
- Rendered each allocation's API-provided title or code and
  `discountedAmount` as its own applied-saving row.
- Preserved discount-code application and removal for code allocations.

## Decisions

- No discount price is hardcoded, inferred from compare-at prices, or computed
  from cart totals. Each displayed saving is Shopify's individual
  `discountedAmount` value.
- Product automatic discounts, such as `PREVENTA_NAVIDEÑA`, are sourced from
  their cart line because Shopify does not necessarily expose them in the
  cart-level allocation list.
- The cart-line UI type was widened only around the optional allocation field so
  Hydrogen optimistic line updates remain compatible with the generated query
  type.

## Files modified

- `app/components/CartLineItem.tsx`
- `app/components/CartMain.tsx`
- `app/components/CartSummary.tsx`
- `app/lib/fragments.ts`
- `storefrontapi.generated.d.ts`
- `docs/changes/2026-09-12-cart-line-discount-allocations.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

The Hydrogen skill documentation search was unavailable because its network
fetch failed. Its standalone validator could not resolve its own `typescript`
dependency; repository code generation, strict typecheck, and production build
were used instead.

## Risks and rollback

- Verify this exact Shopify automatic discount in the live drawer after the
  deployment; it should show the API-provided `PREVENTA_NAVIDEÑA` allocation
  and MX$63.75 saving.
- Revert this chunk to remove line-level allocation display without changing
  Shopify product prices or discount rules.
