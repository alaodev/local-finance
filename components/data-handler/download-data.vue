<script lang="ts" setup>
const walletsStore = useWallets();
const cryptosStore = useCryptos();

const { wallets } = walletsStore;
const { cryptos } = cryptosStore;

function download() {
  const data = { wallets, cryptos };
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  let a = document.createElement("a");
  a.setAttribute("href", dataStr);
  a.setAttribute("download", "data.json");
  a.click();
}
</script>

<template>
  <v-list-item @click="download" prepend-icon="mdi-download" link>
    <v-list-item-title>{{ $t("appbar.data.export") }}</v-list-item-title>
  </v-list-item>
</template>
