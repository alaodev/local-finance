<script lang="ts" setup>
import { useCurrencyInput } from "vue-currency-input";

type Props = {
  currency?: string;
  modelValue?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  currency: "USD",
});

const { inputRef, setValue, formattedValue, numberValue } = useCurrencyInput({
  autoDecimalDigits: true,
  currency: props.currency,
  precision: 2,
});

const value = computed({
  get() {
    return formattedValue.value;
  },
  set() {
    return numberValue.value;
  },
});

watch(
  () => props.modelValue,
  async (value) => {
    setValue(value as number);
  }
);
</script>

<template>
  <v-text-field v-model="value" ref="inputRef" type="text" />
</template>
