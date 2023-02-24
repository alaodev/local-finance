<script lang="ts" setup>
const currencyStore = useCurrency();

const { currencies } = storeToRefs(currencyStore);
const { setCurrency } = currencyStore;
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-currency-usd" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in currencies"
        :key="index"
        @click="setCurrency(item.currencyCode)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
