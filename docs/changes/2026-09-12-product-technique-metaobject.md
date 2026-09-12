# Read reusable product technique metaobjects

## Objective

Replace scalar product technique reads with a reusable `nenufar_technique` metaobject reference.

## Scope

- Read `name` from the `custom.technique` reference in the catalogue and product page.
- Preserve the existing catalogue technique filter and product technique presentation.
- Document the required Shopify definition and direct-cutover behavior.

## Decisions

- Use the approved `nenufar_technique` type and required `name` field.
- Do not retain a scalar fallback or migrate the nearly empty existing dataset.

## Files modified

- `app/routes/catalogo.tsx`
- `app/routes/products.$handle.tsx`
- `docs/architecture/ADR-2026-09-12-product-technique-metaobject.md`
- `docs/shopify/metafields.md`
- `docs/shopify/product-page-data.md`
- `docs/shopify/store-readiness-runbook.md`
- `docs/changes/2026-09-12-product-technique-metaobject.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Remaining risks

- The `nenufar_technique` definition, Storefront access, entries, and product assignments must be created in Shopify Admin before labels and filters can show values.

## Rollback

Restore the scalar Shopify definition and revert this commit to return to scalar technique reads.
