<script lang="ts" setup>
import ListLayout from "~~/layouts/list-layout.vue";
import CryptoCard from "~~/pages/cryptos/components/crypto-card.vue";

const cryptosStore = useCryptos();

const {
  pagedCryptoList,
  cryptoListPage,
  cryptoListLimit,
  cryptoListSize,
  cryptoListNameFilter,
  loadingCryptoTable,
} = storeToRefs(cryptosStore);
const { loadCryptoTable } = cryptosStore;

const paginationLength = computed(
  () =>
    cryptoListSize.value / cryptoListLimit.value +
    (cryptoListSize.value % cryptoListLimit.value ? 1 : 0)
);

onMounted(() => loadCryptoTable());
</script>

<template>
  <list-layout :loading="loadingCryptoTable">
    <template v-slot:list-filter>
      <v-row>
        <v-spacer />
        <v-col cols="12" md="3">
          <text-input
            v-model="cryptoListNameFilter"
            density="compact"
            label="Filtro"
            prepend-inner-icon="mdi-magnify"
          />
        </v-col>
      </v-row>
    </template>
    <template v-slot:list-content>
      <v-row v-if="!loadingCryptoTable">
        <v-col v-for="crypto of pagedCryptoList" cols="12" sm="6" md="4" xl="3">
          <crypto-card :crypto="crypto" :key="crypto.id" />
        </v-col>
      </v-row>
    </template>
    <template v-slot:list-layout__paginator>
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
