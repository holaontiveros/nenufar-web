# Oxygen preview deployment: Shopify CDN image fix

## Objective

Publish the CSP-safe Shopify CDN placeholder image migration to the development storefront Preview environment.

## Scope

- Deployed Git commit `bd2dd7b` to Oxygen Preview.
- No production environment or Shopify Files asset was modified during deployment.

## Deployment

- Preview URL: https://01m260e3jjwy394h72eadw303q-42bfcbde2d0eb600cbe0.myshopify.dev
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Validation

Shopify CLI completed the build, upload, deployment, and routability verification successfully.

## Rollback

Roll back in Oxygen or deploy a prior Git commit to a new Preview deployment.
