# Track core storefront ecommerce events

## Objective

Expose consent-safe, GA4-compatible storefront events through the approved GTM data layer.

## Scope

- Translate Hydrogen analytics events into GA4 ecommerce events: `page_view`, `view_item`, `view_cart`, `add_to_cart`, `remove_from_cart`, and `view_search_results`.
- Send standard product, variant, price, quantity, vendor, and product-type data only.
- Keep checkout and purchase events out of this chunk; those belong to the Shopify Custom Pixel.

## Decisions

The adapter uses Hydrogen's Analytics Provider rather than instrumenting individual fetcher responses. It registers itself with Hydrogen before route-level view events can publish, so their initial payload is queued until the GTM subscriber is ready. This covers cart actions from every surface consistently and keeps the payload free of personalization attributes and customer data.

## Files modified

- `app/components/StorefrontAnalytics.tsx`
- `app/root.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Shopify Hydrogen skill validation was attempted but its bundled validator cannot resolve its own `typescript` dependency; project typecheck and production build passed.

## Risks and rollback

The GTM container must create GA4 tags for the named data-layer events. Removing `StorefrontAnalytics` immediately stops the storefront event bridge without changing cart behaviour.
