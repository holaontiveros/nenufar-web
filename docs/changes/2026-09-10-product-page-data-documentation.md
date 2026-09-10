# Document product-page data architecture and delivery roadmap

## Objective

Document the approved Shopify content model and the pending bite-sized work required to build the reference product-page experience.

## Scope

- Recorded the personalized/non-personalized product classification.
- Defined the proposed product metafields and reusable metaobject schemas.
- Defined cart-line attributes for customer personalization choices.
- Confirmed related products use native Shopify collection membership rather than a new collection-reference metafield.
- Listed implementation chunks and unresolved decisions.

## Decisions

The approved architecture is recorded in `docs/architecture/ADR-2026-09-10-product-page-content-model.md`. This is a documentation-only change: no Shopify definitions, entries, code, or storefront behavior were changed.

## Modified files

- `docs/architecture/ADR-2026-09-10-product-page-content-model.md`
- `docs/shopify/product-page-data.md`
- `docs/plans/product-page-roadmap.md`

## Validation

- Reviewed against the current product route and existing `docs/shopify/metafields.md`.
- `git diff --check`

## Remaining risks

The collection-selection rule, verified reviews source, availability wording, media-badge model, and direct-checkout behavior still require explicit decisions before their respective implementation chunks.

## Rollback

Revert this documentation commit. It has no runtime or Shopify-store effect.
