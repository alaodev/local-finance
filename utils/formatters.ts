export function capitalize(value: string) {
  if (!value) return "";

  return value.replace(/^\w/, (v) => v.toUpperCase());
}

export function currencyNumber(
  value: string | number = 0,
  currencyCode: string
) {
  const currencyToLocale: { [key: string]: string } = {
    usd: "en",
    brl: "pt-br",
  };
  return Number(value).toLocaleString(currencyToLocale[currencyCode], {
    style: "currency",
    currency: currencyCode,
  });
}

export function localeNumber(value: string | number = 0, localeCode: string) {
  return Number(value).toLocaleString(localeCode);
}
