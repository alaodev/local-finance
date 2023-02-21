<script lang="ts" setup>
import { Ref } from "vue";
import { CryptoListItemType, CryptoType } from "~~/types/cryptos";

import { currency } from "~~/utils/formatters";

defineExpose({
  validate,
});

const cryptosStore = useCryptos();
const route = useRoute();
const i18n = useI18n();

const { loadingCryptoList } = storeToRefs(cryptosStore);

const { loadCryptoTable, findCryptoListItemById } = cryptosStore;
const { locale } = i18n;

const currentCrypto: Ref<CryptoListItemType | undefined> = ref();
watch(
  () => route.params.id,
  async (value) => {
    await loadCryptoTable();
    currentCrypto.value = findCryptoListItemById(value as string);
  },
  {
    immediate: true,
  }
);

const amount = ref();

function getData(): CryptoType {
  let data = {
    id: currentCrypto.value?.id as string,
    amount: amount.value,
    name: currentCrypto.value?.name as string,
    image: currentCrypto.value?.image as string,
  };

  return data;
}

function validate() {
  const data = getData();

  if (!data.amount) data.amount = 0;

  return data;
}
</script>

<template>
  <v-form>
    <v-row>
      <v-col class="d-flex align-center" cols="12">
        <xl-number-input v-model="amount" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center" cols="12">
        <span class="text-h5" v-if="!loadingCryptoList">
          {{ currency(currentCrypto?.price, locale) }} por moeda
        </span>
      </v-col>
    </v-row>
  </v-form>
</template>
