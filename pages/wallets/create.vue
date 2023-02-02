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
      <v-card
        class="mx-auto px-6 py-8"
        max-width="700"
        title="Create your wallet"
      >
        <v-card-item>
          <wallet-form ref="form" />
        </v-card-item>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="handleCreateWallet">CREATE</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
