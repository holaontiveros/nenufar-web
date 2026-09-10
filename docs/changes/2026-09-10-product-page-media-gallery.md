# Product page media gallery

## Objective

Show the product media available in Shopify in the first section of the single-product page, while preserving a safe empty state for products that do not yet have media.

## Scope

- Query up to ten product images from Shopify's Storefront API.
- Render the selected variant image first when it exists, followed by the product images.
- Provide accessible thumbnail controls for selecting the displayed image.
- Keep a deliberately blank media area when the product has no images; this supports the dev-only blank product without inventing fallback artwork.

## Decisions

- This chunk supports images only. Video and 3D media are intentionally deferred because their presentation needs separate approved design work.
- The gallery de-duplicates the selected variant image and the product image list by Shopify image ID.

## Files modified

- `app/components/ProductImage.tsx`
- `app/routes/products.$handle.tsx`
- `app/styles/app.css`
- `storefrontapi.generated.d.ts`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `git diff --check`

## Risks and rollback

- A product without Shopify images continues to render an empty image frame until real media is uploaded.
- Revert this commit to restore the previous single-image rendering and query.
