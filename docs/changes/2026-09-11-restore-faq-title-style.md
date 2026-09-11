# Restore FAQ page title style

## Objective

Restore the established Nenúfar display-title treatment on the dedicated FAQ page.

## Scope

- Extend the existing shared `.story-heading` title selector to style both `h1` and `h2` elements.
- Preserve the FAQ page's semantic `h1`.

## Decision

The title treatment remains a shared CSS rule instead of changing the FAQ page heading to an `h2`. This keeps the page heading semantically correct while matching the visual language used on the homepage.

## Files modified

- `app/styles/app.css`
- `docs/changes/2026-09-11-restore-faq-title-style.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `npm run format:check`
- `git diff --check`

## Risks and rollback

The selector also affects future `h1` elements inside `.story-heading`, intentionally giving them the same display-title treatment. Roll back by removing the `.story-heading h1` selector.
