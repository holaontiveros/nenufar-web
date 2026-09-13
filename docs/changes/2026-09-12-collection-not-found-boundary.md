# Render missing collection handles with the branded 404 page

## Objective

Ensure missing collection handles render the Nenúfar branded 404 experience instead of the generic root error boundary.

## Scope

- Add a collection-route error boundary.
- Render the shared `NotFoundPage` only for HTTP 404 responses.
- Allow non-404 errors to continue to the root error boundary.

## Files modified

- `app/routes/collections.$handle.tsx`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

This changes only the presentation of missing collection pages. Revert this commit to restore generic route-error handling for collection 404s.
