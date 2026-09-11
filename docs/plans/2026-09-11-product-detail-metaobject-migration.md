# Plan: reusable product-detail MetaObjects

Status: approved — schema definitions applied to the transfer production store; content migration and storefront consumption remain pending

## Objective

Replace product-specific shipping, packaging, and care text with reusable Shopify MetaObject references; add reusable compatible-technique records; and use rich-text fields for every multiline value in the current product-content model.

The existing product values are test data. They will not constrain the target schema and will be migrated or replaced after the definitions and storefront reader are ready.

## Proposed data model

All definitions are merchant-managed, public Storefront API readable, and use the production store's existing `nenufar_*` naming convention.

### Product reference fields (`custom` namespace)

| Key | Type | Purpose |
| --- | --- | --- |
| `shipping_details` | List of metaobject references to `nenufar_shipping_detail` | Reusable shipping/fabrication cards, in display order |
| `packaging_details` | List of metaobject references to `nenufar_packaging_detail` | Reusable packaging/protection cards, in display order |
| `care_guide` | List of metaobject references to `nenufar_care_guide` | Reusable care recommendations, in display order |
| `compatible_techniques` | List of metaobject references to `nenufar_compatible_technique` | Techniques and machines suitable for the product |

The existing keys remain the stable integration points, but their types change from multiline text to constrained reference lists. No generic/unconstrained references are planned.

### Reusable MetaObjects

Each definition has a required `title` (single-line text), a required `body` (rich text), and a required `position` (integer). The four definitions are:

- `nenufar_shipping_detail`
- `nenufar_packaging_detail`
- `nenufar_care_guide`

Compatible techniques use:

- `nenufar_compatible_technique`: required `name` (single-line text).

A record can be referenced by many products. The product reference-list order controls display order.

## Rich-text migration inventory

These current multiline fields should become Shopify `rich_text_field` values and be rendered as sanitized rich text by Hydrogen:

- Product `custom.materials`
- Product `custom.dimensions`
- `product_personalization.preview_copy`
- `product_process_step.body`
- `nenufar_faq_group.description`
- `nenufar_faq_item.answer`

All four MetaObject field replacements (`preview_copy`, process-step `body`, FAQ-group `description`, and FAQ-item `answer`) are now saved as Rich text in production. Replacing the fields removed the associated demo/test values; authored content migration and Hydrogen rich-text rendering remain separate chunks.
- New detail-object `body` fields and compatible-technique `name` fields

Existing one-line labels, booleans, integers, lists of short labels, and the product description remain their current types unless a later approved chunk changes them.

## Execution chunks

1. **Schema definitions:** create/update the four MetaObject definitions and the four constrained Product reference definitions; convert the listed multiline definitions to rich text. Read every definition back and record IDs/types. (The production store has the four reusable MetaObject definitions and all four Product references; `materials` and `dimensions` are rich text. Remaining MetaObject multiline conversions are a follow-up definition chunk.)
2. **Store data migration:** create reusable entries with `metaobjectUpsert`, convert existing test copy into rich-text JSON, and assign references with `metafieldsSet`. Keep a before/after export for rollback. Do not create production demo products.
3. **Storefront query and rendering:** update the Product query and detail components to read reference lists and Storefront rich-text values; add the compatible-techniques section; preserve empty-state behavior when a product has no records.
4. **Validation and cleanup:** verify the representative existing product, a non-personalized product, mobile layout, and Storefront API output. Only after the new reader is deployed should old text values/definitions be removed or left unused.

## Acceptance criteria

- One MetaObject entry can be assigned to multiple products.
- Shipping, packaging, care, and compatible-technique sections render in their assigned order.
- Rich text supports paragraphs, emphasis, and lists without displaying raw JSON or unsafe HTML.
- Products with no optional records do not show empty cards or broken tabs.
- The existing test product can be migrated without losing its content, but no test content is required for production.
- Definitions are reproducible and documented for both the development and transfer production stores.

## Risk, migration, and rollback

The primary risk is a type-incompatible Shopify definition update or a temporary empty section while references are migrated. The storefront chunk will tolerate absent references. Before changing definitions, export current values; if migration fails, restore the old values and revert the storefront commit. Do not delete old definitions until the new Storefront queries have been verified.

## Approval required

This changes Shopify's data model and the Storefront API contract. Approval is required for the proposed four MetaObject types, reference-list replacement of the three existing detail fields, and the rich-text conversion inventory before execution begins.
