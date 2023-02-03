<script lang="ts" setup>
import WalletCard from "~~/pages/wallets/components/wallet-card.vue";

const walletsStore = useWallets();

const { wallets } = storeToRefs(walletsStore);
</script>

<template>
  <v-row>
    <v-col class="d-flex" cols="12">
      <v-spacer />
      <v-btn color="primary" to="/wallets/create" variant="flat">{{
        $t("pages.wallets.index.new-wallet")
      }}</v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-for="wallet of wallets" cols="12" sm="6" md="4">
      <wallet-card :wallet="wallet" />
    </v-col>
  </v-row>
</template>
