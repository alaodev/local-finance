import { Ref } from "vue";
import { useStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import { StockTableItemType, StockType } from "~~/types/stocks";
import { TransactionType } from "~~/types/transaction";
import { dynamicSort } from "~~/utils/computers";
import { displayToLimit } from "~~/utils/converters";
import { useDisplay } from "vuetify/lib/framework.mjs";

export const useStocks = defineStore("stocks", () => {
  const requestRegulatorStore = useRequestRegulator();
  const currencyStore = useCurrency();

  const { currency } = storeToRefs(currencyStore);
  const { name: displayName } = useDisplay();

  const { validate: validateRequestRegulator } = requestRegulatorStore;

  const stocks: Ref<Map<string, StockType>> = useStorage(
    "vue-storage-stocks",
    new Map()
  );
  const stockListPage = ref(1);
  const stockListNameFilter = ref("");
  const stockListOrderBy = ref("");

  const stockTable: Ref<Map<string, StockTableItemType>> = useStorage(
    "vue-storage-stock-table",
    new Map()
  );
  const stockTableLimit = ref(10);
  const stockTablePage = ref(1);
  const stockTableNameFilter = ref("");

  const loadingStockTable = ref(false);
  const importingStocksData = ref(false);

  const stockListLimit = computed(() => {
    stockListPage.value = 1;
    return displayToLimit(displayName.value);
  });
  const filteredStockList = computed(() => {
    const result = [];
    for (let stock of stocks.value.values()) {
      if (sanitize(stock.name).includes(sanitize(stockListNameFilter.value)))
        result.push(stock);
    }
    return result;
  });
  const stockListSize = computed(() => filteredStockList.value.length);
  const orderedCryptoList = computed(() =>
    filteredStockList.value.sort(dynamicSort(stockListOrderBy.value))
  );
  const pagedStockList = computed(() => {
    return orderedCryptoList.value.slice(
      (stockListPage.value - 1) * stockListLimit.value,
      stockListLimit.value * stockListPage.value
    );
  });
  const filteredStockTable = computed(() => {
    const result = [];
    for (let stock of stockTable.value.values()) {
      if (sanitize(stock.name).includes(sanitize(stockTableNameFilter.value)))
        result.push(stock);
    }
    return result;
  });
  const stockTableSize = computed(() => filteredStockTable.value.length);
  const pagedStockTable = computed(() => {
    return filteredStockTable.value.slice(
      (stockTablePage.value - 1) * stockTableLimit.value,
      stockTableLimit.value * stockTablePage.value
    );
  });
  const workingStock = computed(
    () => loadingStockTable.value || importingStocksData.value
  );
  const stocksValueAmount = computed(() => {
    let valueAmount = 0;
    for (let stock of stocks.value.values()) {
      const stockTableItemInfos = findStockTableItemById(stock.id);
      valueAmount += (stockTableItemInfos?.price as number) * stock.amount;
    }
    return valueAmount;
  });

  async function loadStockTable(force: boolean = false) {
    if (!force) {
      const isValidRequestRegulator = validateRequestRegulator(
        "LOAD_STOCK",
        30000
      );
      if (!isValidRequestRegulator) return;
    }
    try {
      loadingStockTable.value = true;
      let currencyMultiplier = 1;
      if (currency.value !== "brl") {
        const { data: conversionData }: any = await useFetch(
          `https://brapi.dev/api/v2/currency?currency=BRL-${currency.value.toUpperCase()}`
        );
        currencyMultiplier = conversionData.value.currency[0].askPrice;
        console.log(currencyMultiplier);
      }
      const { data: stocksData }: any = await useFetch(
        "https://brapi.dev/api/quote/list?sortBy=close&sortOrder=desc"
      );
      for (let item of stocksData.value.stocks) {
        const newStockTableItem = {
          id: item.stock,
          image: item.logo,
          name: item.name,
          price: item.close * currencyMultiplier,
          symbol: item.stock,
        };
        stockTable.value.set(item.stock, newStockTableItem);
      }
    } catch (e) {
    } finally {
      loadingStockTable.value = false;
    }
  }

  function createStock(data: StockType) {
    const transaction = createTransaction(0, data.amount);
    const newStock = {
      ...data,
      createdAt: new Date().getTime(),
      transactions: [transaction as TransactionType],
    };
    stocks.value.set(data.id, newStock);
  }

  function removeStock(stockId: string) {
    stocks.value.delete(stockId);
  }

  function removeAllStocks() {
    stocks.value.clear();
  }

  function calculateReservedValue(id: string, value: number, operator: number) {
    const stock = stocks.value.get(id) as StockType;
    const transaction = createTransaction(operator, value);
    stock.amount = (stock.amount || 0) + value * operator;
    stock.transactions = [
      ...(stock.transactions as Array<TransactionType>),
      transaction,
    ];
  }

  function findStockById(stockId: string) {
    return stocks.value.get(stockId);
  }

  function findStockTableItemById(stockId: string) {
    return stockTable.value.get(stockId);
  }

  function createTransaction(type: number, value: number): TransactionType {
    return {
      uuid: uuidv4(),
      createdAt: new Date().getTime(),
      type,
      value,
    };
  }

  function setStockListOrderBy(value: string) {
    stockListOrderBy.value = value;
  }

  watch(currency, async () => await loadStockTable(true), { immediate: true });

  return {
    stocks,

    stockListLimit,
    stockListPage,
    stockListNameFilter,
    stockTableLimit,
    stockTablePage,
    stockTableNameFilter,

    loadingStockTable,
    importingStocksData,
    workingStock,

    stockListSize,
    pagedStockList,
    stocksValueAmount,

    stockTableSize,
    pagedStockTable,

    loadStockTable,
    createStock,
    removeStock,
    removeAllStocks,
    calculateReservedValue,
    findStockById,
    findStockTableItemById,
    setStockListOrderBy,
  };
});
