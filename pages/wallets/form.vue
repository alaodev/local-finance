<script lang="ts" setup>
import { WalletType } from "~~/types/wallet";

defineExpose({
  validate,
});

const name = ref();
const nameError = ref(false);
watch(name, function () {
  nameError.value = false;
});

const goal = ref();

function getData(): WalletType {
  return {
    name: name.value,
    goal: goal.value,
  };
}

function validate(): WalletType | Boolean {
  const data = getData();

  if (!data.name) {
    nameError.value = true;
    return false;
  }

  return data;
}
</script>

<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          :error="nameError"
          :label="'Wallet name'"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model.number="goal"
          :label="'Set a goal'"
          hide-details
        />
      </v-col>
    </v-row>
  </v-form>
</template>
