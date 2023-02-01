export function capitalize(value: string) {
  if (!value) return "";

  return value.replace(/^\w/, (v) => v.toUpperCase());
}
