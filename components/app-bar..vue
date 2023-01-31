<script lang="ts" setup>
const store = useDrawer();

const { drawer } = storeToRefs(store);
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Page Title</v-toolbar-title>
  </v-app-bar>
</template>
