# Align the product-process tab with product-detail tabs

## Objective

Simplify workshop process cards and bring their heading and body treatment into
the same visual language as the other product-detail tabs.

## Scope

- Removed the per-step visible `<h3>` title.
- Kept each step's numbered marker and rich-text body.
- Styled the process tab's `<h2>` as the compact, uppercase section identifier
  used by other product-detail cards.
- Normalized process rich-text body spacing and muted text treatment to match
  the remaining detail panels.

## Decisions

- The process metaobject title remains in the product data model and as part of
  each rendered item's stable React key, but it is no longer visible in the
  card.
- The tab label and process heading identify the section; number and body are
  sufficient to communicate each individual step.
- No Shopify schema, query, or content change is required.

## Files modified

- `app/components/ProductDetailsTabs.tsx`
- `app/styles/app.css`
- `docs/changes/2026-09-13-product-process-tab-consistency.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

- Confirm a product with workshop-process entries shows each number and body
  correctly, without the previously visible per-step title.
- Revert this chunk to restore process-card titles and their prior heading
  presentation.
