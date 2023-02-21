<script lang="ts" setup>
type Props = {
  cryptoId: string;
};

const props = defineProps<Props>();

const crytosStore = useCryptos();

const { removeCrypto } = crytosStore;

const dialog = ref(false);

function handleRemoveCrypto() {
  removeCrypto(props.cryptoId);
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
          <v-btn @click="handleRemoveCrypto" color="primary" variant="flat">
            <slot />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>
