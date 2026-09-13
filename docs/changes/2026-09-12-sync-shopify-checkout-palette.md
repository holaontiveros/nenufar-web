# Sync Shopify checkout palette

## Objective

Align the Shopify-managed checkout with the approved semantic Nenúfar color
palette.

## Scope

- Applied the shared canvas, brand, and error colors in the production
  checkout editor.
- Recorded the Shopify-to-storefront color mapping and its maintenance flow.

## Decisions

- Checkout primary actions use solid `#DB2777` (`--color-brand`). Shopify's
  checkout editor supports flat colors, not the storefront's pink-to-purple
  gradient.
- The checkout main background uses `#FAF8F6` (`--color-canvas`), while the
  header stays white for a clear surface boundary.
- Input errors use `#E11D48` (`--color-danger`).

## Files modified

- `docs/shopify/checkout-branding.md`
- `docs/changes/2026-09-12-sync-shopify-checkout-palette.md`

## Validation

- Saved the production checkout configuration in Shopify Admin; the editor Save
  button returned to its disabled state.
- Confirmed the configured controls show `#FAF8F6`, `#DB2777`, and `#E11D48`.
- Ran `git diff --check`.

## Risks and rollback

- Shopify controls are stored outside Git. Restore Shopify's default values or
  the values recorded in a future change document through the checkout editor
  if rollback is needed.
- A real checkout should be reviewed after Shopify changes its checkout editor
  or color-control behavior.
