<script lang="ts" setup>
import TransactionItem from "~~/pages/cryptos/components/transaction/transaction-item.vue";

import { TransactionType } from "~~/types/transaction";

type Props = {
  title: string;
  items: Array<TransactionType>;
};

const props = defineProps<Props>();
</script>

<template>
  <v-list class="mx-auto pa-6" lines="two" max-width="700" rounded>
    <v-list-subheader>{{ props.title }}</v-list-subheader>
    <transaction-item v-for="item in props.items" :item="item" />
  </v-list>
</template>
