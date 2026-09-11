# ADR: Use Nenúfar-specific production metaobject identifiers

## Status

Approved and created in the transfer store.

## Context

The production transfer store rejected the legacy metaobject types `faq_item`, `product_personalization`, and `product_process_step` because Shopify reports each is reserved by another application. Product and Shop metafields are merchant-owned and were created successfully, but the two Product reference metafields require compatible metaobject definitions.

## Decision

Use these production metaobject type identifiers:

- `nenufar_faq_item`
- `nenufar_product_personalization`
- `nenufar_product_process_step`

Their fields, validations, public Storefront access, and intended UI behavior remain the already approved model. Only the type identifiers change. An authenticated merchant Admin session created the empty definitions on 2026-09-10. The FAQ Hydrogen query must be aligned in a future environment-cutover chunk after both development and production have compatible definitions; this decision does not alter the currently deployed development-store query.

## Alternatives considered

1. Keep the legacy identifiers and depend on the unknown owning application. This leaves production setup externally coupled and was rejected.
2. Create unvalidated generic reference fields. This would weaken the product data model and was rejected.
3. Use Nenúfar-specific identifiers with the same field model. This is approved because it avoids the known identifier collision while preserving the approved content structure.

## Consequences

- The definitions are merchant-owned. The current CLI app cannot read or manage them through Admin GraphQL, so an authenticated merchant Admin session remains the operational path for schema changes.
- `custom.making_process` and `custom.personalization_config` are constrained to the new definitions.
- A later, explicitly planned runtime alignment is required before the production storefront uses the new FAQ type.

## Rollback

Before values or references exist, remove only the new empty definitions and their dependent reference fields. The legacy development-store types and deployed storefront remain unchanged.
