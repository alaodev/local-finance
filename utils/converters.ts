export function localeToCurreny(localeCode: string) {
  const currencies: any = {
    en: "USD",
    "pt-br": "BRL",
  };

  return currencies[localeCode];
}
