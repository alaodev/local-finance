<script lang="ts" setup>
import WalletForm from "~~/pages/wallets/forms/create-form.vue";

const walletsStore = useWallets();

const { createWallet } = walletsStore;

const form = ref();

function handleCreateWallet() {
  const validData = form.value.validate();

  if (validData) {
    createWallet(validData);
    navigateTo("/wallets/");
  }
}
</script>

<template>
  <v-row>
    <v-col>
      <v-btn icon="mdi-arrow-left" to="/wallets/" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card class="mx-auto pa-6" max-width="700">
        <v-card-title class="mb-5">
          {{ $t("pages.wallets.create.card-title") }}
        </v-card-title>
        <v-card-text>
          <wallet-form ref="form" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="handleCreateWallet">{{
            $t("pages.wallets.create.create-btn")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
