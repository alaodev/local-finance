import { Ref } from "vue";
import { useStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import { CryptoTableItemType, CryptoType } from "~~/types/cryptos";
import { TransactionType } from "~~/types/transaction";
import { dynamicSort } from "~~/utils/computers";
import { displayToLimit } from "~~/utils/converters";
import { useDisplay } from "vuetify/lib/framework.mjs";

export const useCryptos = defineStore("cryptos", () => {
  const requestRegulatorStore = useRequestRegulator();
  const currencyStore = useCurrency();

  const { currency } = storeToRefs(currencyStore);
  const { name: displayName } = useDisplay();

  const { validate: validateRequestRegulator } = requestRegulatorStore;

  const cryptos: Ref<Map<string, CryptoType>> = useStorage(
    "vue-storage-cryptos",
    new Map()
  );
  const cryptoListPage = ref(1);
  const cryptoListNameFilter = ref("");
  const cryptoListOrderBy = ref("");

  const cryptoTable: Ref<Map<string, CryptoTableItemType>> = useStorage(
    "vue-storage-crypto-table",
    new Map()
  );
  const cryptoTableLimit = ref(10);
  const cryptoTablePage = ref(1);
  const cryptoTableNameFilter = ref("");

  const loadingCryptoTable = ref(false);
  const importingCryptosData = ref(false);

  const cryptoListLimit = computed(() => {
    cryptoListPage.value = 1;
    return displayToLimit(displayName.value);
  });
  const filteredCryptoList = computed(() => {
    const result = [];
    for (let crypto of cryptos.value.values()) {
      if (sanitize(crypto.name).includes(sanitize(cryptoListNameFilter.value)))
        result.push(crypto);
    }
    return result;
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
    const result = [];
    for (let crypto of cryptoTable.value.values()) {
      if (sanitize(crypto.name).includes(sanitize(cryptoTableNameFilter.value)))
        result.push(crypto);
    }
    return result;
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
    let valueAmount = 0;
    for (let crypto of cryptos.value.values()) {
      const cryptoTableItemInfos = findCryptoTableItemById(crypto.id);
      valueAmount += (cryptoTableItemInfos?.price as number) * crypto.amount;
    }
    return valueAmount;
  });

  async function loadCryptoTable(force: boolean = false) {
    if (!force) {
      const isValidRequestRegulator = validateRequestRegulator(
        "LOAD_CRYPTO",
        30000
      );
      if (!isValidRequestRegulator) return;
    }
    try {
      loadingCryptoTable.value = true;
      const { data }: any = await useFetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.value}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      for (let item of data.value) {
        const newCryptoTableItem = {
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.current_price,
          percentageIn1h: item.price_change_percentage_1h_in_currency,
          percentageIn24h: item.price_change_percentage_24h_in_currency,
          percentageIn7d: item.price_change_percentage_7d_in_currency,
          sparklineData: Object.entries(item.sparkline_in_7d.price).map(
            ([key, value]) => value
          ) as Array<number>,
          symbol: item.symbol,
        };
        cryptoTable.value.set(item.id, newCryptoTableItem);
      }
    } catch (e) {
    } finally {
      loadingCryptoTable.value = false;
    }
  }

  function createCrypto(data: CryptoType) {
    const transaction = createTransaction(0, data.amount);
    const newCrypto = {
      ...data,
      createdAt: new Date().getTime(),
      transactions: [transaction as TransactionType],
    };
    cryptos.value.set(data.id, newCrypto);
  }

  function removeCrypto(cryptoId: string) {
    cryptos.value.delete(cryptoId);
  }

  function calculateReservedValue(id: string, value: number, operator: number) {
    const crypto = cryptos.value.get(id) as CryptoType;
    const transaction = createTransaction(operator, value);
    crypto.amount = (crypto.amount || 0) + value * operator;
    crypto.transactions = [
      ...(crypto.transactions as Array<TransactionType>),
      transaction,
    ];
  }

  function findCryptoById(cryptoId: string) {
    return cryptos.value.get(cryptoId);
  }

  function findCryptoTableItemById(cryptoId: string) {
    return cryptoTable.value.get(cryptoId);
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

  watch(currency, async () => await loadCryptoTable(true));

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
    findCryptoTableItemById,
    setCryptoListOrderBy,
  };
});
