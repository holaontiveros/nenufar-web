# Deploy production FAQ compatibility Preview

## Objective

Deploy the production FAQ metaobject compatibility change to the isolated Oxygen Preview environment.

## Scope

- Fast-forwarded the isolated production worktree to commit `1930b74`.
- Deployed only to `Nenúfar Web Production` Preview.
- Did not deploy to the production Oxygen environment, map `nenufar.mx`, or add Shopify content.

## Result

- Preview URL: `https://01m2727ryfv19vemq3kmb6ssz3-570f5129dce95a62cc8d.myshopify.dev`.
- Oxygen build, upload, and routability verification completed successfully.

## Remaining work

- Add merchant-verified products, media, collections, FAQs, WhatsApp value, policies, shipping, taxes, payments, and markets in the production store.
- Conduct authorized visual and checkout review with that real content.
- Obtain explicit launch approval before production Oxygen deployment or custom-domain mapping.

## Rollback

Redeploy the prior Preview revision. The production environment and custom domain are unaffected.
