# Create product-page data foundation in the development store

## Objective

Create the approved Shopify custom-data foundation for the future single-product page and seed one complete personalized reference product.

## Scope

- Created public merchant-managed `product_personalization` and `product_process_step` metaobject definitions.
- Created public Product metafield definitions for material label, dimensions, weight, package contents, workshop process, shipping details, packaging details, care guide, and personalization configuration.
- Constrained the two reference metafields to their respective metaobject definitions.
- Seeded the personalized `termo-slim-pastel-madre` development product, its personalization configuration, and three workshop process entries.
- Verified the product's direct data and nested references through the public Storefront API.
- Updated product-page and store-readiness documentation to reflect the actual development baseline.

## Decisions

This implements the approved model in `docs/architecture/ADR-2026-09-10-product-page-content-model.md`. All active development products currently permit personalization, so this chunk intentionally does not arbitrarily convert one into a non-personalized example.

## Modified files

- `docs/shopify/product-page-data.md`
- `docs/plans/product-page-roadmap.md`
- `docs/shopify/store-readiness-runbook.md`

## Validation

- Validated Admin GraphQL operations for definitions, metaobject upserts, and metafield writes.
- Each mutation returned no Shopify user errors.
- Verified the seeded product and metaobject references through the public development Storefront API.
- `git diff --check`

## Remaining risks

The current storefront does not query or render this new data yet. A non-personalized representative product still needs an explicit product choice or approval to create a dev-only blank product.

## Rollback

The future storefront can simply omit these fields until needed. To remove the development seed, delete its metafield values and metaobject entries manually; avoid deleting definitions while other products may reference them.
