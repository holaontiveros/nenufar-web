# Restrict the mobile menu to phone widths

## Objective

Keep the full primary navigation visible on tablet and desktop layouts.

## Scope

- Move the header navigation collapse, menu-toggle, and mobile-menu styles from the `64rem` breakpoint to the existing `40rem` phone breakpoint.
- Leave the catalogue's tablet layout rules at `64rem` unchanged.

## Decision

The mobile menu is now only activated at `40rem` (640px) and below. This matches the compact-header breakpoint and retains the full navigation on common tablet widths.

## Files modified

- `app/styles/app.css`
- `docs/changes/2026-09-11-mobile-menu-phone-breakpoint.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `npm run format:check`
- `git diff --check`

## Risks and rollback

At widths just above 640px the header has less spare space than before, but its four navigation links fit alongside the logo and cart control. Restore the navigation rules to the `64rem` block to roll back.
