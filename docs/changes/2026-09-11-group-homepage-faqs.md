# Group homepage FAQs

## Objective

Allow merchants to organize homepage FAQ entries into reusable Shopify-managed groups with group-level title, description, and display order.

## Scope

- Added the public production `nenufar_faq_group` definition in Shopify Admin.
- Added an optional `group` reference on `nenufar_faq_item`, constrained to `nenufar_faq_group`.
- Updated the Hydrogen homepage to load development and production FAQ group metadata, sort groups by `position`, and display each title and description.
- Kept ungrouped FAQs visible under `Preguntas frecuentes` during migration.
- Documented the equivalent development schema (`faq_group` referenced by `faq_item.group`) for compatibility work before future development content is grouped.

## Decisions

The approved data-model decision is recorded in [ADR-2026-09-11-faq-group-metaobjects.md](../architecture/ADR-2026-09-11-faq-group-metaobjects.md). A reusable metaobject was selected over a static choice list because group-level content and ordering must be merchant-managed.

## Files modified

- `app/routes/_index.tsx`
- `app/components/NenufarStory.tsx`
- `app/styles/app.css`
- `docs/shopify/faq-metaobjects.md`
- `docs/plans/production-store-bootstrap.md`
- `docs/shopify/store-readiness-runbook.md`
- `docs/architecture/ADR-2026-09-11-faq-group-metaobjects.md`

## Validation

- Confirmed the production `nenufar_faq_group` schema and constrained optional `nenufar_faq_item.group` reference in Shopify Admin.
- Confirmed the matching development `faq_group` schema and constrained optional `faq_item.group` reference in Shopify Admin.
- `npm run codegen`
- `npm run typecheck`
- `npm run build`

## Remaining risks

- No production FAQ or group entries were created; a merchant must enter verified content and assign groups.
- Existing development FAQ entries have not yet been assigned to groups.

## Rollback

Revert the storefront code commit to display the FAQ list as before. The optional production reference and empty group definition can remain unused; remove them only through Shopify Admin after confirming no entries reference them.
