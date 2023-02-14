import { Ref } from "vue";
import { CryptoItem } from "~~/types/cryptos";

export const useCryptos = defineStore("cryptos", () => {
  const cryptoList: Ref<Array<CryptoItem>> = ref([]);
  const tableLimit = ref(10);
  const tablePage = ref(1);
  const tableNameFilter = ref("");
  const loadingCryptoList = ref(false);

  const filteredCryptos = computed(() => {
    return cryptoList.value.filter((item) =>
      sanitize(item.name).includes(sanitize(tableNameFilter.value))
    );
  });

  const tableSize = computed(() => filteredCryptos.value.length);

  const pagedCryptos = computed(() => {
    return filteredCryptos.value.slice(
      (tablePage.value - 1) * tableLimit.value,
      tableLimit.value * tablePage.value
    );
  });

  async function loadCryptoList() {
    try {
      loadingCryptoList.value = true;
      const { data }: any = await useFetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
      );
      cryptoList.value = data.value.map((item: any) => ({
        image: item.image,
        name: item.name,
        price: item.current_price,
        percentageIn1h: Number(
          item.price_change_percentage_1h_in_currency
        ).toFixed(2),
        percentageIn24h: Number(
          item.price_change_percentage_24h_in_currency
        ).toFixed(2),
        percentageIn7d: Number(
          item.price_change_percentage_7d_in_currency
        ).toFixed(2),
        sparklineData: Object.entries(item.sparkline_in_7d.price).map(
          ([key, value]) => value
        ),
        symbol: item.symbol,
      }));
    } catch (e) {
    } finally {
      loadingCryptoList.value = false;
    }
  }

  return {
    tableLimit,
    tablePage,
    loadingCryptoList,
    tableNameFilter,
    tableSize,
    pagedCryptos,
    loadCryptoList,
  };
});
