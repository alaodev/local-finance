<script lang="ts" setup>
import TransactionItem from "~~/pages/wallets/components/transaction/transaction-item.vue";

import { TransactionType } from "~~/types/transaction";

type Props = {
  items: Array<TransactionType>;
};

const props = defineProps<Props>();
</script>

<template>
  <v-list lines="two" rounded>
    <v-list-subheader>Transações</v-list-subheader>
    <transaction-item v-for="item in props.items" :item="item" />
  </v-list>
</template>
