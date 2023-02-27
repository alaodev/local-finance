<script lang="ts" setup>
import { currencyNumber } from "~~/utils/formatters";

type Props = {
  equityValue: number;
};

const props = defineProps<Props>();

const currencyStore = useCurrency();

const { currency } = storeToRefs(currencyStore);
</script>

<template>
  <v-card
    :title="$t('pages.dashboard.total-equity-card.title')"
    :subtitle="$t('pages.dashboard.total-equity-card.subtitle')"
    class="pa-6"
  >
    <v-sheet class="pa-6">
      <span class="text-h4 text-primary">
        {{ currencyNumber(props.equityValue, currency) }}
      </span>
    </v-sheet>
  </v-card>
</template>

<style lang="scss" scoped></style>
