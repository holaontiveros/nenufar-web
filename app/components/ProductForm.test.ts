import {describe, expect, it} from 'vitest';
import {getLineSubtotal, getPersonalizationAttributes} from './ProductForm';

describe('getPersonalizationAttributes', () => {
  it('submits every configured personalization choice as cart-line attributes', () => {
    expect(
      getPersonalizationAttributes({
        artisanNote: 'Centrar el grabado',
        customText: '  Mariana  ',
        font: 'Caligráfica',
        motif: 'Flor Nenúfar',
      }),
    ).toEqual([
      {key: 'Personalización', value: 'Mariana'},
      {key: 'Tipografía', value: 'Caligráfica'},
      {key: 'Motivo', value: 'Flor Nenúfar'},
      {key: 'Indicaciones para el artesano', value: 'Centrar el grabado'},
    ]);
  });

  it('does not submit empty attributes for an incomplete configuration', () => {
    expect(
      getPersonalizationAttributes({
        artisanNote: ' ',
        customText: ' ',
        font: '',
        motif: '',
      }),
    ).toEqual([]);
  });
});

describe('getLineSubtotal', () => {
  it('multiplies a variant price by the selected quantity', () => {
    expect(
      getLineSubtotal(
        {amount: '18.00', currencyCode: 'USD'},
        3,
      ),
    ).toEqual({amount: '54.00', currencyCode: 'USD'});
  });

  it('does not calculate a subtotal for an invalid quantity', () => {
    expect(
      getLineSubtotal({amount: '18.00', currencyCode: 'USD'}, 0),
    ).toBeUndefined();
  });
});
