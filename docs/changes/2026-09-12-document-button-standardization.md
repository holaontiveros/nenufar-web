# Document button standardization

## Objective

Record the approved discovery output for standardizing storefront buttons and CTA-like links before changing any UI behavior.

## Scope

- Inventory current button, link-CTA, choice, stepper, and icon-control patterns.
- Define proposed visual variants, semantic rules, shared behavior requirements, and a phased migration map.
- Do not change application code or storefront presentation in this chunk.

## Decisions

Shared visual styles must preserve native HTML semantics: navigation remains an anchor/Link, while mutations and local state controls remain native buttons. Introducing a shared rendering primitive is deferred as a separate architecture decision requiring an ADR and approval.

## Files modified

- `docs/plans/button-standardization.md`

## Validation

- Reviewed every native `button` and CTA-style link in `app/` with a source inventory search.
- Confirmed no application source or stylesheet files changed in this documentation-only chunk.

## Risks and rollback

The map may need adjustment when a specific control has a special responsive or accessibility constraint. Roll back by reverting this documentation commit; no storefront behavior is affected.
