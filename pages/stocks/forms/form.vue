<script lang="ts" setup>
import { Ref } from "vue";
import { StockTableItemType, StockType } from "~~/types/stocks";

import { currencyNumber } from "~~/utils/formatters";

defineExpose({
  validate,
});

const stocksStore = useStocks();
const currencyStore = useCurrency();
const route = useRoute();

const { loadingStockTable } = storeToRefs(stocksStore);
const { currency } = storeToRefs(currencyStore);

const { loadStockTable, findStockTableItemById } = stocksStore;

const currentStock: Ref<StockTableItemType | undefined> = ref();
watch(
  () => route.params.id,
  async (value) => {
    await loadStockTable();
    currentStock.value = findStockTableItemById(value as string);
  },
  {
    immediate: true,
  }
);

const amount = ref();

function getData(): StockType {
  let data = {
    id: currentStock.value?.id as string,
    amount: amount.value,
    name: currentStock.value?.name as string,
    image: currentStock.value?.image as string,
  };

  return data;
}

function validate() {
  const data = getData();

  if (!data.amount) data.amount = 0;

  return data;
}
</script>

<template>
  <v-form>
    <v-row>
      <v-col class="d-flex align-center" cols="12">
        <xl-number-input v-model="amount" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center" cols="12">
        <span class="text-h5" v-if="!loadingStockTable">
          {{
            `${currencyNumber(currentStock?.price, currency)} ${$t(
              "pages.stocks.create.per-coin"
            )}`
          }}
        </span>
      </v-col>
    </v-row>
  </v-form>
</template>
