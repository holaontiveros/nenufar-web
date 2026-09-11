# Deploy isolated production-store preview

## Objective

Build and validate a Preview-only Oxygen deployment against the production transfer store while leaving live production untouched.

## Scope

- Pulled the isolated production environment into the ignored production worktree.
- Confirmed only variable names were inspected and that its environment file differs from development.
- Installed lockfile-pinned npm dependencies in the isolated worktree.
- Deployed the current application source to the `Nenúfar Web Production` Preview environment only.
- Did not deploy to the production Oxygen environment, connect `nenufar.mx`, alter the development deployment, or expose/commit secrets.

## Result

- Preview URL: `https://01m271zmxxqee4jn11hc4sjjz8-570f5129dce95a62cc8d.myshopify.dev`.
- Oxygen completed upload and routability verification successfully.
- Anonymous HTTP validation followed the Preview redirect and received `403`, indicating protected preview access. This is expected until reviewed through an authorized Shopify session or an explicitly requested access-bypass flow.

## Validation

- `shopify hydrogen env pull --env production` completed in the isolated worktree.
- Environment-name inspection found expected Storefront and `SESSION_SECRET` variables without exposing their values.
- `npm ci --no-audit --no-fund` completed; local Node 25 produced the existing unsupported-engine warnings for Hydrogen's Node 22/24 requirement.
- `shopify hydrogen deploy --preview` built, uploaded, and verified the deployment successfully.
- `curl -L` confirmed the protected `403` final response for an unauthenticated request.
- `git diff --check`

## Remaining risks

- Preview behavior still needs an authenticated visual review once verified production content exists.
- The production environment and custom domain must remain untouched until explicit launch approval.
- The currently deployed source still needs a planned compatibility update for production-specific `nenufar_*` metaobject types before production FAQ and structured product data can render.

## Rollback

Deploy a later known-good Preview revision or remove the Preview deployment. This does not affect the production Oxygen environment or `nenufar.mx`.
