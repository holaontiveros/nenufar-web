# Improve the mobile cart drawer layout

## Objective

Make the mobile cart a right-aligned drawer that retains a visible backdrop strip while keeping cart content and checkout controls correctly sized within the mobile viewport.

## Scope

- Apply the mobile cart drawer treatment through the existing `45rem` breakpoint.
- Leave a responsive left-side backdrop strip that also remains the close target.
- Use a dynamic viewport-height grid so the cart list scrolls independently and the summary/checkout block stays at the bottom of the drawer.
- Tighten mobile card spacing and typography for personalized cart lines.

## Decisions

- Keep the cart drawer right-aligned instead of using a full-screen modal.
- Use a `clamp()`-based edge gap so the visible backdrop remains usable across phone widths.
- Preserve the existing desktop cart drawer, Shopify checkout URL, cart updates, personalization editing, and accessibility semantics.

## Files modified

- `app/styles/app.css`
- `docs/changes/2026-09-12-mobile-cart-drawer-layout.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Manual review at 320px, 375px, 390px, and 430px widths with one and multiple personalized products.

## Remaining risks

- The mobile visual review must be performed against real browser chrome and a cart with multiple lines before production release.

## Rollback

Revert this commit to restore the previous cart drawer sizing and layout without affecting Shopify cart data or checkout behavior.
