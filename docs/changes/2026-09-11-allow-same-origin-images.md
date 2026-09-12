# Allow same-origin images under CSP

## Objective

Restore images served from the storefront origin after defining a custom `img-src` allowlist.

## Scope

- Add CSP's `'self'` source expression to `img-src`.

## Decision

An explicit `img-src` directive supersedes `default-src`; same-origin images are not implicitly allowed. `'self'` retains the restrictive external allowlist while allowing assets served by `nenufar.mx`.

## Files modified

- `app/entry.server.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

The change permits only same-origin image assets. Remove `'self'` to restore the prior policy.
