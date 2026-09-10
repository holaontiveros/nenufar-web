# Hydrogen visual parity: page frame and catalogue

## Objective

Begin the approved visual-parity restoration by rebuilding the core Nenúfar page frame and catalogue design in Hydrogen without replacing the real Shopify commerce flows.

## Scope

- Replaced the generic Hydrogen header and footer with the Nenúfar navigation, branded cart trigger, mobile navigation, and footer treatment.
- Rebuilt the home-page hero using the previous Nenúfar messaging, pink/violet glass visual language, calls to action, and responsive layout.
- Recreated the catalogue tabs, search field, technique filters, product cards, and custom-order callout as an interactive client component driven by Storefront API results.
- Added product descriptions to the home GraphQL query so cards can show real content when present.

## Decisions

- This is a presentation-layer change only; it introduces no dependency, persistence, or data-model decision.
- The existing Hydrogen cart aside and product route remain the source of truth for adding items, personalization, and checkout.
- Full visual parity continues in later bite-sized chunks for seasonal catalogues, workshop techniques, gallery, quote builder, reviews, FAQ, CTA banner, and WhatsApp interaction.

## Files modified

- `app/components/Header.tsx`
- `app/components/Footer.tsx`
- `app/components/PageLayout.tsx`
- `app/components/NenufarCatalogue.tsx`
- `app/routes/_index.tsx`
- `app/styles/app.css`

## Validation

- `npm run codegen`
- `npm run typecheck`
- `npm run build`
- Local `npm run dev` HTTP 200 checks for `/` and `/products/joyero-roble-caligrafia-madre`; the branded home content, real product handle, and personalization input rendered.

## Remaining risks

- Some destination anchors intentionally point to sections still being restored in subsequent chunks.
- The visual treatment is matched from source implementation; browser visual regression coverage does not yet exist.
- Hydrogen's existing `envFile`, React Router future-flag, and bundle-analyzer warnings remain non-blocking.

## Rollback

Revert this commit to restore the generic Hydrogen page frame and previous homepage catalogue route. Shopify data, cart state, and checkout behavior are unaffected.
