# Configure the production checkout domain

## Objective

Make Shopify checkout use the merchant-configured `checkout.nenufar.mx` domain from the production Hydrogen storefront.

## Scope

- Added `PUBLIC_CHECKOUT_DOMAIN=checkout.nenufar.mx` to the `production` Oxygen environment of `Nenúfar Web Production`.
- Preserved the existing production environment-variable set by exporting it before adding the single new value.
- The cart drawer continues to use Shopify's unmodified `cart.checkoutUrl`; no URL rewriting is introduced in the storefront.

## Decisions

Shopify remains the authority for checkout URLs and sessions. The custom checkout domain is environment configuration, not browser-side routing logic.

## Validation

- Confirmed the target Hydrogen environment is `Production` (handle: `production`) for `nenufar.mx`.
- Confirmed the Oxygen environment-variable update completed successfully.

## Risks and rollback

The Shopify domain must remain correctly configured and verified. To roll back, remove `PUBLIC_CHECKOUT_DOMAIN` from the `production` Oxygen environment and redeploy; the cart implementation itself is unchanged.
