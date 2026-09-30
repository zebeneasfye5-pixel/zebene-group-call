import { Currency } from '../types';
import { CURRENCY_RATES } from '../data/mockData';

export const formatCurrency = (amountUSD: number, currency: Currency): string => {
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountUSD * rateInfo.rateToUSD;

  // Format with commas and 2 decimals or 0 decimals depending on magnitude
  const isLarge = converted >= 10000;
  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: isLarge ? 0 : 2,
    maximumFractionDigits: isLarge ? 0 : 2
  }).format(converted);

  return `${rateInfo.symbol}${formattedNumber}`;
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};
