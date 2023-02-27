<script lang="ts" setup>
import ReturnButtonLayout from "~~/layouts/return-button-layout.vue";
import { TransactionType } from "~~/types/transaction";
import TransactionList from "../components/transaction/transaction-list.vue";

const route = useRoute();
const stocksStore = useStocks();

const { findStockById } = stocksStore;

const stockId = computed(() => route.params.id as string);
const stock = computed(() => findStockById(stockId.value));
</script>

<template>
  <return-button-layout return-to="/stocks/">
    <transaction-list
      :items="(stock?.transactions as Array<TransactionType>)"
      :title="$t('transactions.title')"
    />
  </return-button-layout>
</template>
