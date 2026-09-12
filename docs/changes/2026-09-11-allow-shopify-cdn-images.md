# Allow Shopify CDN images under CSP

## Objective

Restore product and content images hosted by Shopify after the GTM CSP override narrowed `img-src` to Google origins.

## Scope

- Allow `https://cdn.shopify.com` and Shopify CDN subdomains in `img-src`.
- Preserve the existing GTM and GA image allowances.

## Decision

Adding a custom `imgSrc` list replaces Hydrogen's default image sources. Shopify CDN origins must therefore be explicitly included whenever the storefront defines its own list.

## Files modified

- `app/entry.server.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

The allowed origins are limited to Shopify's image CDN and the analytics origins already approved. Remove these two origins to restore the prior restrictive policy.
