<script lang="ts" setup>
import ReturnButtonLayout from "~~/layouts/return-button-layout.vue";
import StockList from "~~/pages/stocks/components/stock-list.vue";

const stocksStore = useStocks();

const {
  stockTableLimit,
  stockTablePage,
  stockTableNameFilter,
  loadingStockTable,
  stockTableSize,
  pagedStockTable,
} = storeToRefs(stocksStore);
const { loadStockTable } = stocksStore;

const limitItems = [5, 10, 25, 50, 100];

const paginationLength = computed(
  () =>
    stockTableSize.value / stockTableLimit.value +
    (stockTableSize.value % stockTableLimit.value ? 1 : 0)
);

onMounted(() => loadStockTable());
</script>

<template>
  <return-button-layout return-to="/stocks/">
    <v-row>
      <v-col>
        <v-card
          :disabled="loadingStockTable"
          :loading="loadingStockTable"
          class="mx-auto pa-6"
          max-width="900"
        >
          <v-card-title class="d-flex mb-5">
            {{ $t("pages.stocks.list.stock-list-card.title") }}
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="8" sm="10">
                <text-input
                  v-model="stockTableNameFilter"
                  prepend-inner-icon="mdi-magnify"
                  density="compact"
                  :label="$t('pages.stocks.list.stock-list-card.filter')"
                />
              </v-col>
              <v-col cols="4" sm="2"
                ><select-input
                  v-model="stockTableLimit"
                  :clearable="false"
                  :items="limitItems"
                  density="compact"
                  style="max-width: fit-content"
              /></v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <stock-list :stocks="pagedStockTable" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-pagination
              v-model="stockTablePage"
              :length="paginationLength"
              class="mx-auto"
            ></v-pagination>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </return-button-layout>
</template>
