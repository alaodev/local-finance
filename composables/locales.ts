export const useLocales = defineStore("locales", () => {
  const locale = ref("");
  const locales = ref([
    {
      title: "English",
      code: "en",
    },
    {
      title: "Português",
      code: "pt-br",
    },
  ]);

  return { locale, locales };
});
