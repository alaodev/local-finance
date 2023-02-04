<script lang="ts" setup>
import ReturnButtonLayout from "~~/layouts/return-button-layout.vue";
import WalletForm from "~~/pages/wallets/forms/create-form.vue";

const route = useRoute();
const walletsStore = useWallets();

const { wallet } = storeToRefs(walletsStore);
const { loadWallet, editWallet } = walletsStore;

const form = ref();

const walletUuid = computed(() => route.params.uuid);

function handleEditWallet() {
  const validData = form.value.validate();

  if (validData) {
    editWallet(walletUuid.value as string, validData);
    navigateTo("/wallets/");
  }
}

onMounted(() => {
  loadWallet(walletUuid.value as string);
  form.value.setData(wallet.value);
});
</script>

<template>
  <return-button-layout return-to="/wallets/">
    <v-row>
      <v-col>
        <v-card class="mx-auto pa-6" max-width="700">
          <v-card-title class="mb-5">
            {{ $t("pages.wallets.edit.card-title") }}
          </v-card-title>
          <v-card-text>
            <wallet-form ref="form" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="handleEditWallet">{{
              $t("pages.wallets.edit.create-btn")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </return-button-layout>
</template>
