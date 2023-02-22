<script lang="ts" setup>
import ListLayout from "~~/layouts/list-layout.vue";
import WalletCard from "~~/pages/wallets/components/wallet-card.vue";

const walletsStore = useWallets();

const {
  wallets,
  walletsNameFilter,
  walletsPage,
  walletsLimit,
  walletsSize,
  pagedWallets,
  importingWalletsData,
} = storeToRefs(walletsStore);

const { setWalletsOrderBy } = walletsStore;

const sortItems = [
  [
    {
      icon: "mdi-sort-alphabetical-variant",
      callback: function () {
        setWalletsOrderBy("createdAt");
      },
    },
    {
      icon: "mdi-sort-alphabetical-ascending-variant",
      callback: function () {
        setWalletsOrderBy("name");
      },
    },
    {
      icon: "mdi-sort-alphabetical-descending-variant",
      callback: function () {
        setWalletsOrderBy("-name");
      },
    },
  ],
  [
    {
      icon: "mdi-sort-numeric-variant",
      callback: function () {
        setWalletsOrderBy("createdAt");
      },
    },
    {
      icon: "mdi-sort-numeric-ascending-variant",
      callback: function () {
        setWalletsOrderBy("reserved");
      },
    },
    {
      icon: "mdi-sort-numeric-descending-variant",
      callback: function () {
        setWalletsOrderBy("-reserved");
      },
    },
  ],
];

const paginationLength = computed(
  () =>
    walletsSize.value / walletsLimit.value +
    (walletsLimit.value % walletsSize.value ? 1 : 0)
);
</script>

<template>
  <list-layout :empty="!wallets.length" :loading="importingWalletsData">
    <template v-slot:list-filter>
      <v-row>
        <v-spacer />
        <v-col class="d-flex justify-end" cols="12" md="4">
          <text-input
            v-model="walletsNameFilter"
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
