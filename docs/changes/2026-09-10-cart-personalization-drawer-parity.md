# Cart personalization drawer parity

## Objective

Bring the live Hydrogen cart drawer closer to the approved Vite reference while omitting delivery notes and keeping personalization conditional on the product configuration.

## Scope

- Added product tags and `custom.allow_custom_text` to the existing cart-line query.
- Rebuilt cart-line layout around the reference: seasonal label, aligned quantity and price, upper-corner removal action, and a personalization row.
- Shows and edits the existing `Personalización` cart-line attribute only for products whose `custom.allow_custom_text` metafield is `true`.
- Omitted the delivery-notes field.
- Retained quantity updates, removal, Shopify checkout, and full-cart-page discount/gift-card controls.

## Decisions

- Reused the approved product metafield and cart-line attribute model; no new metafields, metadata, or persistence mechanisms were introduced.
- Seasonal labels are derived from the same Shopify product tags that power the seasonal automatic collections.
- The drawer omits discount and gift-card controls for visual parity; they remain available on `/cart`.

## Files modified

- `app/components/CartLineItem.tsx`
- `app/components/CartSummary.tsx`
- `app/lib/fragments.ts`
- `app/styles/app.css`
- `storefrontapi.generated.d.ts`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

All commands completed successfully. Build output contains the existing `envFile`, React Router future-flag, and Hydrogen bundle-analyzer warnings.

## Remaining risks

- The refined drawer needs visual and interaction review on a new Oxygen preview.
- Products without the configured metafield definition/value will not show the personalization row, by design.

## Rollback

Revert this chunk’s commit to restore the previous cart-drawer presentation. Shopify cart contents, existing personalization attributes, and checkout sessions are unaffected.
