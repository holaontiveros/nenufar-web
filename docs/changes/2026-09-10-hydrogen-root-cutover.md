# Hydrogen root cutover

## Objective

Make Shopify Hydrogen the only runtime for Nenúfar Web by replacing the unused root Vite application. The user explicitly confirmed that no fallback is required because nothing is live.

## Scope

- Moved the prepared Hydrogen application, runtime configuration, generated API types, public assets, and package lockfile from `hydrogen/` into the repository root.
- Removed the obsolete Vite SPA source, browser Storefront client, old package configuration, and CSV generator that depended on that source.
- Moved the ignored Shopify development link and Hydrogen environment configuration to the root without committing credentials.
- Updated repository ignores, the project collaboration guide, the migration ADR, and the README for the root runtime.

## Decisions

- This executes the already approved Hydrogen/Oxygen migration ADR.
- Hydrogen is the sole storefront runtime. The previous Vite application was not retained.
- The current local link is development-only and must be replaced before production use.

## Files modified

- Root Hydrogen runtime: `app/`, `server.ts`, `vite.config.ts`, `react-router.config.ts`, `.graphqlrc.ts`, generated API types, package files, TypeScript configuration, ESLint configuration, environment example, and `public/`.
- Removed legacy Vite files: `src/`, `index.html`, `metadata.json`, and the old CSV generator.
- Documentation: `AGENTS.md`, `README.md`, `docs/architecture/ADR-2026-09-10-hydrogen-migration.md`, and this record.

## Validation

- `npm ci --no-audit --no-fund` completed successfully.
- `npm run codegen` completed successfully.
- `npm run typecheck` completed successfully.
- `npm run build` completed successfully.
- Started `npm run dev` and confirmed HTTP 200 responses for `/` and `/products/joyero-roble-caligrafia-madre`. The catalogue and personalization control rendered development-store content.

The commands warn that local Node.js 25 is outside the generated project's Node 22/24 engine range. Hydrogen also reports upstream `envFile`, React Router future-flag, and bundle-analyzer compatibility warnings; none failed validation.

## Remaining risks

- The storefront visual redesign is not yet at full parity with the original landing page; subsequent chunks will address it.
- Local Node.js 25 is outside Hydrogen's supported Node 22/24 range. Deployment and CI should use a supported version.
- Shopify product and metafield data remains development/demo content until it is validated for production.

## Rollback

Revert the cutover commit to restore the former root Vite application and the `hydrogen/` sidecar exactly as they were before this chunk. The ignored local environment and Shopify link must then be re-established if needed.
