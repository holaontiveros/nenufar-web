# WhatsApp visual correction

## Objective

Correct the appearance of storefront WhatsApp actions so they use a recognizable WhatsApp icon and WhatsApp green styling.

## Scope

- Added an inline accessible WhatsApp SVG component.
- Replaced temporary glyphs in the header, hero chat action, quote action, final CTA, and floating action button.
- Applied WhatsApp green colors and hover states consistently to those contact actions.

## Validation

- `npm run typecheck`
- `npm run build`

Both completed successfully. Existing upstream Hydrogen warnings remain non-blocking.

## Rollback

Revert this commit to restore the previous glyphs and styles.
