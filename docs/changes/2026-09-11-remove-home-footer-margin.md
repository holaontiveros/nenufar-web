# Remove homepage footer margin

## Objective

Make the homepage footer meet the preceding section without additional top spacing.

## Scope

- Override the shared footer top margin only when the page contains the existing homepage hero.
- Preserve the shared margin on internal pages.

## Validation

- `npm run build`
- `npm run format:check`
- `git diff --check`

## Risks and rollback

This relies on the existing `.nenufar-hero` homepage marker. Remove the scoped CSS rule to restore the shared margin.
