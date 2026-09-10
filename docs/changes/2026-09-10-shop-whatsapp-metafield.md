# Source WhatsApp contact from a Shop metafield

## Objective

Make the storefront's global WhatsApp contact number editable in Shopify Admin.

## Scope

- Created the public Shop metafield definition `contact.whatsapp_number` in the development store.
- Set the confirmed development number as its value.
- Added one cached Hydrogen root-loader query for the field.
- Routed header and homepage WhatsApp actions through the resulting shared URL.
- Removed the source-owned phone number fallback.

## Decisions

This uses the approved merchant-owned Shop metafield model documented in `docs/architecture/ADR-2026-09-10-shop-whatsapp-metafield.md`. The URL is only rendered when the field contains at least one digit, preventing stale contact links when a new store has not been configured.

## Modified files

- `app/root.tsx`
- `app/lib/contact.ts`
- `app/components/PageLayout.tsx`
- `app/components/Header.tsx`
- `app/routes/_index.tsx`
- `app/components/NenufarStory.tsx`
- `storefrontapi.generated.d.ts`
- `docs/architecture/ADR-2026-09-10-shop-whatsapp-metafield.md`
- `docs/shopify/contact-metafields.md`

## Validation

- Validated the Shopify Admin definition and value mutations.
- Created the definition and set the development-store value with no Shopify user errors.
- Verified that the value is readable through the development store's public Storefront API.
- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

`npm run lint` remains blocked by the existing `jest/no-deprecated-functions` configuration: ESLint cannot detect a Jest installation while linting the Vitest test file. It is unrelated to this change.

## Remaining risks

The phone number is configured separately per Shopify store. A new store without this metafield will have no WhatsApp actions until its merchant configures it.

## Rollback

Revert this chunk to restore the previous storefront contact configuration. The Shopify metafield can remain without affecting the reverted code, or can be removed manually from the store if no longer needed.
