# Promote FAQ grouping to Oxygen Production

## Objective

Publish the approved FAQ grouping storefront code to the production Oxygen environment so production FAQ entries render on the Hydrogen storefront.

## Scope

- Deployed production worktree revision `da696f9` to Oxygen `production` with the approved `--force` promotion.
- No schema, content, domain, or checkout configuration was changed by this deployment.

## Validation

- Hydrogen build completed successfully during deployment.
- Oxygen confirmed the deployment was routable at `https://01m27kjba793cx1e0vpqqztp4m-daa5878a4a43b7d93a09.myshopify.dev`.
- The production Storefront API contains the new FAQ entry and its `Paquetes de esferas de acrílico` group reference.

## Rollback

Redeploy the previous approved production storefront revision through Oxygen.
