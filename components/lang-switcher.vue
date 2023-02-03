<script lang="ts" setup>
const localesStore = useLocales();

const { locales } = storeToRefs(localesStore);
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-translate" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in locales"
        :key="index"
        @click="$i18n.setLocale(item.code)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
