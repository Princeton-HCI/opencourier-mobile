/**
 * Formats a whole-number amount in **minor units** (e.g. cents) for display.
 * API values stay in cents; conversion happens only here at the UI boundary.
 */
export function formatCurrencyFromCents(
  amountInCents: number | null | undefined,
  currency: string = 'USD',
): string {
  const raw = Number(amountInCents ?? 0);
  const cents = Number.isFinite(raw) ? raw : 0;
  const major = cents / 100;
  const code = normalizeCurrencyCode(currency);
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
    }).format(major);
  } catch {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(major);
  }
}

function normalizeCurrencyCode(currency?: string | null): string {
  if (!currency || typeof currency !== 'string') {
    return 'USD';
  }
  const trimmed = currency.trim();
  if (trimmed.length !== 3) {
    return 'USD';
  }
  return trimmed.toUpperCase();
}

/**
 * Formats an amount already in **major units** (e.g. dollars), not cents.
 * Use {@link formatCurrencyFromCents} for API integer minor-unit amounts.
 */
export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;
