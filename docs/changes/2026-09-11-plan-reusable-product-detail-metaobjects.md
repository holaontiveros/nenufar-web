# Plan reusable product-detail MetaObjects

## Objective

Document the proposed Shopify schema change before execution: reusable MetaObjects for shipping, packaging, care, and compatible personalization techniques, plus rich-text conversion for multiline content.

## Scope

Planning and architecture documentation only. No Shopify definitions, values, product data, queries, or UI were changed.

## Decisions pending approval

- Four merchant-managed `nenufar_*` MetaObject types.
- Ordered Product reference lists for shipping, packaging, care, and compatible techniques.
- Rich-text conversion for all current multiline product/content fields.
- A four-chunk execution order: schema, data migration, storefront rendering, then validation/cleanup.

See `docs/plans/2026-09-11-product-detail-metaobject-migration.md` and `docs/architecture/ADR-2026-09-11-reusable-product-detail-metaobjects.md`.

## Files modified

- `docs/plans/2026-09-11-product-detail-metaobject-migration.md`
- `docs/architecture/ADR-2026-09-11-reusable-product-detail-metaobjects.md`
- `docs/changes/2026-09-11-plan-reusable-product-detail-metaobjects.md`

## Validation

- Reviewed the existing product metafield and MetaObject documentation.
- Inspected the current product route's fields and rendering inputs.
- No runtime or Shopify changes were executed.

## Risks and rollback

This planning chunk has no runtime or store-data risk. Delete/revert the three documentation files if the proposed schema is rejected. Execution remains blocked until architecture approval.
