<script lang="ts" setup>
import { useCurrencyInput } from "vue-currency-input";

type Props = {
  currency?: string;
  modelValue?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  currency: "USD",
});

const { inputRef } = useCurrencyInput({
  autoDecimalDigits: true,
  currency: props.currency,
  precision: 2,
});
</script>

<template>
  <v-text-field ref="inputRef" />
</template>
