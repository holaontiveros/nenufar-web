# Rebuild the product-page hero and commerce summary

## Objective

Bring the first product-page section closer to the approved Nenúfar references while retaining the live Storefront Cart API and real Shopify checkout flow.

## Scope

- Added real material, technique, badge, and lead-time fields to the product query.
- Reworked the product media, title, commercial price/availability panel, description, variant controls, cart action, WhatsApp action, and assurances into the Nenúfar visual language.
- Preserved the current basic personalization input for `custom.allow_custom_text = true` products.
- Kept the `false` state free of customization controls for the dev-only blank product.

## Decisions

The detailed configurable personalization controls, tabs, related products, media gallery thumbnails, and direct-checkout behavior remain separate approved roadmap chunks. This change preserves the existing add-to-cart behavior rather than introducing a new checkout flow.

## Modified files

- `app/routes/products.$handle.tsx`
- `app/components/ProductForm.tsx`
- `app/styles/app.css`
- `storefrontapi.generated.d.ts`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm test`
- `git diff --check`

All completed successfully.

## Remaining risks

The new dev-only non-personalized product has no media, so the visual media state still needs merchant-owned media before it can match the reference gallery. Full visual inspection requires an Oxygen preview deployment.

## Rollback

Revert this commit to restore the prior product-page layout and query. Shopify product data and cart state are unaffected.
