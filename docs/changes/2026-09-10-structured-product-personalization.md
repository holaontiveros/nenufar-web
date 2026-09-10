# Structured product personalization

## Objective

Render the approved Shopify `product_personalization` metaobject as a structured product-form experience and retain every applicable buyer choice with the Shopify cart line.

## Scope

- Query the product's `custom.personalization_config` reference and its approved fields.
- Display the primary text, font, motif, and optional artisan-note controls when the product is both enabled for personalization and has a valid configuration.
- Submit the documented `Personalización`, `Tipografía`, `Motivo`, and `Indicaciones para el artesano` attributes with the cart line.
- Add regression coverage for complete and empty attribute payloads.

## Decisions

- A product with an absent or invalid configuration has no personalization form, even if its enablement metafield is true. This keeps incomplete dev-store data from reaching checkout as an ambiguous product request.
- The selected first font and motif are submitted when those options are configured. Text and artisan-note attributes are submitted only after non-empty input.
- No fallback to the legacy `custom_text_placeholder` metafield is retained for this structured form.

## Files modified

- `app/components/ProductForm.tsx`
- `app/components/ProductForm.test.ts`
- `app/routes/products.$handle.tsx`
- `app/styles/app.css`
- `docs/shopify/product-page-data.md`
- `storefrontapi.generated.d.ts`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `git diff --check`

## Risks and rollback

- The personalization controls depend on public storefront access for the referenced metaobject and fields. Missing access leaves the form hidden rather than partially rendered.
- Revert this commit to restore the former single-text personalization form.
