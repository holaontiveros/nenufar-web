# Create production metaobject definitions

## Objective

Complete the merchant-owned metaobject portion of the production transfer-store schema bootstrap without adding demo content.

## Scope

- Used an authenticated Shopify Admin session for `nenufar-regalos-personalizados-xyrqi3rj.myshopify.com` after the CLI app was denied authority to create merchant-owned definitions.
- Created public, empty metaobject definitions:
  - `nenufar_faq_item`: required `question` (single-line text) and `answer` (multi-line text).
  - `nenufar_product_process_step`: required `title` (single-line text), `body` (multi-line text), and `position` (integer).
  - `nenufar_product_personalization`: required `text_label`, `text_placeholder`, `character_limit`, and `artisan_note_enabled`; optional `font_options`, `motif_options`, `preview_copy`, `artisan_note_label`, and `artisan_note_placeholder`, using the types in the approved product-page data model.
- Kept Storefront API access enabled for all three definitions.
- Added no metaobject entries, product values, demo products, media, or files.

## Decisions

The approved `nenufar_*` type identifiers are merchant-owned production types. The existing development-store runtime remains unchanged until a separately planned production cutover aligns its queries and reference types.

## Files modified

- `docs/plans/production-store-bootstrap.md`
- `docs/architecture/ADR-2026-09-10-production-metaobject-identifiers.md`
- `docs/changes/2026-09-10-create-production-metaobjects.md`

## Validation

- Shopify Admin displayed each saved definition, its type identifier, field types, required-field state, and enabled Storefront API access.
- A read-only Admin GraphQL query through the current CLI app returned no merchant-owned metaobject definitions, consistent with the known app-ownership limitation. It is not a negative verification of the Admin-created resources.
- `git diff --check`

## Remaining risks

- Create the two constrained Product reference metafields before entering structured product data.
- A future production Hydrogen/Oxygen cutover must query the `nenufar_*` types without changing the current development storefront.

## Rollback

Before entries or Product references exist, remove only the three named empty definitions in Shopify Admin. Do not remove the independently created Product, Collection, or Shop definitions.
