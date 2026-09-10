# Cart seasonal label regression test

## Objective

Prevent the optimistic add-to-cart seasonal-label crash from recurring.

## Scope

- Added Vitest as the approved development-only unit test runner.
- Added `npm test` for non-watch test execution.
- Added a test-only Vitest configuration to avoid loading storefront plugins during pure unit tests.
- Moved seasonal label resolution into a pure module.
- Added tests for missing optimistic tags and the authoritative seasonal tag case.

## Decisions

- The approved Vitest decision is recorded in `docs/architecture/ADR-2026-09-10-vitest-regression-tests.md`.
- Tests live alongside pure modules. No DOM or Oxygen integration test environment is introduced in this chunk.

## Files modified

- `app/components/CartLineItem.tsx`
- `app/lib/seasonal-collections.ts`
- `app/lib/seasonal-collections.test.ts`
- `package.json`
- `package-lock.json`
- `vitest.config.ts`
- `docs/architecture/ADR-2026-09-10-vitest-regression-tests.md`
- `docs/changes/2026-09-10-cart-seasonal-label-regression-test.md`

## Validation

- `npm test`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Remaining risks

- This regression test covers the pure optimistic-data guard. It does not replace authenticated end-to-end cart testing against Oxygen.
- npm reported existing dependency vulnerabilities and a Node 25 engine mismatch for Hydrogen/MiniOxygen; no remediation was performed in this focused test chunk.

## Rollback

Revert the commit for this chunk to remove the test tooling and test while preserving storefront behavior.
