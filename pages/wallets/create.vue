<script lang="ts" setup>
import WalletForm from "~~/pages/wallets/form.vue";

const walletsStore = useWallets();

const { wallets } = storeToRefs(walletsStore);
const { createWallet } = walletsStore;

const form = ref();

function handleCreateWallet() {
  const validData = form.value.validate();

  if (validData) createWallet(validData);
}
</script>

<template>
  <v-row>
    <v-col>
      <v-btn icon="mdi-arrow-left" to="/wallets" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card class="mx-auto pa-6" max-width="700">
        <v-card-title class="mb-5"> Create your wallet </v-card-title>
        <v-card-text>
          <wallet-form ref="form" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="handleCreateWallet">CREATE</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
