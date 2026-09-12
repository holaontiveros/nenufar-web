# Allow Shopify privacy banner under CSP

## Objective

Allow Hydrogen's Shopify Customer Privacy banner to load after adding an explicit GTM `script-src` policy.

## Scope

- Allow `https://cdn.shopify.com` in `script-src`.

## Decision

The storefront privacy banner is loaded from Shopify's CDN at `shopifycloud/privacy-banner/storefront-banner.js`. The explicit GTM script allowlist replaced Hydrogen's default script origins, so Shopify CDN must be listed directly.

## Files modified

- `app/entry.server.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

This permits scripts from Shopify's CDN only. Removing the origin disables the privacy banner again.
