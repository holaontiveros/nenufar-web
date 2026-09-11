# Product detail schema definitions

## Objective

Apply the approved reusable product-detail data model to the transfer production store before importing production content.

## Scope

- Created the public merchant-managed MetaObject definitions `nenufar_shipping_detail`, `nenufar_packaging_detail`, `nenufar_care_guide`, and `nenufar_compatible_technique`.
- Added constrained Product references for `custom.shipping_details`, `custom.packaging_details`, `custom.care_guide`, and `custom.compatible_techniques`.
- Replaced Product `custom.materials` and `custom.dimensions` with rich-text definitions.
- Deleted the old test values for the replaced Product definitions because the user confirmed they are disposable demo data.
- No production content migration and no storefront code changes were included.

## Decisions

- Detail records are reusable MetaObjects so one record can be assigned to many products.
- Detail reference fields are lists to preserve display order and allow more than one card per product.
- Compatible techniques are represented by a Product reference list; technique records carry explanatory copy and machine lists.
- Shopify-generated definition IDs remain store-specific; new stores must recreate the definitions.

## Production schema applied

| Resource | Type | Fields / target |
| --- | --- | --- |
| `nenufar_shipping_detail` | MetaObject | title, body (rich text), position |
| `nenufar_packaging_detail` | MetaObject | title, body (rich text), position |
| `nenufar_care_guide` | MetaObject | title, body (rich text), position |
| `nenufar_compatible_technique` | MetaObject | title, description (rich text), machines (list), position |
| `custom.shipping_details` | Product metafield `gid://shopify/MetafieldDefinition/248818630881` | list of `nenufar_shipping_detail` references |
| `custom.packaging_details` | Product metafield `gid://shopify/MetafieldDefinition/248819646689` | list of `nenufar_packaging_detail` references |
| `custom.care_guide` | Product metafield `gid://shopify/MetafieldDefinition/248820105441` | list of `nenufar_care_guide` references |
| `custom.compatible_techniques` | Product metafield `gid://shopify/MetafieldDefinition/248820564193` | list of Product references |
| `custom.materials` | Product metafield `gid://shopify/MetafieldDefinition/248821448929` | rich text |
| `custom.dimensions` | Product metafield `gid://shopify/MetafieldDefinition/248817615073` | rich text |

## Validation

- Shopify Admin production custom-data screens show all four MetaObject definitions and their fields.
- Shopify Admin production Product definitions show the four new reference fields as lists and Materials/Dimensions as rich text.
- Storefront API access remains enabled on each new definition.
- Documentation changes pass `git diff --check`.

## Risks and pending work

- Existing demo values for the replaced fields were intentionally removed; production values must be entered during content migration.
- Remaining multiline MetaObject fields (`preview_copy`, process-step `body`, FAQ group description, and FAQ answer) still need their own destructive definition-conversion chunk.
- Hydrogen queries and renderers still consume the old scalar shape until the storefront migration chunk is implemented.
- The development store must receive a separately recreated schema before further content testing.

## Rollback

There is no automatic rollback for deleted demo values. Recreate the original scalar definitions and restore values from a pre-change export if needed. Do not reuse production definition IDs in another store.
