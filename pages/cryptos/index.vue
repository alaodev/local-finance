<script lang="ts" setup>
import ListLayout from "~~/layouts/list-layout.vue";
import CryptoCard from "~~/pages/cryptos/components/crypto-card.vue";

const cryptosStore = useCryptos();

const {
  cryptos,
  pagedCryptoList,
  cryptoListPage,
  cryptoListLimit,
  cryptoListSize,
  cryptoListNameFilter,
  workingCrypto,
} = storeToRefs(cryptosStore);
const { loadCryptoTable, setCryptoListOrderBy } = cryptosStore;

const sortItems = [
  [
    {
      icon: "mdi-sort-alphabetical-variant",
      callback: function () {
        setCryptoListOrderBy("createdAt");
      },
    },
    {
      icon: "mdi-sort-alphabetical-ascending-variant",
      callback: function () {
        setCryptoListOrderBy("name");
      },
    },
    {
      icon: "mdi-sort-alphabetical-descending-variant",
      callback: function () {
        setCryptoListOrderBy("-name");
      },
    },
  ],
  [
    {
      icon: "mdi-sort-numeric-variant",
      callback: function () {
        setCryptoListOrderBy("createdAt");
      },
    },
    {
      icon: "mdi-sort-numeric-ascending-variant",
      callback: function () {
        setCryptoListOrderBy("amount");
      },
    },
    {
      icon: "mdi-sort-numeric-descending-variant",
      callback: function () {
        setCryptoListOrderBy("-amount");
      },
    },
  ],
];

const paginationLength = computed(
  () =>
    cryptoListSize.value / cryptoListLimit.value +
    (cryptoListSize.value % cryptoListLimit.value ? 1 : 0)
);

onMounted(() => loadCryptoTable());
</script>

<template>
  <list-layout :empty="!cryptos.size" :loading="workingCrypto">
    <template v-slot:list-filter>
      <v-row>
        <v-spacer />
        <v-col class="d-flex justify-end" cols="12" md="4">
          <text-input
            v-model="cryptoListNameFilter"
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
      <v-row v-if="!workingCrypto">
        <v-col v-for="crypto of pagedCryptoList" cols="12" sm="6" md="4" xl="3">
          <crypto-card :crypto="crypto" :key="crypto.id" />
        </v-col>
      </v-row>
    </template>
    <template v-slot:list-paginator>
      <v-row>
        <v-col cols="12">
          <v-pagination
            v-model="cryptoListPage"
            :length="paginationLength"
            class="mx-auto"
          ></v-pagination>
        </v-col>
      </v-row>
    </template>
  </list-layout>
  <fab icon="mdi-plus" to="/cryptos/list" />
</template>
