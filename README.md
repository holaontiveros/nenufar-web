# Nenúfar Web

Shopify Hydrogen storefront for personalized gifts. Product, variant, price, image, cart, and checkout data come from Shopify.

## Local development

1. Use Node.js 22 or 24 and install dependencies with `npm ci`.
2. Copy `.env.example` to `.env`, or link a development storefront with Shopify CLI to populate it. Never commit this file.
3. Start the storefront with `npm run dev`.

The local project is linked only to the Nenúfar development storefront. Re-link it before using any other store; never reuse development credentials in production.

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`

No automated test suite exists yet. See [AGENTS.md](AGENTS.md) for the required planning, documentation, architecture-approval, and Git workflow.
