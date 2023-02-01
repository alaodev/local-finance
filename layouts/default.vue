<script lang="ts" setup>
const themeStore = useTheme();

const { theme } = storeToRefs(themeStore);
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
