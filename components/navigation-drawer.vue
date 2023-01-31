<script lang="ts" setup>
const store = useDrawer();

const { rail } = storeToRefs(store);

const drawerStateIcon = computed(() =>
  rail.value ? "mdi-circle-outline" : "mdi-record-circle-outline"
);
</script>

<template>
  <v-navigation-drawer :rail="rail" expand-on-hover>
    <v-list>
      <v-list-item>
        <template v-slot:prepend>
          <v-icon icon="mdi-cash" />
        </template>
        <template v-slot:title>
          <span>LOCAL FINANCES</span>
        </template>
        <template v-slot:append>
          <v-icon @click="rail = !rail" :icon="drawerStateIcon" />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
