<script lang="ts" setup>
import EquityCard from "./components/equity-card.vue";
import EquityCategory from "./components/equity-category/index.vue";

const walletsStore = useWallets();
const cryptosStore = useCryptos();
const stocksStore = useStocks();
const i18n = useI18n();

const { loadCryptoTable } = cryptosStore;
const { t } = i18n;

const { walletsReservedAmount } = storeToRefs(walletsStore);
const { cryptosValueAmount } = storeToRefs(cryptosStore);
const { stocksValueAmount } = storeToRefs(stocksStore);

const equityValue = computed(
  () =>
    walletsReservedAmount.value +
    cryptosValueAmount.value +
    stocksValueAmount.value
);
const equityCategoryItems = computed(() => [
  {
    color: "pink",
    icon: "mdi-wallet",
    title: t(
      "pages.dashboard.equity-category-card.equity-category-card-items.wallets"
    ),
    value: walletsReservedAmount.value,
  },
  {
    color: "purple",
    icon: "mdi-bitcoin",
    title: t(
      "pages.dashboard.equity-category-card.equity-category-card-items.cryptos"
    ),
    value: cryptosValueAmount.value,
  },
  {
    color: "green",
    icon: "mdi-chart-areaspline-variant",
    title: t(
      "pages.dashboard.equity-category-card.equity-category-card-items.stocks"
    ),
    value: stocksValueAmount.value,
  },
]);

onMounted(() => loadCryptoTable());
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <equity-card :equity-value="equityValue" />
    </v-col>
    <v-col cols="12" md="8">
      <equity-category :items="equityCategoryItems" />
    </v-col>
  </v-row>
</template>
