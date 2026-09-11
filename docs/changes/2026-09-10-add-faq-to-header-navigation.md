# Add FAQ access to the header navigation

## Objective

Make the homepage FAQ section reachable from the shared desktop and mobile header navigation.

## Scope

- Added the `Preguntas` link to the common navigation data.
- Route the link to the existing `/#faq` anchor.
- Reused the same navigation data so desktop and mobile menus stay aligned.

## Decisions

- This is a navigation-only change. FAQ content and its Shopify metaobject source remain unchanged.

## Files modified

- `app/components/Header.tsx`
- `docs/changes/2026-09-10-add-faq-to-header-navigation.md`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `git diff --check`

## Rollback

Revert this commit to remove the FAQ header link; the FAQ section remains available on the homepage.
