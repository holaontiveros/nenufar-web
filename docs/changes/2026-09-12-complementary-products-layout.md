# Align complementary products with related-products layout

## Objective

Make the Search & Discovery complementary-products section visually follow the existing related-products section rather than appearing as a standalone oversized card.

## Scope

- Remove the section-level card surface, background, border, and shadow.
- Keep the small red eyebrow, title, and descriptive subtext.
- Use a three-column desktop product-card grid that shares the related-products visual language.
- Preserve the existing single-column mobile layout and all Search & Discovery behavior.

## Files modified

- `app/styles/app.css`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

This is presentation-only. Revert this commit to restore the previous complementary-products card treatment without changing recommendation data or configuration.
