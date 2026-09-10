# Native seasonal collections

## Objective

Move seasonal catalogue navigation from a storefront metafield filter to
native Shopify automated collections.

## Scope

- Verify the four seasonal collections in the development store.
- Point every home-page seasonal card to its native Shopify collection URL.
- Preserve `/catalogo` as the all-products browsing page.

## Store changes

The Shopify CLI Connector verified these automated collections, each with six
matching products:

- `dia-de-la-madre` — tag `madre`
- `dia-del-padre` — tag `padre`
- `dia-del-maestro` — tag `maestro`
- `navidad-fin-de-ano` — tag `navidad`

## Decision

See `docs/architecture/ADR-2026-09-10-shopify-seasonal-collections.md`.

## Files modified

- `app/components/NenufarStory.tsx`
- `docs/architecture/ADR-2026-09-10-shopify-seasonal-collections.md`
- `docs/changes/2026-09-10-native-seasonal-collections.md`

## Validation

- Shopify CLI authenticated to `nenu-from-react.myshopify.com`.
- Shopify CLI collection query confirmed every seasonal collection, handle,
  and matching product count.
- `npm run typecheck`
- `npm run build`
- `git diff --check`

All storefront validation commands completed successfully.

## Rollback

Revert the home-link commit to return cards to the prior catalogue filter URLs.
