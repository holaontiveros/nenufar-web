# ADR: Build the catalog from Shopify collections

## Status

Approved.

## Context

The catalog route used a hardcoded list of seasonal collection handles. New Shopify collections or renamed seasonal collections therefore required a code change before their products could appear.

## Decision

Query Shopify collections dynamically and build the catalog from each collection's product membership. Deduplicate products by Shopify product ID while retaining all collection names and handles for filtering. The homepage's `show_on_home` flag remains independent and only controls homepage collection cards.

## Consequences

- Merchants can add, rename, or reorder collections without editing code.
- Products assigned to multiple collections appear once in the catalog and remain filterable by every assigned collection.
- The catalog query remains cached with `CacheLong`; a production redeploy busts the cache after structural catalog changes.

## Rollback

Restore the seasonal handle allowlist and single-collection fields if dynamic collection membership causes an unexpected catalog scope.
