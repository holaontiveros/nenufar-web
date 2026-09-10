# Shopify CDN placeholder images

## Objective

Fix Content Security Policy image failures in the long-form homepage sections without weakening Hydrogen's default Shopify CSP.

## Scope

- Replaced every external Unsplash URL in `NenufarStory` with an existing `cdn.shopify.com` URL from the development store's Shopify Files library.
- Reused the demo product media already imported into Shopify; no new files were uploaded.
- Used visually related existing Shopify images where a former decorative Unsplash image was not in the Files library.

## Decisions

- Kept the default Hydrogen Content Security Policy unchanged.
- Shopify Files/CDN is the approved source for mutable placeholder imagery. Future real imagery can be uploaded or replaced in Shopify Files and its URL updated here or through a later content model.

## Validation

- Confirmed `app/` contains no `images.unsplash.com` URL.
- `npm run typecheck`
- `npm run build`

All checks completed successfully. Existing non-blocking Hydrogen warnings remain.

## Risks

- These remain demo images and need asset ownership/licensing validation before production.
- The deployed Preview requires a follow-up deployment to include this commit.

## Rollback

Revert this commit to restore the previous URLs; no Shopify Files were created, modified, or deleted.
