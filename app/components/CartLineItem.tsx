import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout, LineItemChildrenMap} from '~/components/CartMain';
import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useState} from 'react';
import {useVariantUrl} from '~/lib/variants';
import {getSeasonalCollectionLabel} from '~/lib/seasonal-collections';
import {Link} from 'react-router';
import {ProductPrice} from './ProductPrice';
import {ActionButton} from './Action';
import {useAside} from './Aside';
import {PencilIcon, SparklesIcon, TrashIcon} from './CartIcons';
import type {
  CartApiQueryFragment,
  CartLineFragment,
} from 'storefrontapi.generated';

export type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 * If the line is a parent line that has child components (like warranties or gift wrapping), they are
 * rendered nested below the parent line.
 */
export function CartLineItem({
  layout,
  line,
  childrenMap,
}: {
  layout: CartLayout;
  line: CartLine;
  childrenMap: LineItemChildrenMap;
}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions = []} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();
  const lineItemChildren = childrenMap[id];
  const childrenLabelId = `cart-line-children-${id}`;

  return (
    <li key={id} className="cart-line">
      <div className="cart-line-inner">
        {image && (
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
          />
        )}

        <div>
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
          >
            <p className="cart-line-title">{product.title}</p>
          </Link>
          <span className="cart-line-label">
            {getSeasonalCollectionLabel(product.tags)}
          </span>
          <div className="cart-line-purchase-row">
            <CartLineQuantity line={line} />
            <ProductPrice price={line?.cost?.totalAmount} />
          </div>
          <ul className="cart-line-details">
            {selectedOptions.map((option) => (
              <li key={option.name}>
                <small>
                  {option.name}: {option.value}
                </small>
              </li>
            ))}
            {(line.attributes ?? []).map((attribute) => (
              <li key={attribute.key}>
                <small>
                  {attribute.key}: {attribute.value}
                </small>
              </li>
            ))}
          </ul>
          {product.personalizationEnabled?.value === 'true' ? (
            <CartLinePersonalization line={line} />
          ) : null}
        </div>
      </div>

      {lineItemChildren ? (
        <div>
          <p id={childrenLabelId} className="sr-only">
            Line items with {product.title}
          </p>
          <ul aria-labelledby={childrenLabelId} className="cart-line-children">
            {lineItemChildren.map((childLine) => (
              <CartLineItem
                childrenMap={childrenMap}
                key={childLine.id}
                line={childLine}
                layout={layout}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

function CartLinePersonalization({line}: {line: CartLine}) {
  const existingText =
    line.attributes?.find((attribute) => attribute.key === 'Personalización')
      ?.value ?? '';
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(existingText);
  const attributes = (line.attributes ?? []).reduce<
    Array<{key: string; value: string}>
  >((values, attribute) => {
    if (attribute.key !== 'Personalización' && attribute.value) {
      values.push({key: attribute.key, value: attribute.value});
    }
    return values;
  }, []);
  const nextAttributes = text.trim()
    ? [...attributes, {key: 'Personalización', value: text.trim()}]
    : attributes;

  if (editing) {
    return (
      <CartLineUpdateButton
        lines={[{id: line.id, quantity: line.quantity, attributes: nextAttributes}]}
      >
        <div className="cart-line-personalization cart-line-personalization--editing">
          <input
            aria-label="Texto de personalización"
            autoFocus
            maxLength={90}
            onChange={(event) => setText(event.target.value)}
            placeholder="Texto personalizado..."
            value={text}
          />
          <button type="submit" onClick={() => setEditing(false)}>
            Guardar
          </button>
        </div>
      </CartLineUpdateButton>
    );
  }

  return (
    <div className="cart-line-personalization">
      <span>
        <SparklesIcon />
        {existingText ? <><strong>Grabado:</strong> «{existingText}»</> : <i>Sin texto especificado</i>}
      </span>
      <button type="button" onClick={() => setEditing(true)}>
        <PencilIcon /> Editar
      </button>
    </div>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart-line-quantity">
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <ActionButton
          aria-label="Reducir cantidad"
          disabled={quantity <= 1 || !!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
          size="icon-sm"
          variant="stepper"
        >
          <span>&#8722; </span>
        </ActionButton>
      </CartLineUpdateButton>
      <span aria-live="polite" className="cart-line-quantity__value">
        {quantity}
      </span>
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <ActionButton
          aria-label="Aumentar cantidad"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
          size="icon-sm"
          variant="stepper"
        >
          <span>&#43;</span>
        </ActionButton>
      </CartLineUpdateButton>
      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        aria-label="Eliminar producto"
        className="cart-line-remove"
        disabled={disabled}
        type="submit"
      >
        <TrashIcon />
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @param lineIds - line ids affected by the update
 * @returns
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}
