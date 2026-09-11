# Compatible technique metaobject correction

## Objective

Model product-compatible techniques as reusable named records that products can reference in an ordered list.

## Scope

- Replaced the production `nenufar_compatible_technique` fields with one required `name` single-line field.
- Removed the previous title, description, machines, and position fields; no production entries had been created for this definition.
- Updated the product query and product-detail tabs to render the referenced technique names.
- Updated the Shopify data-model documentation.

## Validation

- Confirmed the production definition is saved with only `name` as Single line text in Shopify Admin.
- `npm run codegen`
- `npm run typecheck`
- `npm run build`

## Risks and rollback

The definition replacement is destructive for entries using the removed fields. Restore the prior definition and values from an export if that model is ever needed again. Storefront rollback is a code revert.

## Follow-up

Create the reusable technique entries and assign them to products through `custom.compatible_techniques`.
