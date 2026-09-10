# Product detail tabs

## Objective

Render the approved product-detail data after the single-product hero in the four tabbed sections shown in the reference design.

## Scope

- Query the product metafields for dimensions, weight, materials, package contents, shipping, packaging, and care.
- Query referenced `product_process_step` metaobjects from `custom.making_process`.
- Render only tabs with usable data: Materials & Dimensions, How We Make It, Shipping & Packaging, and Care Guide.
- Provide responsive, keyboard-accessible tab controls and panels.

## Decisions

- The existing `custom.making_process` reference-list order is preserved; `position` is displayed on each workshop card and does not re-sort the merchant-provided sequence.
- Multi-line product fields retain their authored line breaks. List metafields are parsed from Shopify's serialized list value.
- No empty tab, placeholder content, or fallback copy is rendered.

## Files modified

- `app/components/ProductDetailsTabs.tsx`
- `app/routes/products.$handle.tsx`
- `app/styles/app.css`
- `docs/plans/product-page-roadmap.md`
- `docs/shopify/product-page-data.md`
- `storefrontapi.generated.d.ts`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `git diff --check`

## Risks and rollback

- Storefront access or malformed values for an individual field simply omit its content or tab where appropriate.
- Revert this commit to remove the tabs and their additional storefront query fields.
