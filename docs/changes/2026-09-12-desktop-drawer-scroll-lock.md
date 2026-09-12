# Lock background scrolling for open desktop drawers

## Objective

Prevent the page behind an open desktop drawer from scrolling.

## Scope

- Extend the existing overlay scroll lock from the mobile breakpoint to all viewport sizes.
- Preserve scrolling within drawer content, including the cart item's scrollable region.

## Decisions

- Reuse the existing `html:has(.overlay.expanded)` condition so cart, search, and mobile drawers share one lock behavior.

## Files modified

- `app/styles/app.css`
- `docs/changes/2026-09-12-desktop-drawer-scroll-lock.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Remaining risks

- Desktop browser review should confirm that background scrolling resumes immediately after closing every drawer type.

## Rollback

Revert this commit to restore the prior mobile-only background scroll lock.
