# Smooth rotating hero pill transition

## Objective

Remove layout shifts while the homepage hero message rotates.

## Scope

- Render all hero messages in an overlaid grid so the pill reserves the width and height of the longest phrase.
- Cross-fade and gently translate the active message in place.
- Preserve reduced-motion support and responsive width constraints.

## Validation

- `npm run typecheck`
- `npm run build`
- `npm run format:check`
- `git diff --check`

## Risks and rollback

The pill reserves space for the longest message by design. Restore the single active-message markup and animation to roll back.
