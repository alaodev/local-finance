<script lang="ts" setup>
import { capitalize } from "~~/utils/formatters";

const route = useRoute();

const capitalizedRouteName = computed(() => capitalize(route.name as string));
</script>

<template>
  <v-app-bar>
    <v-toolbar-title>{{ capitalizedRouteName }}</v-toolbar-title>
  </v-app-bar>
</template>
