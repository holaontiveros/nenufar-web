# Support the production FAQ metaobject type

## Objective

Allow the shared homepage to read production FAQ entries from the approved production-specific metaobject type while retaining the existing development FAQ source.

## Scope

- Query both legacy `faq_item` and production `nenufar_faq_item` types.
- Combine complete entries from both queries in the homepage FAQ component input.
- Update the production runbook to reflect completed schemas and production type identifiers.

## Decision

The homepage uses a compatibility read during the transition: development content continues to use `faq_item`, while production can use `nenufar_faq_item`. No content is duplicated or migrated, and an absent type simply contributes no entries.

## Files modified

- `app/routes/_index.tsx`
- `storefrontapi.generated.d.ts`
- `docs/shopify/store-readiness-runbook.md`
- `docs/changes/2026-09-10-support-production-faq-metaobject-type.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `git diff --check`

## Remaining risks

- Production has no FAQ entries yet, so the FAQ section remains empty until verified merchant content is entered.
- Product and collection content must still be created in the production store before visual parity can be meaningfully assessed.

## Rollback

Revert this chunk to return to the legacy FAQ query. The production definition and entries remain untouched.
