const moneyFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0,
});

export const formatMoney = (value: number) => moneyFormatter.format(value);

export const today = () => new Date().toISOString().slice(0, 10);

export const formatDate = (iso: string) => {
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) return iso;
  return `${day}.${month}.${year}`;
};
