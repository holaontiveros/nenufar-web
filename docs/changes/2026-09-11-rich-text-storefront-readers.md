# Rich text storefront readers

## Objective

Render Shopify Rich text values through Hydrogen instead of displaying their serialized JSON or treating formatted copy as plain text.

## Scope

- Added a shared `RichTextContent` component for Shopify Rich text JSON with a plain-string compatibility path.
- Updated product detail tabs for dimensions, materials, workshop process steps, shipping, packaging, and care content.
- Updated personalized-product preview copy.
- Updated homepage FAQ group descriptions and answers.
- No Shopify content values, definitions, or production data were changed.

## Decisions

Hydrogen's `RichText` component is used when a value has the Shopify Rich text AST shape. Plain strings remain supported during the content re-entry period so legacy development entries do not break the storefront.

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- Hydrogen documentation search was attempted; the local validator service was unavailable.

## Risks and rollback

The compatibility path can be removed once all development and production values are Rich text. Rollback is a code revert; Shopify schema and content remain unchanged by this chunk.

## Follow-up

Populate the replacement Rich text fields with authored production content and verify each product-detail tab against the approved designs.
