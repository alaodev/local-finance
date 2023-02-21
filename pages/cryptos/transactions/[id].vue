<script lang="ts" setup>
import ReturnButtonLayout from "~~/layouts/return-button-layout.vue";
import { TransactionType } from "~~/types/transaction";
import TransactionList from "../components/transaction/transaction-list.vue";

const route = useRoute();
const cryptosStore = useCryptos();

const { findCryptoById } = cryptosStore;

const cryptoId = computed(() => route.params.id as string);
const crypto = computed(() => findCryptoById(cryptoId.value));
</script>

<template>
  <return-button-layout return-to="/cryptos/">
    <transaction-list
      :items="(crypto?.transactions as Array<TransactionType>)"
      :title="$t('transactions.title')"
    />
  </return-button-layout>
</template>
