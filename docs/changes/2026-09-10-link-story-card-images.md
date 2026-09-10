# Link story card images

## Objective

Make the image of every linked Nenúfar story card perform the same action as its existing card call to action.

## Scope

- Linked seasonal collection card images to their matching `/catalogo?collection=<handle>` destination.
- Linked project-card images to the existing custom-order section destination.
- Added visible keyboard focus treatment for the new image links.
- Confirmed catalogue product cards and blog article cards already linked their images and required no change.

## Decisions

- Reused each card’s established destination rather than making the entire card a nested/overlapping link target.
- Kept decorative image `alt` text empty and provided an accessible label on each new image link.

## Files modified

- `app/components/NenufarStory.tsx`
- `app/styles/app.css`

## Validation

- `npm test`
- `npm run typecheck`
- `npm run build`
- `git diff --check`

All commands completed successfully. The build retains the existing dependency warnings about `envFile`, React Router future flags, and the Hydrogen bundle analyzer.

## Remaining risks

- Linked image behavior should be reviewed on the next deployed preview, including keyboard focus visibility.

## Rollback

Revert this commit to return story-card images to decorative, non-interactive elements.
