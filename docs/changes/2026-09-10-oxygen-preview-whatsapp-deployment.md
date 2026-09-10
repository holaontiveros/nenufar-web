# Oxygen preview deployment: WhatsApp contact update

## Objective

Publish the committed WhatsApp contact configuration to the development storefront's Oxygen Preview environment.

## Scope

- Deployed Git commit `d493f39` to Oxygen Preview.
- No production environment or final-store configuration was changed.

## Deployment

- Preview URL: https://01m25zsamx9tw8rm1th89rfcrq-42bfcbde2d0eb600cbe0.myshopify.dev
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Validation

Shopify CLI successfully built, uploaded, completed, and verified the deployment as routable.

## Risks

The Preview environment remains protected by Shopify account access and its URL may change on subsequent deployments.

## Rollback

Roll back in Oxygen or deploy a prior Git commit to a new Preview deployment.
