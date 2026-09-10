# Shopify FAQ metaobjects

The homepage FAQ section is sourced from Shopify metaobjects rather than code.

## Definition

Create a metaobject definition in **Content → Metaobjects** with these values:

| Setting | Value |
| --- | --- |
| Name | FAQ item |
| Type | `faq_item` |
| Storefront access | Public read |
| Field: Question | Key `question`; single-line text; required |
| Field: Answer | Key `answer`; multi-line text; required |

Keep the default merchant read/write access in Shopify Admin. Both fields are required because the storefront intentionally omits incomplete entries.

## Current development-store entries

| Handle | Question |
| --- | --- |
| `tiempo-de-produccion` | ¿Cuánto tarda un pedido personalizado? |
| `muestra-previa` | ¿Puedo ver una muestra antes de producir? |
| `pedidos-para-empresas` | ¿Hacen pedidos para empresas? |

The entries were created in `nenu-from-react.myshopify.com`. Copy them when preparing another store, then confirm storefront access remains public.

## Storefront behavior

`app/routes/_index.tsx` queries up to 20 entries of type `faq_item` using the Hydrogen storefront client. `app/components/NenufarStory.tsx` renders them as the expandable FAQ section. The list contains only entries with both a question and an answer.
