export function capitalize(value: string) {
  if (!value) return "";

  return value.replace(/^\w/, (v) => v.toUpperCase());
}

export function currency(value: string | number = 0, localeCode: string) {
  const locale = {
    en: {
      currency: "USD",
    },
    "pt-br": {
      currency: "BRL",
    },
  };
  return Number(value).toLocaleString(localeCode, {
    style: "currency",
    currency: locale[localeCode].currency,
  });
}

export function localeNumber(value: string | number = 0, localeCode: string) {
  return Number(value).toLocaleString(localeCode);
}
