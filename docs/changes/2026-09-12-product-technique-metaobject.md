# Read reusable product technique metaobjects

## Objective

Replace scalar product technique reads with a reusable `nenufar_technique` metaobject reference.

## Scope

- Read `name` from the `custom.technique` reference in the catalogue and product page.
- Preserve the existing catalogue technique filter and product technique presentation.
- Document the required Shopify definition and direct-cutover behavior.

## Decisions

- Use the approved `nenufar_technique` type and its single-line `name` field.
- Do not retain a scalar fallback or migrate the existing dataset.
- Use the public Shopify definitions on `nenufar-regalos-personalizados-xyrqi3rj.myshopify.com` and remove the one retained scalar `custom.technique` value, which would otherwise continue to render as a single-line input in product Admin.

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
- Verified the public `nenufar_technique` definition and its single-line `name` field through Shopify Admin GraphQL.
- Verified `custom.technique` is a public `metaobject_reference` constrained to `nenufar_technique`, and that no legacy scalar values remain on products.

## Remaining risks

- Technique entries and product assignments still need to be created before labels and filters can show values.

## Rollback

Recreate a scalar Shopify definition and restore its values from a separate data export if returning to scalar technique reads is required.
