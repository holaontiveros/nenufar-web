# Align product personalization controls with the product page

## Objective

Make personalization fields visually consistent with the single-product page's option selectors and purchase controls.

## Scope

- Add product-page-scoped presentation rules for the personalization surface, labels, textareas, and font/motif selectors.
- Reuse the existing variant controls' rounded cards, pink selected state, and keyboard focus treatment.
- Preserve all personalization inputs, submitted cart attributes, Shopify product data, and form behavior.

## Decisions

- Keep the implementation CSS-only to avoid changing personalization configuration or cart submission.
- Scope the rules to `.nenufar-product-page` so existing personalization UI outside this view remains unchanged.

## Files modified

- `app/styles/app.css`
- `docs/changes/2026-09-12-product-personalization-style.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Remaining risks

- Product configuration data in the development store is needed to visually review every optional personalization field and selection state.

## Rollback

Revert this commit to restore the prior personalization styling without affecting saved Shopify data or cart attributes.
