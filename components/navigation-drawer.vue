<script lang="ts" setup>
const store = useDrawer();

const { drawer } = storeToRefs(store);
</script>

<template>
  <v-navigation-drawer v-model="drawer"> </v-navigation-drawer>
</template>
