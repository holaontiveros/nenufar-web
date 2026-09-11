# ADR: Reusable product-detail MetaObjects and compatible techniques

Status: Proposed — awaiting approval

## Context

Shipping details, packaging details, and care guidance are currently multiline Product metafields. They are difficult to reuse consistently across products. The product page also needs to tell buyers which personalization techniques and machines are compatible with a product. Several existing multiline fields are being edited as plain text even though the UI needs paragraphs and lists.

## Decision requested

Use four merchant-managed, public Storefront API MetaObject definitions:

1. `nenufar_shipping_detail`
2. `nenufar_packaging_detail`
3. `nenufar_care_guide`
4. `nenufar_compatible_technique`

Attach ordered lists of constrained references to Products through `custom.shipping_details`, `custom.packaging_details`, `custom.care_guide`, and `custom.compatible_techniques`. Use rich-text fields for all multiline content identified in the implementation plan.

## Rationale

This gives merchants reusable records, preserves per-product ordering, keeps Storefront API queries explicit, and avoids duplicating long copy. Separate detail types make the Shopify Admin editing experience self-describing and prevent accidentally assigning care copy to a shipping section. A dedicated technique type allows a technique and its supported machines to be shared by many products.

## Alternatives considered

- Keep multiline Product text: lowest migration cost, but duplicates shared copy and cannot model technique/machine data.
- Use one generic detail MetaObject with a category field: fewer definitions, but weaker Admin semantics and easier cross-section misassignment.
- Hardcode techniques in the storefront: no merchant control and cannot represent product-specific compatibility.

## Impact and migration cost

Shopify definitions and existing values must be migrated before the storefront reader changes. The product query and detail components must switch from `.value` text to reference nodes and rich-text rendering. Existing demo values can be converted into entries; production products will need merchant-reviewed records. No checkout, cart, or payment behavior changes.

## Risks and rollback

Reference lists can be empty during migration, and rich-text conversion can expose formatting differences. The UI must hide empty sections and the migration must retain an export of current values. Rollback is to restore the prior Product text definitions/values and revert the storefront reader commit; do not delete old Shopify definitions until verification is complete.

## Approval

Do not execute this ADR until the owner explicitly approves the proposed schema and migration order.
