# ADR: Use Vitest for regression tests

## Status

Approved on 2026-09-10.

## Context

Nenúfar Web had no automated test suite. An optimistic cart rendering regression reached an Oxygen preview because a helper assumed product tags were available before Shopify returned the authoritative cart line.

## Decision

Use Vitest as the project test runner for focused TypeScript unit regression tests. Add an `npm test` command and place tests next to the pure module they verify. Vitest uses a test-only configuration, separate from the storefront Vite configuration, so unit tests do not initialize Hydrogen/Oxygen plugins or their file watchers.

The first test covers seasonal label resolution when optimistic cart lines have no tags.

## Alternatives considered

1. No automated test: no new dependency, but the regression remains manual-only.
2. Browser end-to-end tests: higher confidence for full cart behavior, but require a stable authenticated storefront/test-data lifecycle and are disproportionate for this pure helper regression.

## Consequences

- Adds Vitest as a development-only dependency and a test command.
- Enables fast tests without affecting the storefront bundle or Shopify data model.
- Future UI tests that require DOM/browser behavior may need an additional approved test environment.

## Rollback

Remove Vitest, the test script, test files, and this ADR in a revert commit. Storefront runtime behavior is unaffected.
