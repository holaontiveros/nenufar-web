# Hydrogen development storefront link

## Objective

Create and link a development-only Hydrogen storefront for validating the migration against a real Shopify store.

## Scope

- Created the `Nenúfar Web Dev` Hydrogen storefront in `nenu-from-react.myshopify.com`.
- Linked the local `hydrogen/` project to that storefront.
- Pulled development environment values into the ignored local `hydrogen/.env` file.

## Decisions

- This target is development-only. A separate approved deployment chunk will link the final store after functional validation.
- Store identifiers, access tokens, and session secrets remain only in ignored local configuration and are not documented here or committed.

## Files changed

- `hydrogen/.gitignore`
- `docs/changes/2026-09-10-hydrogen-dev-store-link.md`

## Validation

- Shopify CLI confirmed that the development storefront was created and linked.
- Shopify CLI confirmed that local environment values were written to the ignored `.env` file.

## Risks pending

- The local project now has access to the development store. Only development data may be used until cutover approval.
- End-to-end cart and checkout validation is pending the Hydrogen catalogue and cart migration chunks.

## Rollback

Remove the local `.shopify` link and delete the `Nenúfar Web Dev` storefront through Shopify when it is no longer needed. No committed source code contains store credentials.
