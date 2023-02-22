<script lang="ts" setup>
import EquityCard from "./components/equity-card.vue";

const walletsStore = useWallets();
const cryptosStore = useCryptos();

const { walletReservedAmount } = storeToRefs(walletsStore);
</script>

<template>
  <v-row>
    <v-col cols="4">
      <equity-card :equity-value="walletReservedAmount" />
    </v-col>
    <v-col cols="8"> </v-col>
  </v-row>
</template>
