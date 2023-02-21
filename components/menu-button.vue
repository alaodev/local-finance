<script lang="ts" setup>
import { MenuButtonItemType } from "~~/types/menu-button";

type Props = {
  items: Array<MenuButtonItemType>;
};

const props = defineProps<Props>();
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, index) in props.items"
        :key="index"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        density="compact"
      />
    </v-list>
  </v-menu>
</template>
