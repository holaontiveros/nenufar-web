# Oxygen preview deployment: dedicated catalogue

## Objective

Publish the streamlined homepage and dedicated `/catalogo` route to the development storefront Preview environment.

## Scope

- Deployed Git commit `db6c591` to Oxygen Preview.
- No production environment or store configuration changed.

## Deployment

- Preview URL: https://01m260s0e13161mmbf5r5rxdyg-42bfcbde2d0eb600cbe0.myshopify.dev
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Validation

Shopify CLI completed build, upload, deployment, and routability verification successfully.

## Rollback

Roll back in Oxygen or deploy a prior Git commit to a new Preview deployment.
