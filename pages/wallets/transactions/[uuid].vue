<script lang="ts" setup>
import ReturnButtonLayout from "~~/layouts/return-button-layout.vue";
import { TransactionType } from "~~/types/transaction";
import TransactionList from "../components/transaction/transaction-list.vue";

const route = useRoute();
const walletsStore = useWallets();

const { wallet } = storeToRefs(walletsStore);
const { loadWallet } = walletsStore;

const walletUuid = computed(() => route.params.uuid as string);

onMounted(() => {
  loadWallet(walletUuid.value as string);
});
</script>

<template>
  <return-button-layout return-to="/wallets/">
    <transaction-list
      :items="(wallet?.transactions as Array<TransactionType>)"
    />
  </return-button-layout>
</template>
