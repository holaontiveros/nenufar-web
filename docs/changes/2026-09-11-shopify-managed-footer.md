# Shopify-managed footer

## Objective

Replace the static footer with a branded, responsive footer driven by Shopify content.

## Scope

- Created production `nenufar_social_link` and `social.links` custom-data definitions.
- Added the white Nenúfar logo, Shopify footer menu, configured social profiles, and enabled policy links to the footer.
- Restyled and localized the policy index and individual policy pages.

## Decisions

See `docs/architecture/ADR-2026-09-11-footer-social-links.md`.

## Validation

- Shopify Admin GraphQL definition creation and metafield creation completed without user errors.
- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- `npm run format:check`
- `git diff --check`

## Risks and rollback

Empty Shopify content areas are intentionally hidden. Restore the former static footer if rollback is required. The Shopify custom-data definitions remain safe but unused.
