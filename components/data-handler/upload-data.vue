<script lang="ts" setup>
const walletsStore = useWallets();
const cryptosStore = useCryptos();

const { wallets } = storeToRefs(walletsStore);
const { cryptos, importingCryptoData } = storeToRefs(cryptosStore);

function upload(event: Event) {
  try {
    importingCryptoData.value = true;
    const files = (event.target as HTMLInputElement).files as FileList;
    if (files.length === 0) return;
    let fr = new FileReader();
    fr.onload = function (e) {
      let result = JSON.parse((e.target as FileReader).result as string);
      wallets.value = result.wallets;
      cryptos.value = result.cryptos;
    };
    fr.readAsText(files[0]);
  } catch (e) {
    console.error(e);
  } finally {
    importingCryptoData.value = false;
  }
}

function handleFileSelector() {
  (document.getElementById("fileInput") as HTMLInputElement).click();
}
</script>

<template>
  <v-list-item @click="handleFileSelector" prepend-icon="mdi-upload" link>
    <v-list-item-title>{{ $t("appbar.data.import") }}</v-list-item-title>
    <input @change="upload" id="fileInput" type="file" hidden />
  </v-list-item>
</template>
