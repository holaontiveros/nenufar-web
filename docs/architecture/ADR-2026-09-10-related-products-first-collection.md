# ADR: Use the first Shopify collection for product-page related products

- Status: Approved
- Date: 2026-09-10

## Context

Related products must be sourced from the current product's native Shopify collection membership. A product can belong to more than one collection, so the storefront needs a deterministic selection rule without introducing another product metafield or merchant-maintained relationship.

## Decision

Use the first collection returned by the Storefront API for the current product. Render other products from that collection and route the section action to `/catalogo?collection=<handle>`.

This was explicitly approved by the product owner on 2026-09-10.

## Alternatives considered

1. Prefer a seasonal collection based on a fixed priority list.
2. Create a dedicated `related_collection` product metafield.
3. Use the first native collection returned by Shopify.

The third option is selected because it has no additional data-maintenance cost and respects the user-approved source of truth.

## Impact, migration, and rollback

Merchants control the source collection by managing native product membership and collection order in Shopify. No migration or new definition is needed.

If a more specific merchandising rule is needed later, replace this query-selection logic in a dedicated approved chunk. Reverting that chunk restores the page without a related-products section.
