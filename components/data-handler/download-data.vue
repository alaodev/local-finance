<script lang="ts" setup>
const walletsStore = useWallets();
const cryptosStore = useCryptos();

const { wallets } = walletsStore;
const { cryptos } = cryptosStore;

function download() {
  const walletsData = wallets.map((wallet) => ({
    goal: wallet.goal,
    icon: wallet.icon,
    name: wallet.name,
    reserved: wallet.reserved,
    transactions: wallet.transactions?.map((transaction) => ({
      createdAt: transaction.createdAt,
      type: transaction.type,
      value: transaction.value,
    })),
  }));
  const cryptosData = cryptos.map((crypto) => ({
    amount: crypto.amount,
    image: crypto.image,
    name: crypto.name,
    transactions: crypto.transactions?.map((transaction) => ({
      createdAt: transaction.createdAt,
      type: transaction.type,
      value: transaction.value,
    })),
  }));
  const data = { wallets: walletsData, cryptos: cryptosData };
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
