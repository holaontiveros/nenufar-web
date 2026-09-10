# ADR: Migrate the storefront to Shopify Hydrogen

## Status

Approved on 2026-09-10. Migration in progress.

## Context

Nenúfar Web is currently a client-rendered Vite application that calls Storefront API directly. The storefront needs a platform that provides server rendering, commerce-native routing, edge caching, and a deployment path compatible with Shopify.

## Alternatives considered

1. Keep the Vite SPA and evolve the existing Storefront API client. This has the lowest migration cost but leaves SEO, server data loading, caching, and deployment as separate concerns.
2. Add a custom server to the existing Vite app. This provides server rendering but creates infrastructure and security responsibilities outside the chosen commerce platform.
3. Migrate to Shopify Hydrogen and deploy to Oxygen. This replaces the runtime with Shopify's React storefront framework and its edge deployment model.

## Decision

Adopt option 3. The migration will happen in small, independently committed chunks. During the transition, the existing Vite application remains intact while the Hydrogen app is built under `hydrogen/`. The final cutover requires a separate approved chunk after functional parity is verified.

## Impact and cost

- The target runtime is React Router/Hydrogen with server-side rendering and Oxygen-compatible workers.
- The target project uses the Hydrogen-supported Node.js versions (22 or 24) and separate dependencies from the existing Vite app.
- Storefront credentials and session secrets move to Hydrogen/Oxygen environment configuration and are never committed.
- The user must identify or create the target Hydrogen storefront in `nenu-from-react.myshopify.com` before the project can be linked and deployed.

## Migration sequence

1. Scaffold and document Hydrogen/Oxygen foundation.
2. Move product, metafield, cart, and personalization flows to server-aware Hydrogen routes.
3. Port the visual landing experience and informational sections.
4. Link the development store, run end-to-end checks, and approve cutover.

## Risks

- The existing React 19 components may require compatibility adjustments because the generated Hydrogen project currently uses React 18.
- Local Node.js 25 is outside the generated project's supported engine range; validation must use Node 22 or 24.
- The storefront cannot be tested against the dev store until it is linked and receives the store's environment variables.

## Rollback

Keep the existing Vite application as the active project until the cutover chunk. Reverting a Hydrogen chunk removes only the corresponding changes under `hydrogen/` and its documentation.
