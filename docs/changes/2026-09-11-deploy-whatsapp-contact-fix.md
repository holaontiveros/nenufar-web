# Deploy WhatsApp contact refresh

## Objective

Publish the fix that makes the global WhatsApp contact setting visible immediately after a Shopify Admin update.

## Scope

- Promoted revision `d45b1d5` to Oxygen Production.
- No Shopify schema or contact value changes were made during deployment.

## Validation

- Hydrogen build completed successfully during deployment.
- Oxygen confirmed the deployment was routable at `https://01m27m18w28xqcd8g6bf2zmf43-daa5878a4a43b7d93a09.myshopify.dev`.
- Production Storefront API returned the configured shop WhatsApp value.

## Rollback

Redeploy the previous approved production storefront revision through Oxygen.
