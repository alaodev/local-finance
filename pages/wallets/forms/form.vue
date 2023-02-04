<script lang="ts" setup>
import { WalletType } from "~~/types/wallet";

defineExpose({
  setData,
  validate,
});

const route = useRoute();

const name = ref();
const nameError = ref(false);
watch(name, function () {
  nameError.value = false;
});

const goal = ref();

const reserved = ref(0);
const reservedError = ref(false);
watch(reserved, function () {
  reservedError.value = false;
});

const editMode = computed(() => (route.params.uuid ? true : false));

function getData(): WalletType {
  let data: WalletType = {
    name: name.value,
    goal: goal.value,
  };

  if (!editMode.value) data.reserved = reserved.value;

  return data;
}

function setData(data: WalletType) {
  name.value = data.name;
  goal.value = data.goal;
  if (editMode.value) reserved.value = data.reserved as number;
}

function validate(): WalletType | Boolean {
  let hasError = false;
  const data = getData();

  if (!data.name) {
    nameError.value = true;
    hasError = true;
  }

  if (!editMode) {
    if (!data.reserved && data.reserved !== 0) {
      reservedError.value = true;
      hasError = true;
    }
  }

  if (hasError) return false;

  return data;
}
</script>

<template>
  <v-form>
    <v-row>
      <v-col cols="12">
        <text-input
          v-model="name"
          :error="nameError"
          :label="$t('pages.wallets.form.wallet-name')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" :sm="editMode ? 12 : 6">
        <currency-input
          v-model="goal"
          :label="$t('pages.wallets.form.set-goal')"
        />
      </v-col>
      <v-col v-if="!editMode" cols="12" sm="6">
        <currency-input
          v-model="reserved"
          :error="reservedError"
          :label="$t('pages.wallets.form.initial-reserve')"
        />
      </v-col>
    </v-row>
  </v-form>
</template>
