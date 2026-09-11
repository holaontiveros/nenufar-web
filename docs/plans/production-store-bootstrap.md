# Production-store bootstrap plan

## Goal

Prepare the client-transfer Shopify store to become Nenúfar’s production commerce source without importing any development/demo products, demo content, store IDs, files, or credentials.

## Guardrails

- The transfer store is the only target for this plan once its `*.myshopify.com` domain is confirmed.
- Do not relink the existing development Hydrogen storefront or reuse its Storefront token, Oxygen environment, session secret, product records, image URLs, metaobject entries, or WhatsApp number.
- Create schemas first, then merchant-verified values, then storefront/runtime configuration. A schema’s existence must be read back through Admin and Storefront APIs before the next phase.
- No product import belongs to this bootstrap. The merchant will create or import real product data separately.

## Execution order

### 0. Establish the production boundary

1. Authenticate Shopify CLI against the transfer store using its exact `*.myshopify.com` domain.
2. Read the shop identity, plan, primary domain, Storefront publication, and existing custom-data definitions.
3. Record the target domain and a timestamp in the production readiness log. Do not record tokens or secrets.

### 1. Create merchant-owned custom-data schemas

Create the following definitions with merchant-managed Admin access and public Storefront read access. Do not write values or entries in this phase.

| Owner | Namespace / type | Fields or keys |
| --- | --- | --- |
| Product | `custom` | `technique`, `materials`, `lead_time`, `badge`, `is_popular`, `allow_custom_text`, `custom_text_placeholder`, `material_label`, `dimensions`, `weight`, `package_includes`, `making_process`, `shipping_details`, `packaging_details`, `care_guide`, `personalization_config` |
| Collection | `custom.show_on_home` | Boolean, controls cards on the homepage collection grid. |
| Shop | `contact.whatsapp_number` | Single-line text, E.164 digits only. Leave blank until the verified production number is supplied. |
| Metaobject | `nenufar_faq_item` | Required `question` and `answer` fields. |
| Metaobject | `nenufar_product_personalization` | The fields specified in [product-page-data.md](../shopify/product-page-data.md). |
| Metaobject | `nenufar_product_process_step` | Required `title`, `body`, and `position` fields. |

After creation, read every definition back from Admin and verify a representative Product, Collection, Shop, and metaobject query can expose the intended public fields through the Storefront API.

### 2. Configure the real commerce content

The merchant populates real products, variants, media, inventory, collection memberships, collections, policies, shipping, taxes, payments, and markets. Then enter only verified values:

1. Mark selected real collections with `custom.show_on_home = true`.
2. Create real FAQ entries.
3. Set the confirmed WhatsApp number.
4. Create reusable personalization/process entries and assign them only to matching real products.
5. Populate product-specific detail values and choose each product’s personalized/non-personalized mode.

See [store-readiness-runbook.md](../shopify/store-readiness-runbook.md) for the complete merchant acceptance checklist.

### 3. Create the production Hydrogen/Oxygen boundary

1. Create a distinct Hydrogen storefront attached to the transfer store.
2. Create a new Storefront API token and production-specific `SESSION_SECRET`.
3. Configure the production Oxygen environment with the target store’s values; none belong in Git.
4. Link/deploy a preview to the new storefront, then test cart and checkout against a permitted real/test order.
5. Obtain explicit approval before a live production deployment or custom-domain cutover.

## First executable chunk

Once the domain is supplied, perform a read-only audit of the transfer store and then create only the missing schemas from phase 1. The change record must include the exact definitions created, read-back results, and rollback notes. No products, demo entries, or values will be written.

## Transfer-store progress

On 2026-09-10, the transfer store `nenufar-regalos-personalizados-xyrqi3rj.myshopify.com` was audited. It had no existing custom-data definitions. The independent Product, Collection, and Shop definitions in phase 1 were created and read back with public Storefront access. No values, products, collections, entries, files, or demo data were written.

The three legacy metaobject types remain unavailable to the CLI application: Shopify reports that `faq_item`, `product_personalization`, and `product_process_step` are reserved for another application. On 2026-09-10, an authenticated merchant Shopify Admin session created the approved merchant-owned production alternatives `nenufar_faq_item`, `nenufar_product_personalization`, and `nenufar_product_process_step`, all with public Storefront API access. No entries or values were added.

The two Product reference metafields were created on 2026-09-10 as the approved constrained pair: `custom.making_process` is a list reference to `nenufar_product_process_step`, and `custom.personalization_config` is a single reference to `nenufar_product_personalization`. Both have public Storefront API access. No generic substitute references, product values, or entries were created. See [ADR-2026-09-10-production-metaobject-identifiers.md](../architecture/ADR-2026-09-10-production-metaobject-identifiers.md).

The deployment-readiness audit confirmed that `https://nenufar.mx` is the transfer store’s primary domain and that the standard `Online Store`, `Shop`, and `Point of Sale` publications exist. No Hydrogen storefront or production Oxygen environment has been created yet.

On 2026-09-10, the separate Hydrogen storefront `Nenúfar Web Production` was created and linked from the isolated local worktree `/Users/javo/projects/nenufar-web-production`. Its default Oxygen environments are `production` and `preview`; the production environment currently points to an Oxygen development URL and has not been made live on `nenufar.mx`. Development linkage, deployments, and credentials remain untouched.

An initial Preview deployment completed successfully at `https://01m271zmxxqee4jn11hc4sjjz8-570f5129dce95a62cc8d.myshopify.dev`. Oxygen confirmed it was routable. Unauthenticated HTTP validation receives a `403` after redirect because this preview is protected; it is not a production-domain failure. The production environment and `nenufar.mx` remain unchanged.

## Rollback

For a schema bootstrap failure, correct or remove only definitions created in that incomplete chunk after confirming they have no values or references. Never delete merchant-created products, orders, files, or existing custom data as part of rollback.
