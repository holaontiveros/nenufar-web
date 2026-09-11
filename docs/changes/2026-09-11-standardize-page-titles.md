# Standardize page titles

## Objective

Replace Hydrogen template titles with the Nenúfar page-title convention: `Specific page | Nenúfar`.

## Scope

Updated route metadata for the homepage, catalog/product and collection pages, blog pages, policies, CMS pages, search, cart, and account pages. Dynamic routes retain their Shopify-provided title and append the site name.

## Decisions

- The site name is `Nenúfar`, matching the brand used throughout the storefront.
- Titles are defined in each route's existing `meta` export; no new runtime or SEO dependency was introduced.
- The product route remains `Add to cart` behavior; this chunk only changes document metadata.

## Files modified

- `app/routes/_index.tsx`
- `app/routes/collections.all.tsx`
- `app/routes/collections.$handle.tsx`
- `app/routes/catalogo.tsx`
- `app/routes/products.$handle.tsx`
- `app/routes/blogs._index.tsx`
- `app/routes/blogs.$blogHandle._index.tsx`
- `app/routes/blogs.$blogHandle.$articleHandle.tsx`
- `app/routes/policies.$handle.tsx`
- `app/routes/pages.$handle.tsx`
- `app/routes/search.tsx`
- `app/routes/cart.tsx`
- `app/routes/account.addresses.tsx`
- `app/routes/account.orders._index.tsx`
- `app/routes/account.orders.$id.tsx`
- `app/routes/account.profile.tsx`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- Confirmed no `Hydrogen |` title literals remain under `app/`.

Shopify Hydrogen documentation search was attempted but unavailable in the current environment (`fetch failed`).

## Risks and rollback

Risk is limited to browser tab titles and SEO title metadata. Roll back by reverting this commit; no Shopify data or API behavior changes are involved.
