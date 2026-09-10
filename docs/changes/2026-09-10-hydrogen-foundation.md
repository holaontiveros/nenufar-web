# Hydrogen migration foundation

## Objective

Create an official Hydrogen/Oxygen project foundation without disrupting the active Vite storefront.

## Scope

- Added the official TypeScript and Tailwind Hydrogen starter under `hydrogen/`.
- Added an environment example for the development store `nenu-from-react.myshopify.com` without credentials.
- Recorded the approved migration decision and staged migration sequence.

## Decisions

- The Hydrogen app remains isolated until feature parity and a cutover are approved.
- `shopify hydrogen link` will be used only after the owner identifies an existing Hydrogen storefront or explicitly authorizes creating one.

## Files changed

- `hydrogen/`
- `docs/architecture/ADR-2026-09-10-hydrogen-migration.md`
- `docs/changes/2026-09-10-hydrogen-foundation.md`

## Validation

- Shopify CLI generated the Hydrogen project successfully.
- `npm run typecheck` — correct.
- `npm run build` — correct.
- Validation completed with the active Node 25 runtime. npm reports that Hydrogen declares support for Node 22 or 24, so the deployment and CI runtime must use one of those supported versions.

## Risks pending

- The local environment currently runs Node 25 and is not within Hydrogen's declared supported range.
- No Hydrogen storefront has been linked to the development store yet.

## Rollback

Revert this commit. The current Vite application remains unaffected.
