# Fix inline money hydration

## Objective

Remove invalid inline money markup that can independently cause browser DOM repair before React hydrates product and search views.

## Scope

Render Shopify's `Money` component as an inline `span` whenever it appears inside phrasing-only HTML elements such as `p`, `small`, `strong`, or `s`.

## Decisions

`Money` renders a `div` by default. A `div` is invalid inside phrasing-only elements, so browsers repair the server HTML before React hydrates it. The affected usages now explicitly use `as="span"`; block-level price displays remain unchanged.

## Files modified

- `app/components/ProductForm.tsx`
- `app/components/ProductPrice.tsx`
- `app/components/ProductItem.tsx`
- `app/components/SearchResults.tsx`
- `app/components/SearchResultsPredictive.tsx`
- `app/routes/products.$handle.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Reproduced the remaining document-root hydration recovery locally after this markup correction. That separate behavior matches [Hydrogen issue #3878](https://github.com/Shopify/hydrogen/issues/3878), so this chunk does not claim to resolve it.

## Risks and rollback

The wrapper element changes from `div` to `span` only for inline contexts. The known document-root hydration recovery remains pending an approved response to the upstream issue. Roll back by reverting this commit if a context requires block layout, then replace the parent markup with a valid block-level structure instead.
