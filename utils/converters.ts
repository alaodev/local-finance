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

export function displayToLimit(display: string) {
  const fromTo: { [key: string]: number } = {
    xs: 4,
    sm: 4,
    md: 6,
    lg: 6,
    xl: 8,
    xxl: 10,
  };
  return fromTo[display];
}
