# Button standardization plan

## Goal

Give every interactive control a deliberate semantic role and a small, reusable visual vocabulary without changing its behavior, cart integration, checkout routing, or accessibility semantics.

## Non-goals

- This plan does not alter copy, information architecture, Shopify data, analytics, or checkout behavior.
- It does not turn navigation links into buttons, or buttons that mutate state into links.
- It does not change tabs, option selectors, thumbnails, or quantity steppers into conversion CTAs.

## Semantic rule

Use an anchor or React Router `Link` when an interaction navigates. Use a native `button` for mutations, form submission, opening/closing UI, or changing client state. Shared styling must not erase that distinction.

## Proposed visual variants

| Variant | Purpose | Current examples |
| --- | --- | --- |
| `primary` | Highest-priority conversion action. Gradient surface, white text, visible focus ring, optional leading/trailing icon. | Add to cart, checkout, home catalogue CTA, FAQ CTA. |
| `secondary` | Alternative navigation/action with neutral outlined surface. | Home seasonal collections CTA. |
| `whatsapp` | External WhatsApp contact action. Green surface, external-link-safe behavior. | Floating contact action and story contact CTAs. |
| `ghost` | Low-emphasis text or compact action. Transparent surface, clear hover/focus state. | Edit personalization, account secondary actions. |
| `icon` | Icon-only, labelled through `aria-label`; square hit area and visible focus. | Cart toggle, menu toggle, close, remove line. |
| `choice` | Stateful selection controls; selected/unavailable states are explicit. | Variant options, personalization options, catalogue filters, tabs, gallery thumbnails. |
| `stepper` | Increment/decrement control paired with an output. | Product and cart quantity controls. |

## Sizes

| Size | Use |
| --- | --- |
| `large` | Hero and full-width product/cart conversion actions. |
| `medium` | Standard page CTAs and secondary navigation. |
| `small` | Compact card and operational actions. |
| `icon-sm` / `icon-md` | Dense cart controls / header and modal controls. |

All variants should use a minimum 44 × 44 px target where their layout permits. Compact cart steppers may remain visually smaller only when the surrounding control has an equivalent accessible hit area.

## Shared behavior requirements

- Keyboard focus is always visible and does not rely on color alone.
- Disabled actions communicate their state with both `disabled`/`aria-disabled` as appropriate and a non-interactive cursor.
- Loading cart submission retains its current disabled behavior and cannot submit duplicate lines.
- Icon-only controls retain descriptive accessible names.
- CTA icons keep a stable size so loading/state changes do not shift label alignment.
- `choice` and `stepper` controls keep their existing selected, unavailable, and quantity semantics.

## Current-instance migration map

| Area | Current implementation | Target variant |
| --- | --- | --- |
| Homepage hero | `hero-actions__primary`, `hero-actions__secondary`, `hero-actions__chat` | `primary`, `secondary`, `whatsapp` |
| FAQ preview | `faq-preview__cta` | `primary` (medium) |
| Header | `brand-cart`, `brand-menu-toggle` | `icon` |
| Floating contact and story contact links | `brand-whatsapp`, quote/story links | `whatsapp` |
| Product purchase | `product-add-to-cart` | `primary` (large, full width) |
| Product choices | variant and personalization option buttons | `choice` |
| Product gallery and details | thumbnail buttons and tab buttons | `choice` |
| Product quantity | `product-quantity` increment/decrement controls | `stepper` |
| Cart checkout | `cart-checkout-actions > a` | `primary` (large, full width) |
| Cart line actions | quantity, remove, personalization edit | `stepper`, `icon`, `ghost` |
| Cart discount and gift card forms | submit/remove buttons | `secondary` or `icon`, based on available label |
| Catalogue | filters, tabs, reset/empty-state action | `choice`; `secondary` for reset/empty action |
| Search and account forms | submit, save, clear, address actions, sign out | `primary`, `secondary`, or `ghost` based on action priority |
| Modal / aside | close and outside close | `icon` / non-visible dismiss surface |

## Delivery order

1. Introduce one presentation-only shared primitive that supports native `button`, anchors, and React Router links while preserving their HTML semantics. This is an architecture decision and requires explicit approval plus an ADR before implementation.
2. Migrate high-value conversion CTAs: product add-to-cart, cart checkout, hero CTA, FAQ CTA.
3. Migrate global actions: header icons and WhatsApp actions.
4. Migrate choice/stepper controls without changing state behavior.
5. Migrate account/search/discount operational controls.
6. Run visual and keyboard checks per chunk; remove superseded component-specific CSS only after all instances of a variant have migrated.

## Acceptance criteria for the implementation chunks

- Primary CTAs use one token set for gradient, radius, spacing, icon sizing, hover, focus, disabled, and loading states.
- Navigation remains link-based and mutation/state actions remain button-based.
- Existing cart, checkout, WhatsApp, and form behavior remains unchanged.
- Each migrated chunk passes `npm run typecheck`, `npm run build`, and visual keyboard checks for its affected flows.

## Risks and rollback

Centralized styling can unintentionally alter a dense cart control or selected option state. Migrate by semantic group, verify the affected viewport and keyboard behavior, and roll back the isolated chunk commit if a regression appears.
