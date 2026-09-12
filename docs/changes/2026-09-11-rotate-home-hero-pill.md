# Rotate the homepage hero message

## Objective

Turn the homepage hero pill into a warm, living introduction to Nenúfar.

## Scope

- Add ten curated messages about gifts, creativity, and meaningful details.
- Rotate messages every 4.5 seconds with a subtle entrance animation.
- Keep the first message deterministic for server and client rendering.
- Respect reduced-motion preferences.

## Validation

- `npm run typecheck`
- `npm run build`
- `npm run format:check`
- `git diff --check`

## Risks and rollback

The messages are currently storefront copy rather than Shopify-managed content. Remove `HeroPill` and restore static markup to roll back.
