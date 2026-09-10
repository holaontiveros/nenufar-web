# Shopify contact metafields

## WhatsApp number

The storefront reads its global WhatsApp destination from a Shop metafield.

| Setting | Value |
| --- | --- |
| Owner | Shop |
| Namespace | `contact` |
| Key | `whatsapp_number` |
| Name | WhatsApp number |
| Type | Single-line text |
| Storefront access | Public read |
| Value format | International E.164 digits only; no `+`, spaces, or punctuation |

The current development-store value is `529999496396`.

## Storefront behavior

`app/root.tsx` reads `contact.whatsapp_number` through the Hydrogen Storefront API and turns it into a prefilled WhatsApp conversation URL. `Header` and the homepage receive that URL from the root loader; no component owns a phone number directly.

If the value is blank or has no digits, WhatsApp actions do not render. This intentionally avoids sending customers to a stale fallback contact.

## New store setup

Before releasing a storefront connected to another Shopify store, recreate this definition on the Shop owner, set storefront access to public read, and enter that store's number in the documented format.
