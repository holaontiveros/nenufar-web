# Standardize semantic status colors

## Objective

Extend the Nenúfar palette with shared success, warning, danger, and supporting surface tokens.

## Scope

- Add status, brand-wash, and border tokens.
- Replace shared status and supporting color literals in the stylesheet.
- Leave decorative hero and 404 illustration colors unchanged.

## Decisions

This completes the next palette migration chunk under `docs/architecture/ADR-2026-09-12-semantic-color-palette.md`.

## Files modified

- `app/styles/app.css`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

No rendered-color changes are intended. Revert this commit if visual comparison identifies an unintended cascade change.
