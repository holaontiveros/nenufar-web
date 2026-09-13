# Render missing product handles with the branded 404 page

## Objective

Ensure a missing Shopify product handle, such as `/products/asd`, renders the storefront's branded 404 experience rather than the generic root error boundary.

## Scope

- Extract the existing catch-all 404 presentation into a reusable `NotFoundPage` component.
- Add a product-route error boundary that renders the branded page only for HTTP 404 responses.
- Preserve the root error boundary for non-404 product failures and preserve the existing catch-all-route behavior.

## Files modified

- `app/components/NotFoundPage.tsx`
- `app/routes/$.tsx`
- `app/routes/products.$handle.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

This only changes the presentation of missing-product responses. Revert this commit to restore the generic route error handling for missing product handles.
