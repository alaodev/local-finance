<script lang="ts" setup>
import { localeToCurreny } from "~~/utils/converters";

defineExpose({
  validate,
});

const { locale } = useI18n();

const amount = ref(0);
const amountError = ref(false);
watch(amount, function () {
  amountError.value = false;
});

function getData() {
  return {
    amount: amount.value,
  };
}

function validate() {
  const data = getData();

  if (!data.amount) {
    amountError.value = true;
    return false;
  }

  return data;
}
</script>

<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <currency-input
          v-model="amount"
          :currency="localeToCurreny(locale)"
          :error="amountError"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
