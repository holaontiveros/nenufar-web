# Create isolated production Hydrogen storefront

## Objective

Establish a production-specific Hydrogen/Oxygen boundary for the client-transfer store without changing the existing development storefront.

## Scope

- Created the approved ADR for isolated production Hydrogen/Oxygen operations.
- Created `/Users/javo/projects/nenufar-web-production` as a separate local Git worktree on branch `codex/production-storefront-link`.
- Created and linked the transfer-store Hydrogen storefront `Nenúfar Web Production` from that worktree.
- Verified its default Oxygen environments: `production` and `preview`.
- Did not deploy application code, map `nenufar.mx`, create production content, alter development linkage, or expose/commit credentials.

## Validation

- `shopify hydrogen link --create-storefront` completed successfully for `nenufar-regalos-personalizados-xyrqi3rj.myshopify.com`.
- `shopify hydrogen env list` reported the linked storefront and its `production` and `preview` environments.
- The production worktree has no tracked changes; `.env*` and `.shopify/` are ignored.
- `git diff --check`

## Remaining risks

- Production environment variables need a distinct `SESSION_SECRET` and final Storefront configuration before any deployment.
- The current source still needs a planned production compatibility change for the `nenufar_*` metaobject types.
- Do not connect `nenufar.mx` or run a live production deployment until product/content readiness and explicit launch approval.

## Rollback

Remove only the `Nenúfar Web Production` Hydrogen storefront and `/Users/javo/projects/nenufar-web-production` worktree. The development project and storefront remain unaffected.
