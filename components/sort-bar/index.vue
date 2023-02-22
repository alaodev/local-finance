<script lang="ts" setup>
import SortItem from "~~/components/sort-bar/sort-item.vue";

type Props = {
  sortItems: Array<{ icon: string; callback: Function }[]>;
};

const props = defineProps<Props>();
</script>

<template>
  <v-btn-toggle density="comfortable" variant="outlined" block divided>
    <sort-item v-for="sortItem in props.sortItems" :sort-item="sortItem" />
  </v-btn-toggle>
</template>
