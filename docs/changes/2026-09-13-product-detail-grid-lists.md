# Restore styled lists in product-detail grid cards

## Objective

Make list content within product-detail grid cards legible and visually
intentional.

## Scope

- Restored unordered-list disc markers only inside product-detail grids.
- Added card-appropriate indentation, top spacing, and brand-colored markers.
- Preserved the reset and list treatment of process steps, cart lines, and
  other storefront lists.

## Decisions

- Used native list markers rather than decorative elements so assistive
  technology retains list semantics.
- Scoped the styling to `.product-details-grid` because only the materials,
  package-content, and compatible-technique cards need this treatment.

## Files modified

- `app/styles/app.css`
- `docs/changes/2026-09-13-product-detail-grid-lists.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

- Confirm product cards with package contents, compatible techniques, or
  rich-text material lists show the intended markers at desktop and mobile
  sizes.
- Revert this chunk to restore markerless grid-card lists.
