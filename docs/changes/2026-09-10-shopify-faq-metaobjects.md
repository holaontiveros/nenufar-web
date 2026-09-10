# Source homepage FAQs from Shopify metaobjects

## Objective

Make the homepage FAQ content editable in Shopify Admin instead of hard-coded in the storefront.

## Scope

- Created the `faq_item` metaobject definition in the development store with required question and answer fields.
- Seeded the three FAQ entries that previously existed in the homepage source.
- Queried public FAQ metaobjects in the homepage Hydrogen loader.
- Updated the FAQ component to render loader data.
- Generated current Storefront API types and documented setup for future stores.

## Decisions

This uses the approved merchant-managed `faq_item` metaobject model described in `docs/architecture/ADR-2026-09-10-shopify-faq-metaobjects.md`. The loader ignores incomplete records so malformed admin content does not render a broken disclosure item.

## Modified files

- `app/routes/_index.tsx`
- `app/components/NenufarStory.tsx`
- `storefrontapi.generated.d.ts`
- `docs/architecture/ADR-2026-09-10-shopify-faq-metaobjects.md`
- `docs/shopify/faq-metaobjects.md`

## Validation

- `npm run codegen`
- `npm test`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

All completed successfully.

## Remaining risks

FAQ display order follows Shopify's metaobject connection order. If editorial ordering becomes a requirement, add an explicitly approved position field and sort strategy in a separate chunk.

## Rollback

Revert this chunk's storefront commit to restore the former code-based FAQ list. The Shopify definition and entries can remain without affecting the storefront; they may also be removed manually from Shopify Admin if desired.
