<script lang="ts" setup>
import ListLayout from "~~/layouts/list-layout.vue";
import StockCard from "~~/pages/stocks/components/stock-card.vue";

const stocksStore = useStocks();

const {
  stocks,
  pagedStockList,
  stockListPage,
  stockListLimit,
  stockListSize,
  stockListNameFilter,
  workingStock,
} = storeToRefs(stocksStore);
const { loadStockTable, setStockListOrderBy } = stocksStore;

const sortItems = [
  [
    {
      icon: "mdi-sort-alphabetical-variant",
      callback: function () {
        setStockListOrderBy("createdAt");
      },
    },
    {
      icon: "mdi-sort-alphabetical-ascending-variant",
      callback: function () {
        setStockListOrderBy("name");
      },
    },
    {
      icon: "mdi-sort-alphabetical-descending-variant",
      callback: function () {
        setStockListOrderBy("-name");
      },
    },
  ],
  [
    {
      icon: "mdi-sort-numeric-variant",
      callback: function () {
        setStockListOrderBy("createdAt");
      },
    },
    {
      icon: "mdi-sort-numeric-ascending-variant",
      callback: function () {
        setStockListOrderBy("amount");
      },
    },
    {
      icon: "mdi-sort-numeric-descending-variant",
      callback: function () {
        setStockListOrderBy("-amount");
      },
    },
  ],
];

const paginationLength = computed(
  () =>
    stockListSize.value / stockListLimit.value +
    (stockListSize.value % stockListLimit.value ? 1 : 0)
);

onMounted(() => loadStockTable());
</script>

<template>
  <list-layout :empty="!stocks.size" :loading="workingStock">
    <template v-slot:list-filter>
      <v-row>
        <v-spacer />
        <v-col class="d-flex justify-end" cols="12" md="4">
          <text-input
            v-model="stockListNameFilter"
            class="mr-2"
            density="compact"
            label="Filtro"
            prepend-inner-icon="mdi-magnify"
          />
          <sort-bar :sort-items="sortItems" />
        </v-col>
      </v-row>
    </template>
    <template v-slot:list-content>
      <v-row v-if="!workingStock">
        <v-col v-for="stock of pagedStockList" cols="12" sm="6" md="4" xl="3">
          <stock-card :stock="stock" :key="stock.id" />
        </v-col>
      </v-row>
    </template>
    <template v-slot:list-paginator>
      <v-row>
        <v-col cols="12">
          <v-pagination
            v-model="stockListPage"
            :length="paginationLength"
            class="mx-auto"
          ></v-pagination>
        </v-col>
      </v-row>
    </template>
  </list-layout>
  <fab icon="mdi-plus" to="/stocks/list" />
</template>
