# Move FAQs to a dedicated page

## Objective

Move the full FAQ experience out of the homepage while keeping it sourced from Shopify FAQ MetaObjects and easy to reach from the storefront navigation.

## Scope

- Added the `/preguntas` route with the existing grouped FAQ accordion treatment.
- Moved the existing FAQ MetaObject query and group ordering from the homepage to the dedicated route.
- Replaced the homepage accordion with a short FAQ introduction and CTA to `/preguntas`.
- Updated header and footer FAQ links to open the new page.

## Decisions

- Preserve the existing FAQ MetaObject types, group references, rich-text answers, and ordering behavior.
- Reuse the existing accordion renderer so the new page remains visually consistent with the homepage design it replaces.

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

The new page depends on public Storefront API access for the existing FAQ MetaObjects. Reverting this commit restores the homepage accordion and its original menu anchors without changing Shopify content.
