# Source homepage collections from Shopify visibility data

## Objective

Let merchants choose which native Shopify collections appear on the homepage and present those collection cards in a three-column desktop grid.

## Scope

- Read `custom.show_on_home` from the collection itself in the homepage Storefront query.
- Render only collections whose boolean metafield is `true`.
- Include collection descriptions in the card data when present.
- Change the collection-card grid from two to three columns on desktop; existing responsive two-column tablet and one-column mobile styles remain in effect.
- Update the custom-data guide with the active merchant behavior.

## Decisions

- This reactivates the existing, merchant-managed Collection metafield rather than maintaining a second hardcoded handle list.
- The query is limited to already published collections and uses the public Storefront API, so no Admin credential or client-side Shopify call is introduced.

## Files modified

- `app/routes/_index.tsx`
- `app/components/NenufarStory.tsx`
- `docs/shopify/metafields.md`
- `docs/changes/2026-09-10-homepage-collection-visibility.md`

## Validation

- Read the development-store collection values through Admin GraphQL and through the public Storefront API; three collections currently resolve with `custom.show_on_home = true`.
- `npm run codegen`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `git diff --check`

## Remaining risks

- A collection without public storefront access for this metafield will not appear, even if the value is set in Admin.
- Development-store visibility values must be recreated or migrated deliberately for the production store.

## Rollback

Revert this chunk to restore the hardcoded handle list and the two-column desktop grid. The collection metafield values remain intact in Shopify.
