# Show WhatsApp floating action on every page

## Objective

Make the configured WhatsApp contact action available consistently across the storefront.

## Scope

- Move the existing floating WhatsApp action from the homepage story component into the shared page layout.
- Keep it conditional on the existing shop-wide WhatsApp configuration.
- Remove the former homepage-only instance to prevent duplicates.

## Validation

- `npm run typecheck`
- `npm run build`
- `npm run format:check`
- `git diff --check`

## Risks and rollback

The action is intentionally absent if `contact.whatsapp_number` has no usable value. Roll back by removing it from `PageLayout` and restoring it to `NenufarStory`.
