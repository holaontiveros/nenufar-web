# Shopify custom data for Nenúfar

## Product metafields

Create the following Product definitions in **Settings > Custom data > Products** before importing data. All use the `custom` namespace and must allow public Storefront API access.

| Name | Key | Type | Product-page use |
| --- | --- | --- | --- |
| Technique | `technique` | Single-line text | Technique label and catalogue filter. |
| Materials | `materials` | Multi-line text | Materials detail card. |
| Production time | `lead_time` | Single-line text | Customer-facing lead-time copy. |
| Badge | `badge` | Single-line text | Short image-overlay label. |
| Featured | `is_popular` | True/false | Optional featured label. |
| Allows personalization | `allow_custom_text` | True/false | Canonical personalized (`true`) / non-personalized (`false`) switch. |
| Legacy personalization placeholder | `custom_text_placeholder` | Single-line text | Retained for older imports; not used by the structured product form. |
| Material label | `material_label` | Single-line text | Hero material/category pill. |
| Dimensions | `dimensions` | Multi-line text | Materials & dimensions tab. |
| Approximate weight | `weight` | Single-line text | Materials & dimensions tab. |
| Package includes | `package_includes` | List of single-line text | Package-contents card. |
| Workshop process | `making_process` | List of metaobject references to `product_process_step` | Workshop tab. |
| Shipping details | `shipping_details` | Multi-line text | Shipping & packaging tab. |
| Packaging details | `packaging_details` | Multi-line text | Shipping & packaging tab. |
| Care guide | `care_guide` | Multi-line text | Care tab. |
| Personalization configuration | `personalization_config` | Metaobject reference to `product_personalization` | Required for structured personalized products. |

## Collection metafields

Create the following Collection definitions in **Settings > Custom data > Collections**. All use the `custom` namespace.

| Name | Key | Type | Storefront use |
| --- | --- | --- | --- |
| Homepage visibility | `show_on_home` | True/false | Set to `true` to include the collection in the homepage’s responsive three-column collection grid. The definition and values must have public Storefront API access. |

## Required metaobjects

Create public, merchant-managed definitions for `product_personalization` and `product_process_step` before linking their entries through the two reference metafields. Field definitions, expected values, and the production migration order are in [product-page-data.md](product-page-data.md).

## Demo CSV import

1. Import [nenufar-demo-products.csv](nenufar-demo-products.csv) through **Products > Import**. It is UTF-8 and contains products, variants, external demo images, and the original CSV-compatible scalar metafields: `technique`, `materials`, `lead_time`, `badge`, `is_popular`, `allow_custom_text`, and `custom_text_placeholder`.
2. Native Shopify collections—not catalogue metafields—classify seasonal catalogue content. Add imported products to the intended collections after import.
3. The CSV cannot create `product_personalization` or `product_process_step` entries, nor safely populate their reference metafields. Create these entries and assign `personalization_config` / `making_process` in Shopify Admin after the import.
4. Add the remaining product-page fields from the table above with merchant-verified data, then publish the products to the storefront channel.
5. Replace demo copy, prices, images, and SKUs directly in Shopify before production. The storefront reads the configured store, so no code change is needed for content updates.

Demo SKUs are not Shopify variant IDs. Shopify creates the real GraphQL IDs on import; the storefront queries them automatically.
