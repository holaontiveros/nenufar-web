# Migrate primary actions to the shared primitive

## Objective

Standardize the first group of high-priority storefront CTAs while preserving their behavior and semantic HTML.

## Scope

- Add shared semantic action renderers in `app/components/Action.tsx`.
- Migrate the homepage catalogue CTA, FAQ CTA, product add-to-cart button, and cart checkout link.
- Consolidate their primary CTA visual states in `app/styles/app.css`.

## Decisions

The approved shared-action architecture is recorded in `docs/architecture/ADR-2026-09-12-shared-action-primitive.md`. Internal pages use `ActionLink`; the real Shopify checkout URL remains an `ActionAnchor`; add-to-cart remains a submit `ActionButton` nested in the existing `CartForm`.

## Files modified

- `app/components/Action.tsx`
- `app/components/AddToCartButton.tsx`
- `app/components/CartSummary.tsx`
- `app/components/NenufarStory.tsx`
- `app/routes/_index.tsx`
- `app/styles/app.css`
- `docs/architecture/ADR-2026-09-12-shared-action-primitive.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

The migrated CTAs use the same primary style, which may expose small layout differences at narrow widths. Cart submission, checkout URL routing, and navigation semantics are unchanged. Revert this commit to restore the prior independent styles.
