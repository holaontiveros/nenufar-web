# ADR: Source homepage FAQs from Shopify metaobjects

- Status: Approved
- Date: 2026-09-10

## Context

The homepage FAQ section was hard-coded in `app/components/NenufarStory.tsx`. Updating a question or answer required a code change and deployment, even though this is merchant-owned storefront content.

## Decision

Use a merchant-managed Shopify metaobject definition with type `faq_item`.

- `question`: required `single_line_text_field`
- `answer`: required `multi_line_text_field`
- Storefront access: `PUBLIC_READ`
- Admin access: Shopify's default merchant read/write access for public metaobject types

The homepage loader queries up to 20 `faq_item` entries through the Hydrogen storefront client and supplies only complete question-and-answer pairs to `NenufarStory`. The current three FAQ entries have been seeded in the development store.

## Alternatives considered

1. Keep the FAQ list in source code. This has no Shopify setup cost but prevents the merchant from editing content independently.
2. Store a single JSON or rich-text metafield on a page. This is less structured and makes individual FAQ entries harder to create, reuse, and validate.
3. Use `faq_item` metaobjects. This provides a clear, reusable content model managed in Shopify Admin. This option was approved.

## Impact and migration

The existing rendered copy is now represented by three entries in Shopify Admin. Future store environments need the same definition and entries; setup instructions live in `docs/shopify/faq-metaobjects.md`. New complete entries will appear on the homepage without a code deployment.

## Risks and rollback

Deleting or making an entry incomplete removes it from the page. The section will render empty if no readable entries exist. To roll back, restore the entries in Shopify Admin or revert the loader/component changes to the last hard-coded version.
