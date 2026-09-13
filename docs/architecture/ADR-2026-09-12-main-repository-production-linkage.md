# ADR: Link the main repository to the production Hydrogen storefront

## Status

Approved on 2026-09-12.

## Context

The repository at `/Users/javo/projects/nenufar-web` tracks the main GitHub
repository. Its `main` branch deploys directly to production. The former
development store `nenu-from-react.myshopify.com` will be deleted and must not
remain a runtime, checkout, or Shopify CLI target.

## Decision

Use `nenufar-regalos-personalizados-xyrqi3rj.myshopify.com` and its existing
`Nenúfar Web Production` Hydrogen storefront as the only storefront target for
this repository. Production credentials and `SESSION_SECRET` remain configured
only in Oxygen or an ignored local `.env` file. The repository will not retain
the development-store environment file or Shopify project link.

## Alternatives considered

1. Keep the existing checkout linked to development and deploy production from
   a separate worktree. Superseded because this checkout's `main` branch is the
   production deployment path.
2. Leave the development-store configuration in place until the store deletion.
   Rejected because it can direct local work and new environment setup to a
   store that is being retired.

## Consequences

- A Shopify CLI authentication is required before this checkout can be linked
  to the existing production storefront.
- Local and Oxygen environment values must use production-only credentials.
- Historical records retain development-store references as audit history, but
  they do not configure runtime behavior.

## Rollback

Restore a previous ignored local environment file and relink the checkout only
if production linkage is intentionally reversed. Do not recreate or reuse the
deleted development store.
