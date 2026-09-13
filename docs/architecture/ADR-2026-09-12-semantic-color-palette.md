# ADR: Use a semantic CSS color palette

## Status

Approved and implemented on 2026-09-12.

## Context

Nenúfar's visual language was consistent in practice but repeated its pink, violet, warm-neutral, and WhatsApp colors as literals throughout the stylesheet. That made brand adjustments and visual consistency difficult to maintain.

## Decision

Define semantic CSS custom properties in `:root` for canvas, surfaces, text hierarchy, borders, brand states, purple accents, and WhatsApp actions. Migrate repeated shared colors to these tokens without changing their rendered values.

One-off illustration, campaign, and status colors may remain literal until a later component-specific review establishes a semantic use for them.

## Consequences

- Shared UI components consume named design decisions rather than raw hex values.
- A future rebrand or contrast adjustment has a single source of truth for the common palette.
- The existing visual result is preserved; this is not a redesign.

## Rollback

Revert the palette migration commit to restore literal colors.
