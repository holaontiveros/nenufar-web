# Oxygen preview: native collection catalogue

## Objective

Deploy the native collection-backed catalogue migration for validation.

## Scope

Publish commit `a1f0fc0` to a Shopify Oxygen preview environment.

## Deployment

- Preview URL: https://01m2658626kx2z6zwj9s1jsq64-42bfcbde2d0eb600cbe0.myshopify.dev
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Validation

- Oxygen completed build, upload, deployment, and routing checks.

## Remaining risks

Validate `/catalogo` in the preview: all five native collection tabs should
show their expected products and the technique/search filters should continue
to work.

## Rollback

Deploy the prior preview or revert commit `a1f0fc0` and deploy again.
