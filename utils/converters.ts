export function localeToCurreny(localeCode: string) {
  const currencies: any = {
    en: "USD",
    "pt-br": "BRL",
  };

  return currencies[localeCode];
}

export function timestampToLocaleDateString(time: number, localeCode: string) {
  return new Date(time).toLocaleDateString(localeCode);
}
