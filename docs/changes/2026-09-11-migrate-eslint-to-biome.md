# Migrate ESLint to Biome

## Objective

Replace the project ESLint workflow with Biome and ensure the shared stylesheet surface is covered by Biome formatting and CSS linting.

## Scope

- Removed the ESLint flat configuration and ESLint-only development dependencies.
- Added a compact Biome 2 configuration for repository-aware JavaScript, TypeScript, React, and CSS processing.
- Enabled Biome CSS formatting and linting, with recommended CSS rules applied to `app/styles/**/*.css`.
- Added `npm run format` and `npm run format:check` for the CSS/configuration surface.
- Replaced the `lint` script with `biome lint .`.
- Removed one duplicate CSS `transition` declaration reported by Biome.

## Decisions

Existing JavaScript and TypeScript diagnostics are warnings during this migration. Making every historical Biome recommendation blocking would require an unrelated accessibility and code-quality remediation project. CSS checks remain active and blocking for errors.

## Validation

- `npm run lint`
- `npx biome lint app/styles`
- `npm run format:check`

## Risks and rollback

Biome surfaces existing warnings that ESLint did not report in the same way. Revert this commit and reinstall the removed ESLint dependencies to restore the former tooling.
