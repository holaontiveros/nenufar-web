# Record the production metaobject authority blocker

## Objective

Apply the approved production-specific metaobject identifiers and determine whether the transfer-store schema bootstrap can continue through the authenticated Shopify CLI application.

## Scope

- Recorded the approved `nenufar_*` production type identifiers in an ADR.
- Attempted to create only the three empty approved metaobject definitions in the transfer store.
- Did not create any definitions, entries, products, values, media, or demo content because Shopify denied all three mutations.

## Result

Shopify returned `NOT_AUTHORIZED` for each unique type, stating it is reserved for another application. This proves the earlier failure is an application-ownership limitation of the authenticated CLI application, not a collision with the legacy type names.

## Files modified

- `docs/architecture/ADR-2026-09-10-production-metaobject-identifiers.md`
- `docs/plans/production-store-bootstrap.md`
- `docs/changes/2026-09-10-record-production-metaobject-authority-blocker.md`

## Validation

- Each Admin GraphQL mutation was accepted by the API and returned the expected `NOT_AUTHORIZED` user error without creating a definition.
- Inspected the available in-app browser state; no authenticated Shopify Admin tab is available for merchant-side creation.
- `git diff --check`

## Remaining risks

- The production FAQ and structured-product schemas cannot be completed until the merchant creates these types in Shopify Admin or authorizes the app that owns their creation.

## Rollback

This chunk changes documentation only; no Shopify resource was created.
