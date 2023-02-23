import { Ref } from "vue";
import { useStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import { CryptoTableItemType, CryptoType } from "~~/types/cryptos";
import { TransactionType } from "~~/types/transaction";
import { dynamicSort } from "~~/utils/computers";

export const useCryptos = defineStore("cryptos", () => {
  const requestRegulatorStore = useRequestRegulator();

  const { validate: validateRequestRegulator } = requestRegulatorStore;

  const cryptos: Ref<Array<CryptoType>> = useStorage("vue-storage-cryptos", []);
  const cryptoListLimit = ref(6);
  const cryptoListPage = ref(1);
  const cryptoListNameFilter = ref("");
  const cryptoListOrderBy = ref("");

  const cryptoTable: Ref<Array<CryptoTableItemType>> = ref([]);
  const cryptoTableLimit = ref(10);
  const cryptoTablePage = ref(1);
  const cryptoTableNameFilter = ref("");

  const loadingCryptoTable = ref(false);
  const importingCryptosData = ref(false);

  const filteredCryptoList = computed(() => {
    return cryptos.value.filter((item) =>
      sanitize(item.name).includes(sanitize(cryptoListNameFilter.value))
    );
  });
  const cryptoListSize = computed(() => filteredCryptoList.value.length);
  const orderedCryptoList = computed(() =>
    filteredCryptoList.value.sort(dynamicSort(cryptoListOrderBy.value))
  );
  const pagedCryptoList = computed(() => {
    return orderedCryptoList.value.slice(
      (cryptoListPage.value - 1) * cryptoListLimit.value,
      cryptoListLimit.value * cryptoListPage.value
    );
  });

  const filteredCryptoTable = computed(() => {
    return cryptoTable.value.filter((item) =>
      sanitize(item.name).includes(sanitize(cryptoTableNameFilter.value))
    );
  });
  const cryptoTableSize = computed(() => filteredCryptoTable.value.length);
  const pagedCryptoTable = computed(() => {
    return filteredCryptoTable.value.slice(
      (cryptoTablePage.value - 1) * cryptoTableLimit.value,
      cryptoTableLimit.value * cryptoTablePage.value
    );
  });
  const workingCrypto = computed(
    () => loadingCryptoTable.value || importingCryptosData.value
  );
  const cryptosValueAmount = computed(() => {
    return Object.keys(cryptos.value).reduce((acc, cur) => {
      const cryptoCurrentValue =
        cryptoTable.value.find((crypto) => crypto.id === cryptos.value[cur].id)
          ?.price || 0;
      return (acc += cryptos.value[cur].amount * cryptoCurrentValue);
    }, 0);
  });

  async function loadCryptoTable() {
    const isValidRequestRegulator = validateRequestRegulator(
      "LOAD_CRYPTO",
      60000
    );
    if (!isValidRequestRegulator) return;
    try {
      loadingCryptoTable.value = true;
      const { data }: any = await useFetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
      );
      cryptoTable.value = data.value.map((item: any) => ({
        id: item.id,
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
      loadingCryptoTable.value = false;
    }
  }

  function createCrypto(data: CryptoType) {
    const transaction = createTransaction(0, data.amount);
    cryptos.value.push({
      ...data,
      createdAt: new Date().getTime(),
      transactions: [transaction as TransactionType],
    });
  }

  function removeCrypto(cryptoId: string) {
    cryptos.value = cryptos.value.filter((data) => data.id !== cryptoId);
  }

  function calculateReservedValue(id: string, value: number, operator: number) {
    cryptos.value = cryptos.value.map((crypto) => {
      if (crypto.id !== id) return crypto;
      const transaction = createTransaction(operator, value);
      return {
        ...crypto,
        amount: (crypto.amount || 0) + value * operator,
        transactions: [
          ...(crypto.transactions as Array<TransactionType>),
          transaction,
        ],
      };
    });
  }

  function findCryptoById(cryptoId: string) {
    return cryptos.value.find((crypto) => crypto.id === cryptoId);
  }

  function findCryptoListItemById(cryptoId: string) {
    return cryptoTable.value.find((crypto) => crypto.id === cryptoId);
  }

  function createTransaction(type: number, value: number): TransactionType {
    return {
      uuid: uuidv4(),
      createdAt: new Date().getTime(),
      type,
      value,
    };
  }

  function setCryptoListOrderBy(value: string) {
    cryptoListOrderBy.value = value;
  }

  return {
    cryptos,

    cryptoListLimit,
    cryptoListPage,
    cryptoListNameFilter,
    cryptoTableLimit,
    cryptoTablePage,
    cryptoTableNameFilter,

    loadingCryptoTable,
    importingCryptosData,
    workingCrypto,

    cryptoListSize,
    pagedCryptoList,
    cryptosValueAmount,

    cryptoTableSize,
    pagedCryptoTable,

    loadCryptoTable,
    createCrypto,
    removeCrypto,
    calculateReservedValue,
    findCryptoById,
    findCryptoListItemById,
    setCryptoListOrderBy,
  };
});
