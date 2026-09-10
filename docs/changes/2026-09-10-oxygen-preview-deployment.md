# Oxygen preview deployment

## Objective

Publish the validated Hydrogen storefront to the linked Nenúfar development store so it can be reviewed outside the local development server.

## Scope

- Deployed the current `main` commit to the linked store's Oxygen Preview environment.
- Did not deploy to a production environment or change any production-store configuration.

## Decision

The approved Hydrogen/Oxygen architecture is used with an Oxygen Preview deployment because the linked store is development-only and the final store has not been selected.

## Deployment

- Preview URL: https://01m25zbfw7a2vrabjb47xfxehp-42bfcbde2d0eb600cbe0.myshopify.dev
- Command: `shopify hydrogen deploy --preview --no-json-output`

## Validation

- Shopify CLI reported successful upload, completion, and routability verification.
- A public HTTP request returned the expected Shopify authentication redirect. Following that redirect is access-controlled, so reviewers must sign in to a Shopify account with access to the development store.

## Risks

- This preview is not a production deployment and its URL may change on later preview deployments.
- Shopify account protection prevents unauthenticated external HTTP clients from rendering the storefront.

## Rollback

Use the Oxygen deployment controls to roll back to the prior preview deployment, or deploy a prior Git commit as a new preview.
