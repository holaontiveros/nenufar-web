# ADR: Group FAQs with reusable Shopify metaobjects

## Status

Approved.

## Context

FAQs need merchant-selectable groups and each group requires its own title and future display metadata. A static choice-list field would classify an FAQ but cannot hold group-level content.

## Decision

Use a public merchant-owned FAQ-group metaobject and a single metaobject-reference field on each FAQ item:

- Production group type: `nenufar_faq_group`.
- Development compatibility group type: `faq_group`.
- Group fields: required `title`, optional `description`, required `position`.
- FAQ field: optional `group` reference, constrained to the matching group type in each store.

The homepage loads group metadata from each FAQ reference, sorts groups by `position`, and renders the group title and description before its FAQs. Existing FAQs without a group remain visible under the default `Preguntas frecuentes` heading during migration.

## Consequences

- Merchants select a group while editing each FAQ item.
- Groups can be reused, reordered, and extended with additional fields later.
- Production and development retain their distinct metaobject identifiers, so the storefront has a compatibility query for both.

## Rollback

Revert the storefront grouping chunk. Existing FAQ entries remain intact; the empty group definitions and optional reference fields can remain unused or be removed before references are assigned.
