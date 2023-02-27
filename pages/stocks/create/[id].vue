<script lang="ts" setup>
import ReturnButtonLayout from "~~/layouts/return-button-layout.vue";
import StockForm from "~~/pages/stocks/forms/form.vue";

const stocksStore = useStocks();

const { createStock } = stocksStore;

const form = ref();

function handleCreateStock() {
  const validData = form.value.validate();

  if (validData) {
    createStock(validData);
    navigateTo("/stocks/");
  }
}
</script>

<template>
  <return-button-layout return-to="/stocks/list">
    <v-row>
      <v-col>
        <v-card class="mx-auto pa-6" max-width="700">
          <v-card-title class="mb-5">
            {{ $t("pages.stocks.create.title") }}
          </v-card-title>
          <v-card-text>
            <stock-form ref="form" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="handleCreateStock">
              {{ $t("pages.stocks.create.btn-add") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </return-button-layout>
</template>
