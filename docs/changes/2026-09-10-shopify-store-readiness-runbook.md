# Add Shopify store-readiness and production migration runbook

## Objective

Document the full Shopify setup, verification, and production cutover work required to run Nenúfar Web beyond its development store.

## Scope

- Performed a read-only audit of the development store's Product metafield and metaobject definitions.
- Recorded confirmed, legacy, and planned custom-data resources.
- Consolidated storefront environment setup, commercial data, custom data, FAQ, WhatsApp, future product-page, deployment, acceptance, rollback, and production migration requirements.
- Explicitly documented that production must not reuse the development storefront linkage or credentials.

## Decisions

This is a documentation-only operational runbook. It introduces no new architecture and makes no Shopify-store or storefront code changes.

## Modified files

- `docs/shopify/store-readiness-runbook.md`

## Validation

- Validated the development-store custom-data audit query against the Shopify Admin API schema.
- Executed the query read-only against `nenu-from-react.myshopify.com`.
- `git diff --check`

## Remaining risks

The inventory documents definitions, not the completeness or correctness of every product value, collection, policy, payment setting, or uploaded asset. Those must be verified during target-store migration.

## Rollback

Revert this documentation commit. It has no runtime, credential, or Shopify-store effect.
