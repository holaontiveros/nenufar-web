# Product-page documentation follow-up

## Objective

Align the Shopify setup and release documentation with the implemented product-page data, approved Add to Cart flow, and explicitly deferred reviews.

## Scope

- Document every current product metafield and the two required metaobjects.
- Explain which demo CSV values import directly and which custom-data references require Shopify Admin configuration after import.
- Update the store-readiness checklist and product-page roadmap to reflect completed work.
- Record that direct Buy now is omitted and product reviews are deferred.

## Decisions

- Add to Cart is the only product-page purchase action; customers continue through the existing cart and Shopify checkout flow.
- Reviews remain out of scope until a verified provider or merchant-managed source is approved.

## Files modified

- `docs/shopify/metafields.md`
- `docs/shopify/store-readiness-runbook.md`
- `docs/plans/product-page-roadmap.md`

## Validation

- Documentation reviewed against the implemented product queries, cart form, and current demo CSV headers.
- `git diff --check`

## Risks and rollback

- A target store still requires merchant-verified values, public definitions, metaobject entries, and a final Storefront API read-back before production.
- Revert this documentation-only commit to restore the prior setup instructions.
