# Oxygen preview: home collection links

## Objective

Deploy the home collection-link fix for user testing.

## Scope

Publish commit `58d4d1f` to a Shopify Oxygen preview environment.

## Deployment

- Preview URL: https://01m2642cqk5wkqqx2sne16yt1q-42bfcbde2d0eb600cbe0.myshopify.dev
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Validation

- Oxygen completed its build, upload, deployment, and routing checks.

## Rollback

Deploy the prior preview or revert commit `58d4d1f` and deploy again.
