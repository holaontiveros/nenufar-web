import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useEffect, useId, useRef, useState} from 'react';
import {useFetcher} from 'react-router';
import {CartIcon, ShieldCheckIcon} from './CartIcons';
import {ActionAnchor, ActionButton} from './Action';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

type CartDiscountAllocation = {
  __typename?: string;
  discountedAmount: CartApiQueryFragment['cost']['subtotalAmount'];
  code?: string;
  title?: string;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';
  const summaryId = useId();
  const discountsHeadingId = useId();
  const discountCodeInputId = useId();
  const giftCardHeadingId = useId();
  const giftCardInputId = useId();
  const lineDiscountAllocations = (cart?.lines?.nodes ?? []).flatMap((line) =>
    hasDiscountAllocations(line) ? line.discountAllocations : [],
  );
  const discountAllocations = [
    ...(cart?.discountAllocations ?? []),
    ...lineDiscountAllocations,
  ];

  return (
    <div aria-labelledby={summaryId} className={className}>
      <h4 id={summaryId}>Resumen del pedido</h4>
      <dl role="group" className="cart-subtotal">
        <dt>Subtotal estimado</dt>
        <dd>
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart?.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      {layout === 'aside' ? (
        <CartDiscounts
          discountAllocations={discountAllocations}
          discountCodes={cart?.discountCodes}
          discountsHeadingId={discountsHeadingId}
          discountCodeInputId={discountCodeInputId}
        />
      ) : null}
      {layout === 'page' ? (
        <>
          <CartGiftCard
            giftCardCodes={cart?.appliedGiftCards}
            giftCardHeadingId={giftCardHeadingId}
            giftCardInputId={giftCardInputId}
          />
        </>
      ) : null}
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

function hasDiscountAllocations(
  line: unknown,
): line is {discountAllocations: ReadonlyArray<CartDiscountAllocation>} {
  return (
    typeof line === 'object' &&
    line !== null &&
    'discountAllocations' in line &&
    Array.isArray(line.discountAllocations)
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <div className="cart-checkout-actions">
      <p className="cart-secure-message"><ShieldCheckIcon /> Checkout cifrado directo en Shopify.</p>
      <ActionAnchor href={checkoutUrl} target="_self" fullWidth size="large" variant="primary">
        <CartIcon /> Proceder al Pago en Shopify <b aria-hidden="true">→</b>
      </ActionAnchor>
    </div>
  );
}

function CartDiscounts({
  discountAllocations,
  discountCodes,
  discountsHeadingId,
  discountCodeInputId,
}: {
  discountAllocations?: ReadonlyArray<CartDiscountAllocation>;
  discountCodes?: CartApiQueryFragment['discountCodes'];
  discountsHeadingId: string;
  discountCodeInputId: string;
}) {
  const discountCodeInput = useRef<HTMLInputElement>(null);
  const discountCodeFetcher = useFetcher({key: 'discount-code-update'});
  const codes = discountCodes ?? [];
  const unavailableCodes = codes.filter((discount) => !discount.applicable);
  const appliedDiscounts = discountAllocations ?? [];

  useEffect(() => {
    if (discountCodeFetcher.data && discountCodeInput.current) {
      discountCodeInput.current.value = '';
    }
  }, [discountCodeFetcher.data]);

  return (
    <section aria-labelledby={discountsHeadingId} className="cart-discounts">
      <h5 id={discountsHeadingId}>¿Tienes un código de descuento?</h5>
      <UpdateDiscountForm
        discountCodes={codes.map(({ code }) => code)}
        fetcherKey="discount-code-update"
      >
        <div className="cart-discount-form">
          <label htmlFor={discountCodeInputId} className="sr-only">
            Código de descuento
          </label>
          <input
            id={discountCodeInputId}
            type="text"
            name="discountCode"
            placeholder="Código de descuento"
            autoComplete="off"
            required
            ref={discountCodeInput}
          />
          <ActionButton
            disabled={discountCodeFetcher.state !== 'idle'}
            size="small"
            type="submit"
            variant="secondary"
          >
            Aplicar
          </ActionButton>
        </div>
      </UpdateDiscountForm>

      {appliedDiscounts.length ? (
        <div className="cart-applied-discounts" role="status">
          <div>
            <span>Ahorros aplicados</span>
          </div>
          <ul>
            {appliedDiscounts.map((discount, index) => (
              <li
                key={`${discount.__typename}-${discount.code ?? discount.title ?? index}`}
              >
                <code>{discount.code ?? discount.title ?? 'Descuento aplicado'}</code>
                <strong>
                  −<Money data={discount.discountedAmount} />
                </strong>
                {discount.code && codes.some(({code}) => code === discount.code) ? (
                  <RemoveDiscountForm
                    code={discount.code}
                    discountCodes={codes.map(({code}) => code)}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {unavailableCodes.map(({ code }) => (
        <div className="cart-discount-error" key={code} role="alert">
          <span>
            El código <code>{code}</code> no está disponible para este pedido.
          </span>
          <RemoveDiscountForm
            code={code}
            discountCodes={codes.map(({ code }) => code)}
          />
        </div>
      ))}
    </section>
  );
}

function RemoveDiscountForm({
  code,
  discountCodes,
}: {
  code: string;
  discountCodes: string[];
}) {
  return (
    <UpdateDiscountForm
      discountCodes={discountCodes.filter((item) => item !== code)}
    >
      <button
        type="submit"
        className="cart-discount-remove"
        aria-label={`Quitar código ${code}`}
      >
        Quitar
      </button>
    </UpdateDiscountForm>
  );
}

function UpdateDiscountForm({
  discountCodes,
  fetcherKey,
  children,
}: {
  discountCodes?: string[];
  fetcherKey?: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
  giftCardHeadingId,
  giftCardInputId,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
  giftCardHeadingId: string;
  giftCardInputId: string;
}) {
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const removeButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const previousCardIdsRef = useRef<string[]>([]);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});
  const [removedCardIndex, setRemovedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    if (giftCardAddFetcher.data) {
      if (giftCardCodeInput.current !== null) {
        giftCardCodeInput.current.value = '';
      }
    }
  }, [giftCardAddFetcher.data]);

  useEffect(() => {
    const currentCardIds = giftCardCodes?.map((card) => card.id) || [];

    if (removedCardIndex !== null && giftCardCodes) {
      const focusTargetIndex = Math.min(
        removedCardIndex,
        giftCardCodes.length - 1,
      );
      const focusTargetCard = giftCardCodes[focusTargetIndex];
      const focusButton = focusTargetCard
        ? removeButtonRefs.current.get(focusTargetCard.id)
        : null;

      if (focusButton) {
        focusButton.focus();
      } else if (giftCardCodeInput.current) {
        giftCardCodeInput.current.focus();
      }

      setRemovedCardIndex(null);
    }

    previousCardIdsRef.current = currentCardIds;
  }, [giftCardCodes, removedCardIndex]);

  const handleRemoveClick = (cardId: string) => {
    const index = previousCardIdsRef.current.indexOf(cardId);
    if (index !== -1) {
      setRemovedCardIndex(index);
    }
  };

  return (
    <section aria-label="Gift cards">
      {giftCardCodes && giftCardCodes.length > 0 && (
        <dl>
          <dt id={giftCardHeadingId}>Applied Gift Card(s)</dt>
          {giftCardCodes.map((giftCard) => (
            <dd key={giftCard.id} className="cart-discount">
              <RemoveGiftCardForm
                giftCardId={giftCard.id}
                lastCharacters={giftCard.lastCharacters}
                onRemoveClick={() => handleRemoveClick(giftCard.id)}
                buttonRef={(el: HTMLButtonElement | null) => {
                  if (el) {
                    removeButtonRefs.current.set(giftCard.id, el);
                  } else {
                    removeButtonRefs.current.delete(giftCard.id);
                  }
                }}
              >
                <code>***{giftCard.lastCharacters}</code>
                &nbsp;
                <Money data={giftCard.amountUsed} />
              </RemoveGiftCardForm>
            </dd>
          ))}
        </dl>
      )}

      <AddGiftCardForm fetcherKey="gift-card-add">
        <div>
          <label htmlFor={giftCardInputId} className="sr-only">
            Gift card code
          </label>
          <input
            id={giftCardInputId}
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
          />
          &nbsp;
          <button
            type="submit"
            disabled={giftCardAddFetcher.state !== 'idle'}
            aria-label="Apply gift card code"
          >
            Apply
          </button>
        </div>
      </AddGiftCardForm>
    </section>
  );
}

function AddGiftCardForm({
  fetcherKey,
  children,
}: {
  fetcherKey?: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesAdd}
    >
      {children}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  lastCharacters,
  children,
  onRemoveClick,
  buttonRef,
}: {
  giftCardId: string;
  lastCharacters: string;
  children: React.ReactNode;
  onRemoveClick?: () => void;
  buttonRef?: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
      &nbsp;
      <button
        type="submit"
        aria-label={`Remove gift card ending in ${lastCharacters}`}
        onClick={onRemoveClick}
        ref={buttonRef}
      >
        Remove
      </button>
    </CartForm>
  );
}
