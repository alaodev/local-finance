<script lang="ts" setup>
import ListLayout from "~~/layouts/list-layout.vue";
import WalletCard from "~~/pages/wallets/components/wallet-card.vue";

const walletsStore = useWallets();

const {
  walletsNameFilter,
  walletsPage,
  walletsLimit,
  walletsSize,
  pagedWallets,
  importingWalletsData,
} = storeToRefs(walletsStore);

const paginationLength = computed(
  () =>
    walletsSize.value / walletsLimit.value +
    (walletsLimit.value % walletsSize.value ? 1 : 0)
);
</script>

<template>
  <list-layout :loading="importingWalletsData">
    <template v-slot:list-filter>
      <v-row>
        <v-spacer />
        <v-col cols="12" md="3">
          <text-input
            v-model="walletsNameFilter"
            density="compact"
            label="Filtro"
            prepend-inner-icon="mdi-magnify"
          />
        </v-col>
      </v-row>
    </template>
    <template v-slot:list-content>
      <v-row>
        <v-col v-for="wallet of pagedWallets" cols="12" sm="6" md="4" xl="3">
          <wallet-card :wallet="wallet" />
        </v-col>
      </v-row>
    </template>
    <template v-slot:list-paginator>
      <v-row>
        <v-col cols="12">
          <v-pagination
            v-model="walletsPage"
            :length="paginationLength"
            class="mx-auto"
          ></v-pagination>
        </v-col>
      </v-row>
    </template>
  </list-layout>
  <fab icon="mdi-plus" to="/wallets/create" />
</template>
