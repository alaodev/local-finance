<script lang="ts" setup>
const drawer = ref(true);
</script>

<template>
  <v-app>
    <navigation-drawer v-model="drawer" />
    <app-bar />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
