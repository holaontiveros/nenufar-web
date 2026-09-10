# Create and publish a dev-only non-personalized product seed

## Objective

Provide a real Storefront API product that exercises the non-personalized product-page state without reclassifying existing development products.

## Scope

- Created `[DEV ONLY] Caja de Haya para Grabado` with handle `dev-caja-haya-blank-20260910`.
- Created a $14.00 test variant with SKU `DEV-BLANK-HAYA-001`.
- Populated current and product-page detail metafields, including `custom.allow_custom_text = false`.
- Deliberately omitted personalization configuration and workshop-process references.
- Published only to the `Nenúfar Web Dev` storefront publication and verified public Storefront API availability.

## Decisions

The product is explicitly development-only and must not migrate to production. It provides the approved non-personalized path while preserving every existing development product's personalization state.

## Modified files

- `docs/shopify/product-page-data.md`
- `docs/plans/product-page-roadmap.md`
- `docs/shopify/store-readiness-runbook.md`

## Validation

- Validated Shopify Admin operations for product creation, variant update, and publication.
- All successful mutations returned no user errors.
- Verified the product, price, availability, and `allow_custom_text = false` through the public Storefront API.
- `git diff --check`

## Remaining risks

The product has no media and is only a data/behavior seed. Production requires merchant-owned products, media, and verified commercial values.

## Rollback

Unpublish or archive the exact dev-only product. Do not alter existing products or shared custom-data definitions.
