# Add checkout GA4 Custom Pixel

## Objective

Track Shopify checkout progression and one canonical GA4 purchase event.

## Scope

- Version the Shopify Custom Pixel source and GTM setup instructions.
- Map checkout standard events to GA4 `begin_checkout`, `add_shipping_info`, `add_payment_info`, and `purchase` events.
- Require Shopify Analytics consent before the pixel is connected.

## Decisions

Checkout and purchase belong in the Custom Pixel because Shopify hosts checkout. The pixel loads the approved GTM container in Shopify's sandbox, emits only GA4 commerce fields, and uses order ID (with checkout token only as a technical fallback) as the transaction ID. It must be the only purchase source.

## Files modified

- `docs/shopify/ga4-custom-pixel.js`
- `docs/shopify/ga4-gtm-configuration.md`

## Validation

- Source reviewed against Shopify Web Pixels standard-event documentation.
- The Custom Pixel named `Nenúfar GA4 checkout` was created in the production Shopify admin, the code was saved, and its Customer privacy requirement was set to Analytics only.
- A test payment remains required after the Custom Pixel is connected.

## Risks and rollback

Incorrect GTM triggers can duplicate events. Disconnect the Custom Pixel in Shopify Customer events to stop checkout and purchase tracking immediately.
