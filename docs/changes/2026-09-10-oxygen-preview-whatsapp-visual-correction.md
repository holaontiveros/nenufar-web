# Oxygen preview deployment: WhatsApp visual correction

## Objective

Publish the corrected WhatsApp icon and green contact styling to Oxygen Preview.

## Scope

- Deployed Git commit `2c6582f` to the development store's Oxygen Preview environment.
- No production environment or store configuration changed.

## Deployment

- Preview URL: https://01m2614np4eskgfrxwtnj2nxq6-42bfcbde2d0eb600cbe0.myshopify.dev
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Validation

Shopify CLI completed build, upload, deployment, and routability verification successfully.

## Rollback

Roll back in Oxygen or deploy a prior Git commit to a new Preview deployment.
