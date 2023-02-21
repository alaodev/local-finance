<script lang="ts" setup>
import ReturnButtonLayout from "~~/layouts/return-button-layout.vue";
import CryptoList from "~~/pages/cryptos/components/crypto-list.vue";

const cryptosStore = useCryptos();

const {
  cryptoTableLimit,
  cryptoTablePage,
  cryptoTableNameFilter,
  loadingCryptoTable,
  cryptoTableSize,
  pagedCryptoTable,
} = storeToRefs(cryptosStore);
const { loadCryptoTable } = cryptosStore;

const limitItems = [5, 10, 25, 50, 100];

const paginationLength = computed(
  () =>
    cryptoTableSize.value / cryptoTableLimit.value +
    (cryptoTableSize.value % cryptoTableLimit.value ? 1 : 0)
);

onMounted(() => loadCryptoTable());
</script>

<template>
  <return-button-layout return-to="/cryptos/">
    <v-row>
      <v-col>
        <v-card
          :disabled="loadingCryptoTable"
          :loading="loadingCryptoTable"
          class="mx-auto pa-6"
          max-width="900"
        >
          <v-card-title class="d-flex mb-5">
            {{ $t("pages.cryptos.list.crypto-list-card.title") }}
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="8" sm="10">
                <text-input
                  v-model="cryptoTableNameFilter"
                  prepend-inner-icon="mdi-magnify"
                  density="compact"
                  :label="$t('pages.cryptos.list.crypto-list-card.filter')"
                />
              </v-col>
              <v-col cols="4" sm="2"
                ><select-input
                  v-model="cryptoTableLimit"
                  :clearable="false"
                  :items="limitItems"
                  density="compact"
                  style="max-width: fit-content"
              /></v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <crypto-list :cryptos="pagedCryptoTable" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-pagination
              v-model="cryptoTablePage"
              :length="paginationLength"
              class="mx-auto"
            ></v-pagination>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </return-button-layout>
</template>
