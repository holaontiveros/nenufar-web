# Show the selected swatch option name

## Objective

Show the currently selected option value beside its option title when its selector is rendered as a Shopify color or image swatch.

## Scope

- Append the selected swatch value to the product-option heading.
- Keep text-only option headings unchanged.
- Scope the supporting visual treatment to the Nenúfar product page.

## Decisions

- Use the `selected` state already supplied by Hydrogen's mapped product options; no product query, URL, or cart behavior changes are needed.
- Treat a value as a visual swatch only when Shopify provides a swatch color or image, matching the existing button rendering rule.

## Files modified

- `app/components/ProductForm.tsx`
- `app/styles/app.css`
- `docs/changes/2026-09-12-selected-swatch-option-label.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Remaining risks

- The development store must contain color or image swatches to visually confirm the selected label with its real product data.

## Rollback

Revert this commit to restore headings that show only the option name. Product data, URLs, selection, and cart behavior are unaffected.
