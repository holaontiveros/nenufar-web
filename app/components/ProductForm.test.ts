import {describe, expect, it} from 'vitest';
import {getPersonalizationAttributes} from './ProductForm';

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
