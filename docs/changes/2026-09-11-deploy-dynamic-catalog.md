# Deploy dynamic catalog

## Objective

Publish the Shopify-driven catalog collection behavior to Oxygen Production.

## Scope

- Promoted revision `87138da` to Oxygen `production`.
- Deployment busts the previous long-lived catalog cache.

## Validation

- Hydrogen build completed successfully during deployment.
- Oxygen confirmed the deployment was routable at `https://01m28pvhjn25beyw0ra1j70dqd-daa5878a4a43b7d93a09.myshopify.dev`.

## Rollback

Redeploy the previous approved production revision or revert the dynamic catalog commit.
