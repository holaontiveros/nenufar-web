# ADR: Isolate the production Hydrogen/Oxygen boundary

## Status

Superseded by [ADR-2026-09-12-main-repository-production-linkage.md](ADR-2026-09-12-main-repository-production-linkage.md).

This was the correct interim boundary while this checkout remained development-only.
The repository's `main` branch is now the production deployment path, so the
local main checkout must be linked to the production storefront instead.

## Context

The existing Hydrogen project is linked exclusively to the development store. The client-transfer store is becoming the production commerce source and must not inherit development-store credentials, linkage, deployments, products, or content.

## Decision

Create a separate Hydrogen storefront in `nenufar-regalos-personalizados-xyrqi3rj.myshopify.com` and manage its local linkage from a separate Git worktree. Its Oxygen environment will use only production-store credentials and a distinct session secret. The shared application source remains versioned in the repository; no environment secret is committed.

## Alternatives considered

1. Relink the existing checkout to production. Rejected because it would disrupt the development storefront and risks cross-store credentials.
2. Reuse the development Hydrogen/Oxygen storefront. Rejected because it violates production isolation.
3. Use a separate Hydrogen storefront and isolated local worktree. Approved because it preserves development operations and establishes a clear cutover boundary.

## Consequences

- Production deployment configuration and credentials are independent from development.
- The production worktree is operational state, not application-source divergence; future code reaches production through reviewed commits.
- Production custom-data queries require a later planned compatibility/cutover change for the `nenufar_*` metaobject types.

## Rollback

Disconnect or delete only the new production Hydrogen storefront and its local worktree. The development storefront and repository source remain intact.
