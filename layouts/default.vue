<script lang="ts" setup>
const store = useTheme();

const { theme } = storeToRefs(store);
</script>

<template>
  <v-app :theme="theme">
    <navigation-drawer />
    <app-bar />
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
