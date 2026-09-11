# Deploy production FAQ grouping preview

## Objective

Make the validated FAQ grouping storefront change available in the isolated production storefront's protected preview environment.

## Scope

- Fast-forwarded `/Users/javo/projects/nenufar-web-production` to `da696f9`.
- Deployed the production storefront preview only; no custom-domain mapping or production-environment promotion was changed.

## Decisions

Preview remains the rollout step for this content-model and presentation change. Production promotion and a domain cutover are separate actions.

## Files modified

- No application files; this deployment record documents the operational change.

## Validation

- Oxygen confirmed the deployment was routable at `https://01m27jbdefpq77bt4t7n5j0ckh-570f5129dce95a62cc8d.myshopify.dev`.

## Remaining risks

- The preview is protected and production contains no FAQ/group entries yet, so grouping cannot be visually populated until approved content is entered.

## Rollback

Redeploy the prior production-storefront revision to its preview environment.
