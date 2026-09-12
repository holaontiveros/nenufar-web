# Migrate product choice controls to shared variants

## Objective

Standardize selectable product controls and quantity steppers without changing product selection or cart update behavior.

## Scope

- Migrate product variant links/buttons, personalization font/motif choices, and product quantity controls.
- Migrate cart line quantity controls.
- Add shared `choice` and `stepper` variant styles while preserving product-specific geometry and unavailable/selected state presentation.

## Decisions

The work extends the shared-action ADR. Combined-listing variants continue to render as internal links, normal variants remain buttons that update the URL state, and cart steppers remain submit controls inside the existing `CartForm` update flow.

## Files modified

- `app/components/ProductForm.tsx`
- `app/components/CartLineItem.tsx`
- `app/styles/app.css`
- `docs/architecture/ADR-2026-09-12-shared-action-primitive.md`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Targeted Biome lint completed with only pre-existing warnings in `CartLineItem.tsx` and the shared stylesheet.

## Risks and rollback

Choice and stepper controls retain existing handlers, `aria` state, unavailable state, and form submission behavior. Product-specific sizing remains scoped. Revert this commit if a selected or disabled visual state regresses.
