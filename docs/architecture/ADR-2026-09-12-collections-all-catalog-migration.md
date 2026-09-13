# ADR: Make `/collections/all` the Nenúfar catalog route

## Status

Approved and implemented on 2026-09-12.

## Context

`/catalogo` currently provides Nenúfar's catalog experience: collection tabs, technique filters, text search, custom product cards, and client-side filtering across the product set. The Hydrogen starter route `/collections/all` instead has a generic eight-product cursor-paginated grid without those filters. Individual `/collections/:handle` pages use another generic paginated layout.

## Decision

Use `/collections/all` as the canonical full-catalog URL and move the existing Nenúfar catalog experience to that route without removing its filters. The initial implementation preserves the current complete product-set loading model, deduplication across collection memberships, client-side catalog/technique/search filtering, and card presentation.

The migration is split into three independent chunks:

1. Replace `/collections/all` with the current Nenúfar catalog experience.
2. Adapt individual `/collections/:handle` routes to the same visual system in fixed-collection mode, omitting the redundant catalog selector.
3. Redirect `/catalogo` to `/collections/all` and update all internal links.

## Consequences

- `/collections/all` does not retain the starter's eight-item cursor pagination, because that pagination cannot preserve the current complete client-side filters without a separate server-driven filtering design.
- The existing catalog data query caps its first pass at 100 collections and 100 products per collection. This remains acceptable for the current modest catalog but needs a future, separately approved server-filtered pagination strategy as the assortment grows.
- `/catalogo` now permanently redirects to `/collections/all` while preserving query parameters from existing incoming links.
- Individual collection pages retain canonical collection URLs and gain a tailored catalog presentation in their later chunk.

## Rollback

Revert individual migration commits. Reverting the final chunk restores `/catalogo` as a directly rendered catalog route.
