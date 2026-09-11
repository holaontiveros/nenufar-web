# Redeploy after WhatsApp cache restoration

## Objective

Bust the previous Oxygen cache after restoring long-lived caching for the WhatsApp contact query.

## Scope

- Promoted revision `c6f38c0` to Oxygen Production.
- No Shopify schema or content changes.

## Validation

- Hydrogen build completed successfully during deployment.
- Oxygen confirmed the deployment was routable at `https://01m28b0y19rpk3xztxjxfvrcj3-daa5878a4a43b7d93a09.myshopify.dev`.

## Rollback

Redeploy the previous approved production storefront revision.
