# Create production product reference metafields

## Objective

Finish the approved production Product-schema links to the merchant-owned Nenúfar metaobjects.

## Scope

- Created `custom.making_process` as a public list reference constrained to `nenufar_product_process_step`.
- Created `custom.personalization_config` as a public single reference constrained to `nenufar_product_personalization`.
- Used the authenticated Shopify Admin session because the current CLI application cannot manage merchant-owned definitions.
- Did not create product values, metaobject entries, products, media, or demo content.

## Validation

- Shopify Admin displayed `Workshop process` with namespace/key `custom.making_process`, list cardinality, and target `Nenúfar product process step`.
- Shopify Admin displayed `Personalization configuration` with namespace/key `custom.personalization_config`, single cardinality, and target `Nenúfar product personalization`.
- Storefront API access is enabled for both definitions.
- `git diff --check`

## Remaining risks

- Production values and metaobject entries must use verified merchant content only.
- The future production Hydrogen/Oxygen cutover must query the production-specific `nenufar_*` types.

## Rollback

Before values exist, remove only these two exact Product metafield definitions in Shopify Admin. Do not remove the referenced metaobject definitions or other product definitions.
