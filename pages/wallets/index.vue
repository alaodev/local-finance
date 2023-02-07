<script lang="ts" setup>
import WalletCard from "~~/pages/wallets/components/wallet-card.vue";

const walletsStore = useWallets();

const { wallets } = storeToRefs(walletsStore);
</script>

<template>
  <v-row>
    <v-col v-for="wallet of wallets" cols="12" sm="6" md="4" xl="3">
      <wallet-card :wallet="wallet" />
    </v-col>
  </v-row>
  <fab icon="mdi-plus" to="/wallets/create" />
</template>
