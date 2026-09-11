# Deploy isolated production Oxygen environment

## Objective

Deploy the approved production storefront to its isolated Oxygen production environment.

## Scope

- Fast-forwarded the isolated production worktree to the current committed source.
- Deployed `Nenúfar Web Production` to Oxygen environment handle `production` after explicit approval.
- Did not modify the development storefront, deployment, credentials, or `nenufar.mx` custom-domain mapping.

## Result

- Production environment URL: `https://01m27gecmtj1qahgs4qncw3tnk-daa5878a4a43b7d93a09.myshopify.dev`.
- Oxygen completed build, upload, and routability verification successfully.

## Remaining work

- Populate real Shopify products, media, collections, FAQs, WhatsApp value, policies, shipping, payments, taxes, and markets.
- Connect and verify `nenufar.mx` only when the merchant is ready to expose the site publicly.

## Rollback

Redeploy the prior known-good production revision from the isolated production worktree. Development and custom-domain configuration are unaffected.
