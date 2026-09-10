# Oxygen preview: cart add fix

## Objective

Publish the optimistic cart seasonal-label fix to an isolated Oxygen preview for user verification.

## Scope

- Deployed commit `2029179` (`fix: guard optimistic cart seasonal label`) to Oxygen preview.
- No Shopify store data, credentials, or environment configuration changed.

## Decisions

- Used a preview deployment only; production remains unchanged.

## Deployment

- Preview URL: `https://01m266xpm59gq4ztj6at7swyqk-42bfcbde2d0eb600cbe0.myshopify.dev`
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Files modified

- `docs/changes/2026-09-10-oxygen-preview-cart-add-fix.md`

## Validation

- Oxygen completed its production build, deployment, and routability verification successfully.
- The installed Shopify Hydrogen skill validator was attempted but cannot resolve its own `typescript` dependency from the plugin cache. This does not affect the successful Hydrogen build or Oxygen deployment.

## Remaining risks

- Add-to-cart must be confirmed in the authenticated preview session.

## Rollback

This is an isolated preview and has no production impact. A later preview supersedes it for review.
