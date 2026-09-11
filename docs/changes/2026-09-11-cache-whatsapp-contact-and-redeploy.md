# Cache WhatsApp contact and redeploy

## Objective

Restore long-lived caching for the global WhatsApp contact query and bust the previous Oxygen cache with a production redeploy.

## Scope

- Restored `storefront.CacheLong()` for `SHOP_CONTACT_QUERY` in `app/root.tsx`.
- No Shopify data or schema changes.
- Production redeploy follows this change to clear the prior cached response.

## Validation

- Pending: codegen, typecheck, build, and Oxygen production deployment.

## Rollback

Restore `storefront.CacheNone()` if contact changes need to appear immediately without a redeploy.
