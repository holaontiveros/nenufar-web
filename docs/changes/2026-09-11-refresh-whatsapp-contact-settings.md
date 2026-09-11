# Refresh WhatsApp contact settings immediately

## Objective

Ensure the global WhatsApp button appears promptly after the merchant adds or changes the production Shop metafield.

## Scope

- Changed only the `SHOP_CONTACT_QUERY` cache strategy in `app/root.tsx` from `CacheLong` to `CacheNone`.
- Confirmed the production Storefront API returns the configured value `+529999496396`.

## Decision

Merchant-managed contact configuration is low-volume and must not remain hidden behind a long-lived storefront cache. Product and collection content keep their existing caching behavior.

## Validation

- Production Storefront API query returned `shop.whatsappNumber.value`.
- Pending: codegen, typecheck, build, and production deployment.

## Rollback

Restore `storefront.CacheLong()` for the shop contact query if the request volume or caching policy changes.
