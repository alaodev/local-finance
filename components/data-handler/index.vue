<script lang="ts" setup>
import DownloadData from "./download-data.vue";
import UploadData from "./upload-data.vue";
import DeleteData from "./delete-data.vue";
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-database-outline" v-bind="props"></v-btn>
    </template>

    <v-list>
      <download-data />
      <upload-data />
      <delete-data />
    </v-list>
  </v-menu>
</template>
