# Product-page Shopify data model

This is the approved schema for the Nenúfar product-page rebuild. The definitions below and one personalized reference seed were created in the development store on 2026-09-10. The product page reads the personalization configuration, product-detail fields, and workshop-step references; related products remain pending.

## Existing product metafields to retain

All use the `custom` namespace.

| Key | Type | Product-page use |
| --- | --- | --- |
| `technique` | Single-line text | Technique label and details content. |
| `materials` | Multi-line text | Materials card; one line per material. |
| `lead_time` | Single-line text | Production/delivery promise. |
| `badge` | Single-line text | Image badge. |
| `is_popular` | True/false | Optional featured badge. |
| `allow_custom_text` | True/false | Canonical personalized (`true`) / non-personalized (`false`) switch. |
| `custom_text_placeholder` | Single-line text | Legacy basic personalization placeholder during migration. |

## New product metafields

All use the `custom` namespace and require public storefront read access.

| Name | Key | Type | Required when |
| --- | --- | --- | --- |
| Material label | `material_label` | Single-line text | The title-area material/category pill is shown. |
| Dimensions | `dimensions` | Multi-line text | The product has measurements or capacity. |
| Approximate weight | `weight` | Single-line text | Weight is useful to the buyer. |
| Package includes | `package_includes` | List of single-line text | The package-contents card is shown. |
| Workshop process | `making_process` | List of metaobject references to `product_process_step` | The workshop tab is shown. |
| Shipping details | `shipping_details` | Multi-line text | The shipping/production card is shown. |
| Packaging details | `packaging_details` | Multi-line text | The packaging/protection card is shown. |
| Care guide | `care_guide` | Multi-line text | The care tab is shown. |
| Personalization configuration | `personalization_config` | Metaobject reference to `product_personalization` | `allow_custom_text` is `true`. |

## Metaobject: `product_personalization`

Create a merchant-managed `product_personalization` definition with public storefront read access. Each entry is reusable by multiple products.

| Field key | Type | Required | Use |
| --- | --- | --- | --- |
| `text_label` | Single-line text | Yes | Label for the primary personalization input. |
| `text_placeholder` | Single-line text | Yes | Example text for that input. |
| `character_limit` | Integer | Yes | Client-side maximum for the primary input. |
| `font_options` | List of single-line text | No | Typography choices, in display order. |
| `motif_options` | List of single-line text | No | Motif/design choices, in display order. |
| `preview_copy` | Multi-line text | No | Copy describing the digital-preview process. |
| `artisan_note_label` | Single-line text | No | Optional note-field label. |
| `artisan_note_placeholder` | Single-line text | No | Optional note-field example. |
| `artisan_note_enabled` | True/false | Yes | Enables the optional artisan-note input. |

The entry handle should be descriptive and stable, for example `termo-slim-inicial`.

## Metaobject: `product_process_step`

Create a merchant-managed `product_process_step` definition with public storefront read access.

| Field key | Type | Required | Use |
| --- | --- | --- | --- |
| `title` | Single-line text | Yes | Workshop step heading. |
| `body` | Multi-line text | Yes | Workshop step explanation. |
| `position` | Integer | Yes | Visible step number. |

The product's `custom.making_process` reference list controls which steps appear and their order. The `position` value is displayed, not used to reorder the list.

## Development-store seed

The existing personalized demo product `termo-slim-pastel-madre` now provides the first complete reference record:

- `custom.material_label`: `Acero Térmico`
- Dimensions, weight, package includes, shipping details, packaging details, and care guide
- `custom.personalization_config` referencing `product_personalization/termo-slim-inicial`
- `custom.making_process` referencing these ordered `product_process_step` entries:
  1. `maquetacion-ajuste-tipografico`
  2. `visto-bueno-whatsapp`
  3. `corte-laser-empaque`

The personalization configuration contains the Spanish labels, 60-character limit, typography options, motif options, preview copy, and optional artisan-note copy from the approved reference. All values and references were verified through the public development Storefront API.

The clearly labelled development-only product `dev-caja-haya-blank-20260910` provides the non-personalized reference record. It has `custom.allow_custom_text = false`, a $14 test variant, relevant product-detail values, and no personalization configuration or workshop-process references. It is published only to the `Nenúfar Web Dev` storefront publication and must not be migrated to production.

## Customer personalization data

The product form renders only when both `allow_custom_text` is `true` and `personalization_config` resolves to a public metaobject. It submits these cart-line attributes when the corresponding configuration input is present:

| Attribute | Source |
| --- | --- |
| `Personalización` | Primary text input. |
| `Tipografía` | Selected font option. |
| `Motivo` | Selected motif option. |
| `Indicaciones para el artesano` | Optional artisan note. |

These attributes use Shopify's existing cart and checkout path; no Admin token, custom backend, or new persistence layer is required.

## Related products

Related cards use the current product's native Shopify collection membership. The selected collection provides both the other products and the `/catalogo?collection=<handle>` link. No product metafield is required for this feature.

If a product belongs to more than one collection, the selection rule is pending before implementation. See `docs/plans/product-page-roadmap.md`.

## Migration checklist

1. Create the two metaobject definitions with public storefront read access.
2. Create the new product metafield definitions with public storefront read access.
3. Create reusable personalization and process-step entries.
4. Populate the new values for each product.
5. Link personalized products to a `product_personalization` entry.
6. Verify product collection membership and choose the related-products selection rule.
7. Validate data through Storefront API before enabling each UI chunk.
