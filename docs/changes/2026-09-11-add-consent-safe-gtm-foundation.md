# Add consent-safe GTM foundation

## Objective

Load the approved GTM container only after Shopify analytics consent is granted.

## Scope

- Add public GTM configuration and CSP permissions.
- Enable Shopify's configured customer privacy banner.
- Load `GTM-KZQS4HLW` client-side only after analytics consent.
- Record the approved measurement architecture in `docs/architecture/ADR-2026-09-11-ga4-measurement.md`.

## Files modified

- `.env.example`
- `env.d.ts`
- `app/root.tsx`
- `app/entry.server.tsx`
- `app/components/GoogleTagManager.tsx`
- `docs/architecture/ADR-2026-09-11-ga4-measurement.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

No GTM requests are sent before consent. Remove `GoogleTagManager` and the CSP directives to roll back.
