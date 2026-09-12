# ADR: Shopify-managed footer social links

## Status

Approved and implemented on 2026-09-11.

## Decision

Use the merchant-owned `nenufar_social_link` metaobject for a social profile and the public Shop metafield `social.links` as its ordered list of references. Use Shopify Navigation handle `footer` for footer navigation and Shopify's built-in policies for legal links.

## Consequences

- Social profiles, navigation, and policies can change without a storefront code change.
- The storefront renders social links only after entries are created and assigned to `social.links`.
- The same definitions need recreation when moving to another Shopify store.

## Rollback

Restore the static footer implementation. The Shopify custom-data definitions and entries can remain unused.
