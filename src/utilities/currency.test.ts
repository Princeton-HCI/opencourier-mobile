import { formatCurrencyFromCents } from './currency';

describe('formatCurrencyFromCents', () => {
  it('formats cents as major currency units', () => {
    expect(formatCurrencyFromCents(194, 'USD')).toBe('$1.94');
    expect(formatCurrencyFromCents(1000, 'USD')).toBe('$10.00');
    expect(formatCurrencyFromCents(0, 'USD')).toBe('$0.00');
  });

  it('handles nullish amounts as zero', () => {
    expect(formatCurrencyFromCents(undefined, 'USD')).toBe('$0.00');
    expect(formatCurrencyFromCents(null, 'USD')).toBe('$0.00');
  });

  it('falls back to USD for invalid currency codes', () => {
    expect(formatCurrencyFromCents(100, '')).toBe('$1.00');
    expect(formatCurrencyFromCents(100, 'NOTREAL')).toBe('$1.00');
  });
});
