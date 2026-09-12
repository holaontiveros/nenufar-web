# Use the Shopify main menu in the header

## Objective

Let the Shopify-configured main menu control the storefront header navigation.

## Scope

- Replace the hard-coded header links with the `menu.items` already returned by `HEADER_QUERY` for the `main-menu` handle.
- Use the same menu items for desktop and mobile navigation.
- Keep the existing header layout, styles, and menu-toggle behavior unchanged.

## Decision

The existing `main-menu` query is the single source of truth for header navigation. No new API query, custom data model, or fallback navigation is introduced. Store administrators can now adjust menu labels, order, destinations, and visibility in Shopify Admin without a storefront code change.

## Files modified

- `app/components/Header.tsx`
- `docs/changes/2026-09-11-header-menu-from-shopify.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `npm run format:check`
- `git diff --check`
- Shopify Hydrogen skill validator attempted but unavailable because its bundled runtime cannot resolve `typescript`; the project typecheck and production build passed.

## Risks and rollback

If the configured `main-menu` is empty or unavailable, the header shows no navigation links. Populate that Shopify menu to resolve it. Roll back by restoring the previous hard-coded navigation array.
