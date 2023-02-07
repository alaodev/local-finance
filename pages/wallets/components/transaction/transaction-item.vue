<script lang="ts" setup>
import { TransactionType } from "~~/types/transaction";

type Props = {
  item: TransactionType;
};

const props = defineProps<Props>();
</script>

<template>
  <v-list-item
    :key="props.item.uuid"
    :title="props.item.type"
    :subtitle="props.item.createdAt"
  >
    <template v-slot:prepend>
      <v-avatar color="grey-lighten-1">
        <v-icon color="white">mdi-folder</v-icon>
      </v-avatar>
    </template>

    <template v-slot:append>
      <strong>{{ props.item.value }}</strong>
    </template>
  </v-list-item>
</template>
