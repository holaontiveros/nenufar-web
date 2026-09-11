# Bootstrap independent production-store custom-data schemas

## Objective

Begin preparing the client-transfer Shopify store for Nenúfar production use without copying development/demo products, values, entries, media, IDs, credentials, or deployment resources.

## Scope

- Authenticated Shopify CLI separately to `nenufar-regalos-personalizados-xyrqi3rj.myshopify.com`.
- Audited the target shop and confirmed it had no Product, Collection, Shop, or metaobject custom-data definitions.
- Created and read back these empty, public Storefront-readable definitions:
  - Fourteen Product `custom` fields: `technique`, `materials`, `lead_time`, `badge`, `is_popular`, `allow_custom_text`, `custom_text_placeholder`, `material_label`, `dimensions`, `weight`, `package_includes`, `shipping_details`, `packaging_details`, and `care_guide`.
  - Collection `custom.show_on_home`.
  - Shop `contact.whatsapp_number`.
- Did not create products, collections, values, metaobject entries, media, or demo content.

## Blocker

Shopify rejected creation of the approved merchant-facing `faq_item`, `product_personalization`, and `product_process_step` metaobject definitions with `NOT_AUTHORIZED`: their types are reserved for another application. As a result, the `custom.making_process` and `custom.personalization_config` Product reference definitions were intentionally not created.

## Validation

- Read the target shop identity and all existing custom-data definitions before mutation.
- Every independent `metafieldDefinitionCreate` returned no user errors.
- Read back all sixteen created definitions and confirmed their expected types and `PUBLIC_READ` Storefront access.
- `git diff --check`

## Remaining risks

- The metaobject ownership conflict must be resolved before personalized-product configuration and Shopify-backed FAQs can be set up.
- Production Storefront API token, Hydrogen/Oxygen environment, real products, content, payment, shipping, tax, and policy configuration remain intentionally out of scope for this schema-only chunk.

## Rollback

If this incomplete bootstrap must be undone, remove only the sixteen empty definitions listed above after confirming no merchant values depend on them. Do not delete products, orders, files, content, or unrelated store settings.
