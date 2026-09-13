# Add a semantic Nenúfar color palette

## Objective

Standardize the storefront's repeated colors without changing its established visual design.

## Scope

- Define semantic color tokens for shared surfaces, typography, borders, brand states, accent states, and WhatsApp actions.
- Replace repeated shared color literals throughout the stylesheet with those tokens.
- Preserve one-off illustration and status colors that do not yet have a stable shared meaning.

## Decisions

The approved semantic-token model is documented in `docs/architecture/ADR-2026-09-12-semantic-color-palette.md`.

## Files modified

- `app/styles/app.css`
- `docs/architecture/ADR-2026-09-12-semantic-color-palette.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

This is a visual-token refactor with no intended rendered change. Revert the commit if a browser comparison exposes an unintended cascade difference.
