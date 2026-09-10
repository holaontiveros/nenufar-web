# Cart drawer visual parity

## Objective

Restore the visual language of the original Vite cart drawer in the Hydrogen storefront while keeping its live Shopify cart and checkout operations intact.

## Scope

- Applied the Nenúfar drawer treatment to the Hydrogen cart aside: dimmed overlay, branded header, product cards, quantity control, empty state, order summary, and checkout call to action.
- Replaced English cart-facing labels with the existing Spanish storefront voice.
- Kept Shopify's optimistic quantity updates, line removal, discounts, gift cards, and checkout URL unchanged.

## Decisions

- Used the Vite `CartDrawer.tsx` implementation before commit `f77303b` as the visual reference.
- Scoped the drawer skin through the existing `Aside` type class; this does not change the Storefront Cart API, cart persistence, or checkout architecture.
- Did not recreate the Vite-only personalization-note editor or WhatsApp checkout action because neither is currently backed by the Hydrogen cart implementation. Showing non-functional controls would be misleading.

## Files modified

- `app/components/Aside.tsx`
- `app/components/PageLayout.tsx`
- `app/components/CartMain.tsx`
- `app/components/CartLineItem.tsx`
- `app/components/CartSummary.tsx`
- `app/styles/app.css`

## Validation

- `git diff --check`
- `npm run typecheck`
- `npm run build`

The commands completed successfully. The build retains pre-existing dependency warnings about `envFile`, React Router v8 future flags, and the Hydrogen bundle analyzer/Rolldown integration.

## Remaining risks

- The drawer has not been visually inspected on a deployed Oxygen preview in this chunk.
- Cart discount and gift-card forms remain available for Shopify functionality; their presence can make the live drawer taller than the original Vite mockup when used.

## Rollback

Revert the commit for this change. That restores the standard Hydrogen cart aside without affecting Shopify cart data or checkout sessions.
