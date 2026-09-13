# Add branded not-found page

## Objective

Replace the generic catch-all error presentation with a recoverable, visually distinctive Nenúfar 404 page.

## Scope

- Make the catch-all route return an HTTP 404 while rendering inside the shared storefront layout.
- Add a central illustrated gift composition, motion-reduced sparkle animation, responsive layout, and direct recovery links to home and catalogue.
- Add a page-specific document title.

## Decisions

The 404 route returns React Router `data` with status `404` instead of throwing a response. This preserves the proper HTTP status but avoids the root generic error boundary, retaining the configured header, footer, global WhatsApp action, and the standard visual language.

## Files modified

- `app/routes/$.tsx`
- `app/styles/app.css`

## Validation

- `npm run typecheck`
- `npm run build`
- `git diff --check`
- Attempted a local runtime HTTP check, but the supervised local Hydrogen server did not remain available for the follow-up request in this environment. Build-time routing verification passed.

## Risks and rollback

The catch-all route now renders the branded page for all unmatched paths. The response continues to be status 404. Revert this commit to restore the former thrown-response behavior and generic error boundary.
