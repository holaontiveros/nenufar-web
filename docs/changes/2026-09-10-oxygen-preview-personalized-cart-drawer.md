# Oxygen preview: personalized cart drawer

## Objective

Publish the refined personalized cart drawer to an isolated Shopify Oxygen preview for validation.

## Scope

- Deployed commit `0acd063` (`feat: refine personalized cart drawer`) to Oxygen preview.
- No source, store data, or environment configuration changed during deployment.

## Decisions

- Used an isolated preview deployment and left production unchanged.

## Deployment

- Preview URL: `https://01m266f4ed8mxfw7d87dvph8nx-42bfcbde2d0eb600cbe0.myshopify.dev`
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Files modified

- `docs/changes/2026-09-10-oxygen-preview-personalized-cart-drawer.md`

## Validation

- Oxygen completed the production build, deployment, and routability verification successfully.
- The Shopify Hydrogen skill validator was attempted but could not resolve its own `typescript` dependency in the installed plugin cache. This did not affect the successful Oxygen deployment.

## Remaining risks

- Visual review and live personalization-edit testing on this preview remain required.

## Rollback

This is an isolated preview and has no production impact. A later preview deployment supersedes it for testing.
