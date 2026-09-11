# Plan the production-store bootstrap

## Objective

Define the safe, no-demo sequence for preparing the client-transfer Shopify store as Nenúfar’s future production commerce source.

## Scope

- Added a staged production-store bootstrap plan.
- Identified the exact custom-data schemas, real-content steps, and future Hydrogen/Oxygen boundary work.
- Explicitly excluded development/demo products, values, media, tokens, IDs, and deployment resources.

## Decisions

- Reuse the already approved merchant-owned data model; no new storefront architecture or data model is introduced.
- The first production mutation will create only missing schemas after a read-only audit of the named transfer store.

## Files modified

- `docs/plans/production-store-bootstrap.md`
- `docs/shopify/store-readiness-runbook.md`
- `docs/changes/2026-09-10-plan-production-store-bootstrap.md`

## Validation

- Reviewed the current approved metafield, metaobject, contact, and store-readiness documentation.
- `git diff --check`

## Remaining risks

- The target transfer-store domain, its existing schemas, and its production contact number have not yet been provided or audited.

## Rollback

Revert this documentation-only commit. No Shopify store data or environment configuration was changed.
