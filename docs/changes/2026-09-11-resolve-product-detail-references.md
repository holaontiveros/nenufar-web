# Resolve product detail metaobject references

## Objective

Render product detail content from the configured Shopify metaobjects instead of showing serialized reference IDs such as `gid://shopify/Metaobject/...`.

## Scope

- Updated the product query to read `shipping_details`, `packaging_details`, and `care_guide` through their metaobject `references`.
- Mapped each referenced entry's `body`, `title`, and `position` fields before passing it to the detail tabs.
- Updated the detail tabs to render lists of rich-text reference bodies.
- Kept compatible techniques on the same reference-based path.

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- Hydrogen documentation search for dynamic metaobjects completed.
- Hydrogen validator was unavailable because its isolated script could not resolve the workspace TypeScript dependency; the project typecheck and production build passed.

## Risks and rollback

Products whose metafields are still configured as scalar text will no longer render through these reference readers; migrate those definitions to the documented metaobject reference types before assigning content. Roll back the storefront commit if necessary.

## Follow-up

Assign the appropriate Shipping detail, Packaging detail, and Care guide entries to each product in Shopify Admin.
