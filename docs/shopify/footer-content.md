# Footer content configuration

## Navigation

Create or edit the Shopify Navigation menu with handle `footer`. Its top-level items appear in the footer's **Explora** section in their configured order.

## Social profiles

Create entries under Content → Metaobjects → **Nenúfar Social Link** and assign them, in display order, to Settings → Custom data → Store → **Footer social links**.

| Field | Required | Values |
|---|---:|---|
| Platform | Yes | `instagram`, `facebook`, `tiktok`, `pinterest`, `youtube`, `x`, `linkedin` |
| Profile URL | Yes | Public absolute profile URL |
| Accessible label | No | Screen-reader label; platform is used when blank |

The definitions are `nenufar_social_link` and `social.links` (Shop list of references). Both have public Storefront API read access.

## Policies

Enable or enter policy text in Shopify Admin. The footer and `/policies` automatically show only enabled privacy, shipping, terms of service, refund, and subscription policies.

## Store migration

Custom-data definitions and their entries are store-scoped. Recreate the two definitions and repopulate `social.links` in any new production store.
