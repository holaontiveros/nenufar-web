# Dynamic catalog collections

## Objective

Make `/catalogo` derive its products and collection filters from Shopify instead of a hardcoded seasonal handle list.

## Scope

- Removed the seasonal collection allowlist from `app/routes/catalogo.tsx`.
- Deduplicated products by Shopify ID while preserving all collection memberships.
- Updated `NenufarCatalogue` filtering and counts to use every assigned collection.
- Added the approved architecture decision and documented cache behavior.

## Validation

Pending: codegen, typecheck, build, and production deployment.

## Risks

Every collection returned by Shopify can now contribute products to `/catalogo`; collections used only for internal classification should not contain products intended to stay hidden.

## Rollback

Revert the commit to restore the previous seasonal allowlist.
