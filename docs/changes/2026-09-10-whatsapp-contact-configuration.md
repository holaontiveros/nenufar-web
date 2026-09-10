# WhatsApp contact configuration

## Objective

Connect the approved Nenúfar WhatsApp number to the storefront's customer-contact calls to action.

## Scope

- Added a centralized WhatsApp conversation URL for `+52 999 949 6396`.
- Connected the header, hero, quote prompt, final CTA, and floating contact button to it.
- Each contact link opens WhatsApp in a new tab with a prefilled Spanish inquiry.

## Decision

The number was explicitly supplied and approved by the project owner. It is public business contact information, not a secret.

## Validation

- `npm run typecheck`
- `npm run build`

Both completed successfully. Existing upstream Hydrogen warnings remain non-blocking.

## Risks

- The number and prefilled message should be reviewed before production if business contact routing changes.
- The current deployed Oxygen preview does not include this commit until a new preview deployment is requested.

## Rollback

Revert this commit to remove the contact configuration and restore the prior local contact destinations.
