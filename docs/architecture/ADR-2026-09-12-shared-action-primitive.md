# ADR: Shared action primitive

## Status

Approved and implemented for primary CTAs on 2026-09-12.

## Context

The storefront had several visually similar conversion CTAs with independent CSS: homepage catalogue, FAQ, product add-to-cart, and cart checkout. Their markup, focus styles, spacing, icon sizes, and disabled states could drift despite representing the same visual priority.

## Options considered

1. Keep bespoke component-specific CSS for every CTA.
2. Use CSS utility classes only on existing markup.
3. Introduce a shared presentation primitive with semantic entry points for native buttons, anchors, and React Router links.

## Decision

Use option 3. `app/components/Action.tsx` exports `ActionButton`, `ActionAnchor`, and `ActionLink`. They share the same variant and size API while rendering the correct native element for the interaction:

- `ActionButton` for form submission and in-page state changes.
- `ActionAnchor` for external destinations, including Shopify checkout.
- `ActionLink` for internal React Router navigation.

The initial supported vocabulary is `primary`, `secondary`, `whatsapp`, `ghost`, `icon`, `choice`, and `stepper`, with `small`, `medium`, `large`, `icon-sm`, and `icon-md` sizes. `primary`, `whatsapp`, and `icon` are styled and migrated; the remaining variants are intentionally deferred.

## Consequences

- Primary CTAs now share focus, hover, disabled, icon, spacing, and gradient rules.
- Existing elements retain their navigation/submission behavior and accessibility semantics.
- New visual variants must be introduced through this API rather than duplicated page-specific CTA styles.
- The component is presentation-only: it owns no Shopify, cart, analytics, or routing state.

## Rollback

Revert the migration commit to restore the prior component-specific CTA markup and CSS. No persisted data, Shopify configuration, or checkout behavior is changed.
