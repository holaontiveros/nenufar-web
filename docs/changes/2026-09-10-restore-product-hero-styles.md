# Restore product hero styles

## Objective

Restore the intended visual treatment for the first product-page section after a gallery stylesheet edit removed its scoped hero rules.

## Scope

- Restore the responsive two-column product-hero layout, spacing, gallery card treatment, and price/availability panel.
- Explicitly constrain the product-page WhatsApp SVG to its button dimensions.
- Override only the generic Hydrogen product-route rules that conflict with the Nenúfar product hero.

## Decisions

- The fix is CSS-only: product data, cart behavior, and Shopify queries remain unchanged.
- Scoped `.nenufar-product-page` selectors protect the visual design from future generic Hydrogen route styles.

## Files modified

- `app/styles/app.css`

## Validation

- `npm run typecheck`
- `npm test`
- `npm run build`
- Manual visual verification on the deployed product page.
- `git diff --check`

## Risks and rollback

- This restores the prior intended product hero without affecting the rest of the storefront.
- Revert this commit to return to the generic product-route layout.
