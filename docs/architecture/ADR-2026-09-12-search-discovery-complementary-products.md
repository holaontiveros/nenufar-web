# ADR: Source complementary product cards from Shopify Search & Discovery

## Status

Approved and implemented on 2026-09-12.

## Context

The product page already has a lower “other pieces” section sourced from the product’s first native Shopify collection. The new section has a different merchandising purpose: show intentionally paired add-on products above that collection section.

## Decision

Use the Storefront API `productRecommendations` query with `intent: COMPLEMENTARY` and the current product handle. Shopify Search & Discovery is the single merchant-facing configuration surface for this data.

The storefront renders the section only when Search & Discovery returns one or more configured products. The query uses `CacheShort()` to keep recommendation changes responsive without making a product-page request uncached.

## Consequences

- No custom product metafield, metaobject, duplicate data entry, or storefront fallback is introduced.
- Merchants configure complementary items in Search & Discovery for each product.
- The existing first-collection related-products section remains unchanged and continues to show other products in the same collection.
- Search & Discovery can return up to ten complementary recommendations; the storefront displays the returned, published products in its configured order.

## Rollback

Revert the complementary-products implementation commit. This removes the new section and query while leaving Search & Discovery configuration and the existing collection-based related-products section untouched.
