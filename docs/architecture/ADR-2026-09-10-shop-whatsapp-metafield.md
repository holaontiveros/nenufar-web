# ADR: Source the WhatsApp contact number from a shop metafield

- Status: Approved
- Date: 2026-09-10

## Context

The WhatsApp number was embedded in storefront source. Changing the contact number required a code edit and deployment, even though it is shop-wide merchant content.

## Decision

Store the global number in the merchant-managed Shop metafield `contact.whatsapp_number`.

- Owner: Shop
- Type: `single_line_text_field`
- Format: international E.164 digits without a leading `+` or punctuation
- Storefront access: `PUBLIC_READ`

The Hydrogen root loader reads this metafield once, converts it into the WhatsApp conversation URL, and provides that URL to the shared header and homepage. There is no code-based phone-number fallback. If the value is absent or invalid, WhatsApp actions are not rendered rather than pointing customers at an outdated number.

## Alternatives considered

1. Keep the number in `app/lib/contact.ts`. This is simple but requires a deployment for an operational contact change.
2. Use a general-purpose contact metaobject. This is more flexible, but adds a container and reference relationship for one shop-wide value.
3. Use a Shop metafield. This directly models a global setting with no extra content entry. This option was approved.

## Impact and migration

The development store has the definition and current value. Each new store needs the same public metafield definition and its local number before release. The storefront needs no code change when a merchant updates the value in Shopify Admin.

## Risks and rollback

An absent, malformed, or non-public value hides WhatsApp actions. This prevents customer contact through a stale hard-coded endpoint. To roll back, revert this chunk and restore the previous source-based configuration, or correct the metafield in Shopify Admin.
