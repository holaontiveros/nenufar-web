# Audit production deployment readiness

## Objective

Confirm the production transfer store's primary domain and sales-channel publications before making any production storefront or deployment changes.

## Scope

- Renewed Shopify CLI authorization for the production transfer store with the existing `write_products` and `write_content` scopes plus the read-only `read_publications` scope, after explicit approval.
- Read the store identity, primary domain, and available publications.
- Did not create a Hydrogen storefront, Oxygen environment, token, product, collection, entry, or content value.

## Result

- Store: `Nenufar Regalos Personalizados`.
- Primary domain: `https://nenufar.mx`.
- Publications: `Online Store`, `Shop`, and `Point of Sale`.

## Files modified

- `docs/plans/production-store-bootstrap.md`
- `docs/changes/2026-09-10-audit-production-deployment-readiness.md`

## Validation

- `shopify store auth` completed for `nenufar-regalos-personalizados-xyrqi3rj.myshopify.com`.
- Read-only `shopify store execute` query returned the primary domain and all three publications.
- `git diff --check`

## Remaining risks

- The real production Hydrogen/Oxygen boundary still needs architecture approval and separate credentials; no development token or deployment may be reused.

## Rollback

No storefront or commerce data changed. If needed, revoke the added CLI authorization in Shopify Admin.
