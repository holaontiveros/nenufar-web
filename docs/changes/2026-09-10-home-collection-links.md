# Home collection links

## Objective

Make each seasonal collection card on the home page open its corresponding
catalogue instead of the unfiltered catalogue page.

## Scope

- Add the existing collection label as the `catalog` query parameter in every
  home-page collection link.
- Initialize the catalogue filter from that parameter.
- Safely fall back to all catalogues when a URL contains an unknown label.

## Decisions

- Reuse the current `custom.catalog_name` product metafield values.
- Use a URL query parameter rather than a new route or Shopify collection
  model, keeping the existing catalogue page and its filters intact.

## Files modified

- `app/components/NenufarStory.tsx`
- `app/components/NenufarCatalogue.tsx`
- `docs/changes/2026-09-10-home-collection-links.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

All commands completed successfully.

## Remaining risks

The collection label must continue to match the product `custom.catalog_name`
metafield exactly. A renamed metafield value will safely show all catalogues
until its home-page link is updated.

## Rollback

Revert the commit for this chunk to restore the unfiltered catalogue links.
