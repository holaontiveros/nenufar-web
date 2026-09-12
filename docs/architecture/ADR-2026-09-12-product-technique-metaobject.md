# ADR: Model product techniques as reusable metaobjects

- Status: Approved
- Date: 2026-09-12

## Context

`custom.technique` was a scalar product metafield used for catalogue filtering and product presentation. Technique names are reusable across products, and the store has almost no current data to preserve.

## Decision

Use `custom.technique` as a single reference to the merchant-managed, public `nenufar_technique` metaobject type. The type has one required `name` field. The storefront reads that field for all current technique labels and filters.

## Alternatives considered

1. Retain the scalar text metafield. This duplicates a technique name across products and cannot carry reusable technique data later.
2. Reuse `nenufar_compatible_technique`. Its name represents a product's optional compatible-techniques relationship rather than its primary technique.
3. Create the dedicated `nenufar_technique` type. This gives the primary product technique an unambiguous reusable model and leaves compatible techniques semantically separate.

## Impact and migration

No scalar-value migration or fallback is retained. Create the public `nenufar_technique` definition and entries in Shopify Admin, then assign one entry to each product's `custom.technique` reference. The storefront hides technique UI and excludes unset products from technique filters until assignment.

## Risks and rollback

Until entries are assigned, affected products have no technique label or catalogue technique-filter value. To roll back, restore the scalar `custom.technique` definition and revert the storefront commit; no production data migration is required.
