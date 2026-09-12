# Migrate global actions to shared variants

## Objective

Apply the approved shared action vocabulary to globally visible icon controls and every rendered WhatsApp CTA.

## Scope

- Migrate the header cart control and mobile-menu toggle to the `icon` variant.
- Migrate the floating WhatsApp action, homepage WhatsApp CTA, quote CTA, and final-story CTA to the `whatsapp` variant.
- Add shared icon and WhatsApp visual states and remove superseded component-specific CTA styling.

## Decisions

No new architecture decision is introduced. The work extends the approved shared action primitive recorded in `docs/architecture/ADR-2026-09-12-shared-action-primitive.md`. The cart stays an anchor with its existing drawer-opening handler, the mobile menu remains a native button, and WhatsApp destinations remain external anchors with `target="_blank"` and `rel="noreferrer"`.

## Files modified

- `app/components/Header.tsx`
- `app/components/PageLayout.tsx`
- `app/components/NenufarStory.tsx`
- `app/routes/_index.tsx`
- `app/styles/app.css`
- `docs/architecture/ADR-2026-09-12-shared-action-primitive.md`

## Validation

- Searched all `WhatsAppIcon`, `whatsappUrl`, and `wa.me` usages in `app/` to confirm all current rendered WhatsApp actions are migrated.
- `npm run typecheck`
- `npm run build`
- `git diff --check`

## Risks and rollback

Global actions now share green WhatsApp and pink icon control states; small responsive differences may be visible at narrow widths. Cart, menu, and external-link behavior are unchanged. Revert this commit to return to the former per-component styles.
