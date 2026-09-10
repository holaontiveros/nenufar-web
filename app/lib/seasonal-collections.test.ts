import {describe, expect, it} from 'vitest';
import {getSeasonalCollectionLabel} from './seasonal-collections';

describe('getSeasonalCollectionLabel', () => {
  it('uses the fallback while an optimistic cart line has no product tags', () => {
    expect(getSeasonalCollectionLabel()).toBe('Pieza personalizada');
  });

  it('uses the seasonal collection label once Shopify returns product tags', () => {
    expect(getSeasonalCollectionLabel(['madre'])).toBe('Día de la Madre');
  });
});
