# Fix compatible techniques product reference

## Objective

Ensure `custom.compatible_techniques` stores reusable compatible-technique metaobjects rather than products.

## Scope

- Deleted the incorrectly configured production product metafield definition, which had been a Product reference.
- Recreated `custom.compatible_techniques` as a list of references constrained to the `nenufar_compatible_technique` metaobject definition.
- Kept Storefront API access enabled so Hydrogen can read the references through `references.nodes`.
- No product values were present on the incorrect definition, so no assignments were lost.

## Validation

- Shopify Admin shows the definition as `List` with type `Compatible technique 1`.
- The compatible-technique metaobject definition remains limited to the `name` single-line field.
- Starter entries remain available: `Corte láser` and `DTF UV`.
- `git diff --check`

## Risks and rollback

The old Product-reference definition was removed. If a rollback is required, recreate it as `custom.compatible_techniques` with Product reference type; however, that would not match the storefront data model and query.

## Follow-up

Assign the appropriate compatible-technique entries to each product in Shopify Admin. The storefront already reads the list as metaobject references and renders each referenced `name`.
