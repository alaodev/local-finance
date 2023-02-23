<script lang="ts" setup>
import EquityCard from "./components/equity-card.vue";

const walletsStore = useWallets();
const cryptosStore = useCryptos();

const { loadCryptoTable } = cryptosStore;

const { walletsReservedAmount } = storeToRefs(walletsStore);
const { cryptosValueAmount } = storeToRefs(cryptosStore);

const equityValue = computed(
  () => walletsReservedAmount.value + cryptosValueAmount.value
);

onMounted(() => loadCryptoTable());
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <equity-card :equity-value="equityValue" />
    </v-col>
  </v-row>
</template>
