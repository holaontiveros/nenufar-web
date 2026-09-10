# Brand logo and cart icons

## Objective

Use the supplied Nenúfar logo in the storefront header and replace cart-related placeholder glyphs with accessible SVG icons.

## Scope

- Moved the supplied horizontal logo into the public static-asset directory and rendered it from the header.
- Added reusable inline SVG icons for cart, edit, personalisation, secure checkout, and removal controls.
- Replaced cart placeholder characters in the header trigger, cart drawer, empty state, checkout action, personalization control, and removal control.

## Decisions

- Stored the user-supplied logo at `public/assets/nenufar_logo_horizontal.svg` so it can be served at a stable, cacheable storefront URL without changing the application asset pipeline.
- Used inline SVG React components rather than adding an icon package dependency.

## Files modified

- `public/assets/nenufar_logo_horizontal.svg`
- `app/components/CartIcons.tsx`
- `app/components/Header.tsx`
- `app/components/Aside.tsx`
- `app/components/CartMain.tsx`
- `app/components/CartLineItem.tsx`
- `app/components/CartSummary.tsx`
- `app/styles/app.css`

## Validation

- `npm test`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

All commands completed successfully. The build retains the existing dependency warnings related to `envFile`, React Router future flags, and the Hydrogen bundle analyzer.

## Remaining risks

- The new logo and icon spacing should be reviewed on a deployed preview at desktop and mobile widths.

## Rollback

Revert this chunk’s commit to restore the prior textual header mark and placeholder cart glyphs.
