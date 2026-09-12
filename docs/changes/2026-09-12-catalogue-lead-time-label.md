# Clarify catalogue lead-time labels

## Objective

Make the catalogue card's lead-time value understandable without relying on its clock icon.

## Scope

- Use the single-product view's “Tiempo de elaboración” label in catalogue-card metadata.
- Keep the existing `custom.lead_time` data source, icon, and conditional display.

## Decisions

- Reuse the established single-product wording for consistent Spanish terminology across catalogue and product views.

## Files modified

- `app/components/NenufarCatalogue.tsx`
- `docs/changes/2026-09-12-catalogue-lead-time-label.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Remaining risks

- Lead-time values remain Shopify development-store content and should be verified before production publication.

## Rollback

Revert this commit to restore the icon-only lead-time value in catalogue cards.
