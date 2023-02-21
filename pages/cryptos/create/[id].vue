<script lang="ts" setup>
import ReturnButtonLayout from "~~/layouts/return-button-layout.vue";
import CryptoForm from "~~/pages/cryptos/forms/form.vue";

const cryptosStore = useCryptos();

const { createCrypto } = cryptosStore;

const form = ref();

function handleCreateCrypto() {
  const validData = form.value.validate();

  if (validData) {
    createCrypto(validData);
    navigateTo("/cryptos/");
  }
}
</script>

<template>
  <return-button-layout return-to="/cryptos/list">
    <v-row>
      <v-col>
        <v-card class="mx-auto pa-6" max-width="700">
          <v-card-title class="mb-5"> Adicionar criptomoeda </v-card-title>
          <v-card-text>
            <crypto-form ref="form" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="handleCreateCrypto">Adicionar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </return-button-layout>
</template>
