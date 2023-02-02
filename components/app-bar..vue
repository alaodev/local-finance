<script lang="ts" setup>
import { capitalize } from "~~/utils/formatters";

const route = useRoute();

const breadcrumbItems = computed(() => {
  const splittedFullPath = route.fullPath.split("/").slice(1);
  const items = [];
  let currentPath = "/";

  for (let path of splittedFullPath) {
    currentPath += `${path}/`;
    items.push({
      title: capitalize(path),
      to: currentPath,
    });
  }

  return items;
});

route.fullPath
  .split("/")
  .slice(1)
  .map((item) => ({ title: capitalize(item) }));

console.log(breadcrumbItems);
</script>

<template>
  <v-app-bar>
    <v-breadcrumbs :items="breadcrumbItems"> </v-breadcrumbs>
    <v-spacer />
    <theme-switcher />
  </v-app-bar>
</template>
