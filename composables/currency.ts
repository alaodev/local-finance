import { Ref } from "vue";
import { useStorage } from "@vueuse/core";

export const useCurrency = defineStore("currency", () => {
  const currency: Ref<string> = useStorage("vue-storage-currency-code", "brl");
  const currencies = ref([
    {
      title: "USD",
      currencyCode: "usd",
    },
    {
      title: "BRL",
      currencyCode: "brl",
    },
  ]);

  function setCurrency(value: string) {
    currency.value = value;
  }

  return { currency, currencies, setCurrency };
});
