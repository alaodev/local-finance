<script lang="ts" setup>
import { useCurrencyInput } from "vue-currency-input";
import { localeToCurreny } from "~~/utils/converters";

type Props = {
  modelValue?: string | number;
};

const props = defineProps<Props>();

const { locale } = useI18n();
const { inputRef, setOptions, setValue, formattedValue, numberValue } =
  useCurrencyInput({
    autoDecimalDigits: true,
    currency: localeToCurreny(locale.value),
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

watch(locale, (locale) => {
  setOptions({
    currency: localeToCurreny(locale),
  });
});
</script>

<template>
  <v-text-field v-model="value" ref="inputRef" type="text" />
</template>
