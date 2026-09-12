# GA4 and GTM configuration

## Identifiers

- GTM container: `GTM-KZQS4HLW`
- GA4 measurement ID: `G-V42ETMD9GE`

## GTM setup

1. Create a Google tag with measurement ID `G-V42ETMD9GE`.
2. Set its `send_page_view` configuration parameter to `false`; page views are emitted explicitly by the storefront bridge.
3. Configure the tag and all GA4 Event tags to require Analytics consent.
4. Create GA4 Event tags for each event below, using the same event name and the data-layer variables listed.

| Event | Required parameters |
| --- | --- |
| `page_view` | `page_location` |
| `view_item` | `currency`, `value`, `items` |
| `view_cart` | `currency`, `value`, `items` |
| `add_to_cart` | `currency`, `value`, `items` |
| `remove_from_cart` | `currency`, `value`, `items` |
| `view_search_results` | `search_term` |
| `begin_checkout` | `currency`, `value`, `items` |
| `add_shipping_info` | `currency`, `value`, `items` |
| `add_payment_info` | `currency`, `value`, `items` |
| `purchase` | `transaction_id`, `currency`, `value`, `shipping`, `tax`, `items` |

Use exact custom-event triggers for these names. Do not fire a separate purchase tag from the Hydrogen storefront; `purchase` is emitted only by the Custom Pixel.

## Shopify Custom Pixel

Create a Custom Pixel named `Nenúfar GA4 checkout` in **Settings → Customer events**. Paste the code from `ga4-custom-pixel.js`, then set its Customer privacy requirement to **Analytics** before connecting it.

The pixel sends no email, phone number, address, personalization text, artisan note, or customer identifier. Its checkout payload contains only commerce fields needed by GA4.

## Test

1. Grant Analytics consent in the storefront privacy banner.
2. Verify storefront events in GTM Preview and GA4 DebugView.
3. Run one test payment and verify checkout events and exactly one purchase with a transaction ID.
4. Use Shopify Pixel Helper for Custom Pixel diagnostics. Google Tag Assistant cannot inspect tags inside Shopify's pixel sandbox.
