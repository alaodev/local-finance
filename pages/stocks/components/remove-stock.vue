<script lang="ts" setup>
type Props = {
  stockId: string;
};

const props = defineProps<Props>();

const stocksStore = useStocks();

const { removeStock } = stocksStore;

const dialog = ref(false);

function handleRemoveStock() {
  removeStock(props.stockId);
  dialog.value = false;
}
</script>

<template>
  <v-list-item prepend-icon="mdi-delete-outline" density="compact">
    <v-list-item-title>
      <slot />
    </v-list-item-title>
    <v-dialog v-model="dialog" activator="parent" max-width="500">
      <v-card class="pa-6">
        <v-card-title>
          {{ $t("pages.wallets.remove.card-title") }}
        </v-card-title>
        <v-card-text> {{ $t("pages.wallets.remove.card-text") }} </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">
            {{ $t("pages.wallets.remove.close") }}
          </v-btn>
          <v-btn @click="handleRemoveStock" color="primary" variant="flat">
            <slot />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>
