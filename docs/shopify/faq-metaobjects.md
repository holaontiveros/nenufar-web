# Shopify FAQ metaobjects

The homepage FAQ section is sourced from Shopify metaobjects rather than code. Each FAQ may belong to a reusable group, so merchants choose the group while editing the FAQ instead of maintaining a hard-coded category list.

## Definitions

Create both definitions in **Content → Metaobjects** with public Storefront API access and standard merchant Admin access.

| Store | FAQ item type | FAQ group type |
| --- | --- | --- |
| Development | `faq_item` | `faq_group` |
| Production | `nenufar_faq_item` | `nenufar_faq_group` |

### FAQ group

| Field | Key | Type | Required |
| --- | --- | --- | --- |
| Title | `title` | Single-line text | Yes |
| Description | `description` | Multi-line text | No |
| Position | `position` | Integer | Yes |

### FAQ item

| Field | Key | Type | Required |
| --- | --- | --- | --- |
| Question | `question` | Single-line text | Yes |
| Answer | `answer` | Multi-line text | Yes |
| Group | `group` | Single metaobject reference constrained to that store's FAQ group type | No |

The optional reference keeps existing entries valid while groups are introduced. The group definition—not a choice list—is the source of the group title, description, and display order.

## Current development-store entries

| Handle | Question |
| --- | --- |
| `tiempo-de-produccion` | ¿Cuánto tarda un pedido personalizado? |
| `muestra-previa` | ¿Puedo ver una muestra antes de producir? |
| `pedidos-para-empresas` | ¿Hacen pedidos para empresas? |

The entries were created in `nenu-from-react.myshopify.com`. Assign groups after creating matching development group entries. Copy only merchant-approved content when preparing another store, then confirm storefront access remains public.

## Storefront behavior

`app/routes/_index.tsx` queries up to 20 entries of both the development and production FAQ types using the Hydrogen storefront client. `app/components/NenufarStory.tsx` groups complete FAQ entries by the referenced group, sorts groups by `position`, and renders each group's title and description. FAQs without a group remain visible under `Preguntas frecuentes` until they are assigned.
