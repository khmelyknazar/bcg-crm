const moneyFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0,
});

export const formatMoney = (value: number) => moneyFormatter.format(value);

export const today = () => new Date().toISOString().slice(0, 10);
