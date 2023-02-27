<script lang="ts" setup>
import logo from "~~/assets/images/local-finance-logo.svg";

const navigationStore = useNavigation();

const { drawer, items } = storeToRefs(navigationStore);

const drawerStateIcon = computed(() =>
  drawer.value ? "mdi-circle-outline" : "mdi-record-circle-outline"
);
</script>

<template>
  <v-navigation-drawer :rail="drawer" expand-on-hover>
    <v-list>
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar :image="logo" rounded="0" />
        </template>
        <template v-slot:title>
          <sub>LOCAL FINANCES</sub>
        </template>
        <template v-slot:append>
          <v-icon @click="drawer = !drawer" :icon="drawerStateIcon" />
        </template>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list :items="items" density="compact" nav></v-list>
  </v-navigation-drawer>
</template>
