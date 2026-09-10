# Oxygen preview: cart drawer visual parity

## Objective

Publish the committed cart-drawer visual-parity chunk to an isolated Shopify Oxygen preview for review.

## Scope

- Deployed commit `0c99765` (`feat: restore cart drawer visual parity`) as an Oxygen preview.
- No source, Shopify store data, or environment configuration was changed during deployment.

## Decisions

- Used a preview deployment rather than changing the live production deployment.

## Deployment

- Preview URL: `https://01m265tenr1cd3xk7eesjfpj1m-42bfcbde2d0eb600cbe0.myshopify.dev`
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Files modified

- `docs/changes/2026-09-10-oxygen-preview-cart-drawer.md`

## Validation

- Oxygen build and routability verification completed successfully as part of deployment.
- The Shopify Hydrogen skill's standalone validator was attempted but could not load its own `typescript` dependency from the installed plugin cache. This did not affect the storefront build or Oxygen deployment.

## Remaining risks

- Visual and cart-interaction review on the preview is still required.

## Rollback

The preview is isolated and does not alter the live storefront. A subsequent preview deployment replaces it for testing purposes.
