<script lang="ts" setup>
const drawerStore = useDrawer();

const { drawer, items } = storeToRefs(drawerStore);

const drawerStateIcon = computed(() =>
  drawer.value ? "mdi-circle-outline" : "mdi-record-circle-outline"
);
</script>

<template>
  <v-navigation-drawer :rail="drawer" expand-on-hover>
    <v-list>
      <v-list-item>
        <template v-slot:prepend>
          <v-icon icon="mdi-cash" />
        </template>
        <template v-slot:title>
          <span>LOCAL FINANCES</span>
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
