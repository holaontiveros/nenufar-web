import {Link, useNavigate} from 'react-router';
import {useState} from 'react';
import {Money, type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  MoneyV2,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import {CartIcon} from './CartIcons';
import {RichTextContent} from './RichTextContent';
import type {ProductFragment} from 'storefrontapi.generated';

export type PersonalizationConfig = {
  artisanNoteEnabled?: boolean;
  artisanNoteLabel?: string | null;
  artisanNotePlaceholder?: string | null;
  characterLimit?: string | null;
  fontOptions?: string | null;
  motifOptions?: string | null;
  previewCopy?: string | null;
  textLabel?: string | null;
  textPlaceholder?: string | null;
};

type PersonalizationValues = {
  artisanNote: string;
  customText: string;
  font: string;
  motif: string;
};

export function getPersonalizationAttributes({
  artisanNote,
  customText,
  font,
  motif,
}: PersonalizationValues) {
  return [
    {key: 'Personalización', value: customText.trim()},
    {key: 'Tipografía', value: font.trim()},
    {key: 'Motivo', value: motif.trim()},
    {key: 'Indicaciones para el artesano', value: artisanNote.trim()},
  ].filter((attribute) => attribute.value);
}

export function getLineSubtotal(
  price: MoneyV2 | null | undefined,
  quantity: number,
) {
  if (!price || !Number.isInteger(quantity) || quantity < 1) return undefined;

  const amount = Number(price.amount);
  if (!Number.isFinite(amount)) return undefined;

  return {...price, amount: (amount * quantity).toFixed(2)};
}

function parseOptions(value?: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((option): option is string => typeof option === 'string')
      : [];
  } catch {
    return [];
  }
}

function getCharacterLimit(value?: string | null) {
  const limit = Number(value);
  return Number.isInteger(limit) && limit > 0 ? limit : 90;
}

export function ProductForm({
  productOptions,
  selectedVariant,
  allowCustomText = false,
  personalizationConfig,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
  allowCustomText?: boolean;
  personalizationConfig?: PersonalizationConfig | null;
}) {
  const navigate = useNavigate();
  const {open} = useAside();
  const [customText, setCustomText] = useState('');
  const fontOptions = parseOptions(personalizationConfig?.fontOptions);
  const motifOptions = parseOptions(personalizationConfig?.motifOptions);
  const [font, setFont] = useState(fontOptions[0] ?? '');
  const [motif, setMotif] = useState(motifOptions[0] ?? '');
  const [artisanNote, setArtisanNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const personalizationAttributes = getPersonalizationAttributes({
    artisanNote,
    customText,
    font,
    motif,
  });
  const subtotal = getLineSubtotal(selectedVariant?.price, quantity);
  return (
    <div className="product-form">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div className="product-options" key={option.name}>
            <h5>{option.name}</h5>
            <div className="product-options-grid">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      aria-current={selected ? 'true' : undefined}
                      className={`product-options-item${
                        selected ? ' is-selected' : ''
                      }${available ? '' : ' is-unavailable'}`}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      className={`product-options-item${
                        selected ? ' is-selected' : ''
                      }${exists && !selected ? ' link' : ''}${
                        available ? '' : ' is-unavailable'
                      }`}
                      key={option.name + name}
                      aria-pressed={selected}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          void navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
      {allowCustomText && personalizationConfig && (
        <div className="product-personalization">
          <div className="product-personalization-heading">
            <b>✦ Personaliza tu pieza</b>
            {personalizationConfig.previewCopy && (
              <RichTextContent className="product-personalization-preview" value={personalizationConfig.previewCopy} />
            )}
          </div>
          <label htmlFor="custom-text">
            {personalizationConfig.textLabel || 'Texto para personalizar'}
          </label>
          <textarea
            id="custom-text"
            maxLength={getCharacterLimit(personalizationConfig.characterLimit)}
            onChange={(event) => setCustomText(event.target.value)}
            placeholder={
              personalizationConfig.textPlaceholder ||
              'Escribe el nombre, inicial o frase que deseas personalizar'
            }
            rows={3}
            value={customText}
          />
          {fontOptions.length > 0 && (
            <fieldset className="product-personalization-options">
              <legend>Estilo de tipografía</legend>
              <div>
                {fontOptions.map((option) => (
                  <button
                    aria-pressed={font === option}
                    className={font === option ? 'is-selected' : ''}
                    key={option}
                    onClick={() => setFont(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          {motifOptions.length > 0 && (
            <fieldset className="product-personalization-options">
              <legend>Detalle o motivo grabado</legend>
              <div>
                {motifOptions.map((option) => (
                  <button
                    aria-pressed={motif === option}
                    className={motif === option ? 'is-selected' : ''}
                    key={option}
                    onClick={() => setMotif(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          {personalizationConfig.artisanNoteEnabled && (
            <label className="product-personalization-note" htmlFor="artisan-note">
              {personalizationConfig.artisanNoteLabel || 'Indicaciones para el artesano'}
              <textarea
                id="artisan-note"
                onChange={(event) => setArtisanNote(event.target.value)}
                placeholder={personalizationConfig.artisanNotePlaceholder || ''}
                rows={2}
                value={artisanNote}
              />
            </label>
          )}
        </div>
      )}
      <div className="product-purchase-summary">
        <div className="product-quantity" role="group" aria-label="Cantidad">
          <span>Cantidad</span>
          <div>
            <button
              aria-label="Reducir cantidad"
              disabled={quantity === 1}
              onClick={() => setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))}
              type="button"
            >
              −
            </button>
            <output aria-live="polite">{quantity}</output>
            <button
              aria-label="Aumentar cantidad"
              onClick={() => setQuantity((currentQuantity) => currentQuantity + 1)}
              type="button"
            >
              +
            </button>
          </div>
        </div>
        <p>
          Subtotal: {subtotal ? <strong><Money data={subtotal} /></strong> : '—'}
        </p>
      </div>
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          open('cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity,
                  selectedVariant,
                  attributes: personalizationAttributes,
                },
              ]
            : []
        }
      >
        <CartIcon />
        <span>{selectedVariant?.availableForSale ? 'Agregar al carrito' : 'Agotado'}</span>
      </AddToCartButton>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}
