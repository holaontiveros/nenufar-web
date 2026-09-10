# Hydrogen visual parity: long-form landing sections

## Objective

Complete the current Nenúfar homepage's long-form visual experience after the page frame and live catalogue restoration.

## Scope

- Added seasonal collections, workshop techniques, gallery, quote prompt, reviews, FAQ, final CTA, and floating contact affordance.
- Reused the pre-existing demo-image approach as requested; these images remain replaceable before production.
- Added every section anchor referenced by the branded navigation.

## Decisions

- This is presentation-only. Real Shopify catalogue, product personalization, cart, and checkout are unchanged.
- The quote prompt initially used a non-production placeholder. The approved WhatsApp endpoint is supplied in the follow-up contact-configuration change record.

## Files modified

- `app/components/NenufarStory.tsx`
- `app/routes/_index.tsx`
- `app/styles/app.css`

## Validation

- `npm run typecheck`
- `npm run build`

Both completed successfully. Existing non-blocking Hydrogen environment, React Router future-flag, and bundle-analyzer warnings remain.

## Risks

- The restored demo images require asset ownership/licensing validation before production.
- Quote and contact actions need verified business contact information.

## Rollback

Revert this commit to remove the long-form sections while retaining the previously committed branded page frame and live Shopify catalogue.
