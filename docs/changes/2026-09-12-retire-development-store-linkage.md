# Retire development-store linkage

## Objective

Remove `nenu-from-react.myshopify.com` from the main repository's active local
configuration before that development store is deleted.

## Scope

- Removed the ignored local environment file containing development-store
  configuration and credentials.
- Removed the ignored Shopify project link for the development Hydrogen
  storefront.
- Changed the committed environment template to the production store and made
  the checkout-domain override empty by default.
- Superseded the separate-worktree production-linkage ADR and recorded the
  approved main-repository production linkage.

## Decisions

- `/Users/javo/projects/nenufar-web` and its `main` branch are the production
  deployment path.
- The existing `Nenúfar Web Production` storefront is the intended Shopify CLI
  target for this checkout.
- Historical documentation is retained as an audit record; it is not runtime
  configuration.

## Files modified

- `.env.example`
- `docs/architecture/ADR-2026-09-10-isolated-production-hydrogen-boundary.md`
- `docs/architecture/ADR-2026-09-12-main-repository-production-linkage.md`
- `docs/changes/2026-09-12-retire-development-store-linkage.md`

## Validation

- Confirmed the checkout is on `main`.
- Confirmed the separate production worktree links to
  `nenufar-regalos-personalizados-xyrqi3rj.myshopify.com` and `Nenúfar Web
  Production`.
- Attempted `shopify hydrogen link` for the production storefront; Shopify CLI
  rejected it because this machine has no authenticated Shopify session.
- `npm run typecheck` and `npm run build` remain required after the local
  Shopify authentication and production-link operation complete.

## Risks pending

- This checkout has no Shopify project link until an authenticated user links
  it to the existing production storefront.
- Oxygen environment values must be verified as production-only before the
  next deployment.

## Rollback

Restore the ignored local configuration only from a secure, production-only
source and relink with Shopify CLI. Do not restore development credentials or
the retired storefront link.
