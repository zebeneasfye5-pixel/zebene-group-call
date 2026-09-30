import { Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, { symbol: string; rateFromUSD: number; name: string }> = {
  USD: { symbol: '$', rateFromUSD: 1.0, name: 'US Dollar' },
  ETB: { symbol: 'ETB ', rateFromUSD: 155.0, name: 'Ethiopian Birr' },
  EUR: { symbol: '€', rateFromUSD: 0.92, name: 'Euro' },
  GBP: { symbol: '£', rateFromUSD: 0.78, name: 'British Pound' },
  KES: { symbol: 'KSh ', rateFromUSD: 130.0, name: 'Kenyan Shilling' },
  AED: { symbol: 'AED ', rateFromUSD: 3.67, name: 'UAE Dirham' },
  CNY: { symbol: '¥', rateFromUSD: 7.23, name: 'Chinese Yuan' }
};

export const formatCurrency = (amountUSD: number, currency: Currency): string => {
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountUSD * rateInfo.rateFromUSD;
  
  if (currency === 'ETB' || currency === 'KES') {
    return `${rateInfo.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
  return `${rateInfo.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatNumber = (val: number): string => {
  return val.toLocaleString();
};
