# Checkout branding

Shopify Checkout is styled in **Settings → Checkout → Nenufar Regalos
Personalizados configuration → Edit → Settings**. It is a Shopify-managed
surface, so it shares the storefront palette through the available flat-color
controls rather than the Hydrogen gradient treatment.

## Production configuration

| Shopify control | Nenúfar token | Value |
| --- | --- | --- |
| Main background | `--color-canvas` | `#FAF8F6` |
| Accent (links and selections) | `--color-brand` | `#DB2777` |
| Primary button | `--color-brand` | `#DB2777` |
| Header accent (links and cart icon) | `--color-brand` | `#DB2777` |
| Input-field error | `--color-danger` | `#E11D48` |
| Header background | `--color-surface` | Shopify default / `#FFFFFF` |

`#DB2777` is also saved to Shopify's checkout color palette for reuse. Shopify
Checkout does not offer a compatible multi-stop button gradient, so its primary
actions intentionally use the solid Nenúfar brand pink.

## Updating the palette

1. Update the semantic token in `app/styles/app.css` if the storefront color
   itself changes.
2. Apply the matching flat color to the Shopify checkout controls above.
3. Update this document and add a dated entry under `docs/changes/`.
4. Make a test checkout to confirm contrast and all checkout states.

The checkout configuration is stored in Shopify Admin, not in this repository;
this document is the source-controlled record of the intended mapping.
