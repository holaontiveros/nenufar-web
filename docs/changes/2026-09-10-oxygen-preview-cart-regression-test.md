# Oxygen preview: cart regression test setup

## Objective

Publish the tested cart regression-protection update to an isolated Oxygen preview.

## Scope

- Deployed commit `7ead8dd` (`test: cover optimistic cart seasonal label`) to an Oxygen preview.
- No Shopify store data, runtime environment configuration, or production deployment changed.

## Decisions

- Used an isolated preview deployment for verification.

## Deployment

- Preview URL: `https://01m2677schf07k2mk3tf2b3hsj-42bfcbde2d0eb600cbe0.myshopify.dev`
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Files modified

- `docs/changes/2026-09-10-oxygen-preview-cart-regression-test.md`

## Validation

- Oxygen completed the production build, deployment, and routability verification successfully.
- `npm test`, typecheck, and build had passed before this deployment.
- The installed Shopify Hydrogen skill validator was attempted but cannot resolve its own `typescript` dependency from the plugin cache. This did not affect the successful deployment.

## Remaining risks

- The live add-to-cart interaction still requires user verification in the authenticated preview session.

## Rollback

The preview is isolated and has no production impact. A later preview deployment supersedes it for review.
