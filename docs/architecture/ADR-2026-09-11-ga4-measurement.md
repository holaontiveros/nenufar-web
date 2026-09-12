# ADR: GA4 measurement with GTM and a Shopify Custom Pixel

## Status

Approved on 2026-09-11.

## Context

Nenúfar needs GA4 ecommerce measurement across the Hydrogen storefront and Shopify checkout. Checkout is hosted by Shopify, so the storefront cannot reliably instrument checkout stages or the completed order itself.

## Decision

- Load GTM container `GTM-KZQS4HLW` from Hydrogen only after Shopify Customer Privacy grants analytics processing.
- Use the GTM container for storefront events and GA4 measurement ID `G-V42ETMD9GE`.
- Use a Shopify Custom Pixel for checkout-stage and purchase events. The purchase event is emitted only there to avoid duplicate revenue.
- Use basic Google Consent Mode v2: Google and GTM requests are withheld until the Shopify privacy banner records analytics consent.
- Exclude personalized copy, artisan instructions, customer details, addresses, email addresses, phone numbers, and other PII from every analytics payload.

## Consequences

The Shopify Customer Privacy banner is the consent authority. GTM tags must also be configured to require analytics consent. The storefront must keep the GTM container ID in `PUBLIC_GTM_CONTAINER_ID`; it is a public identifier, not a secret.

## Alternatives considered

- Direct GA4 in Hydrogen only: rejected because it cannot cover Shopify checkout and purchase reliably.
- Google & YouTube app only: rejected because it does not provide the required custom storefront event coverage.
- Advanced Consent Mode: deferred because it would send cookieless pings before a decision, which was not selected for this store.

## Rollback

Remove `PUBLIC_GTM_CONTAINER_ID`, the GTM loader, and its CSP directives. Disable the Custom Pixel before reverting any GA4 destination configuration.
