# Add discount controls to the cart drawer

## Objective

Make the cart drawer the customer-facing place to apply, review, and remove
Shopify discount codes.

## Scope

- Added a Spanish discount-code input and apply action to the cart drawer.
- Show applicable code discounts with their total applied saving and a per-code
  removal action.
- Show automatic and custom Shopify cart discounts when they apply.
- Show a concise inline message for codes Shopify marks as unavailable.
- Extended the existing cart fragment with discount allocations and retained the
  existing Storefront Cart `DiscountCodesUpdate` action.

## Decisions

- The drawer is the intended cart experience; the implementation does not add
  navigation to `/cart`.
- Applied savings come from Shopify's cart-level discount allocations instead
  of deriving a discount from subtotal and total, which can also reflect tax,
  duty, or shipping changes.
- The discount action merges a trimmed submitted code with existing cart codes
  and de-duplicates them. Removing one code preserves all other cart codes.
- Automatic and custom discounts are visible but cannot be removed by the
  shopper because Shopify controls their eligibility.

## Files modified

- `app/components/CartSummary.tsx`
- `app/lib/fragments.ts`
- `app/routes/cart.tsx`
- `app/styles/app.css`
- `storefrontapi.generated.d.ts`
- `docs/changes/2026-09-12-cart-drawer-discounts.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `npm run lint` (completed with pre-existing project warnings; none reported
  for this chunk)
- `npm test` could not run the existing `ProductForm.test.ts`: Vitest cannot
  resolve the existing `~/components/Action` alias from `AddToCartButton.tsx`.
  The unrelated test configuration issue predates this change.
- `git diff --check`

The Hydrogen skill's documentation search was unavailable because its network
fetch failed. Its standalone validator could not resolve its own `typescript`
dependency; the repository's code generation, strict typecheck, production
build, and Biome lint were used instead.

## Risks and rollback

- The actual discount eligibility and final amount remain Shopify-controlled;
  test with a real eligible and ineligible code after deployment.
- Revert this chunk to remove the drawer controls without affecting Shopify
  discount definitions, cart data, or checkout.
