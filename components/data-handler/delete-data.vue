<script lang="ts" setup>
const walletsStore = useWallets();
const cryptosStore = useCryptos();
const stocksStore = useStocks();

const { removeAllWallets } = walletsStore;
const { removeAllCryptos } = cryptosStore;
const { removeAllStocks } = stocksStore;

const dialog = ref(false);

function handleDeleteData() {
  removeAllWallets();
  removeAllCryptos();
  removeAllStocks();
  dialog.value = false;
}
</script>

<template>
  <v-list-item prepend-icon="mdi-delete" link>
    <v-list-item-title>{{
      $t("appbar.data.delete.delete-list-item")
    }}</v-list-item-title>
    <v-dialog v-model="dialog" activator="parent" max-width="700">
      <v-card class="pa-6">
        <v-card-title>
          {{ $t("appbar.data.delete.delete-dialog.title") }}
        </v-card-title>
        <v-card-text>
          {{ $t("appbar.data.delete.delete-dialog.subtitle") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">
            {{ $t("appbar.data.delete.delete-dialog.close") }}
          </v-btn>
          <v-btn @click="handleDeleteData" color="primary" variant="flat">
            {{ $t("appbar.data.delete.delete-list-item") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>
