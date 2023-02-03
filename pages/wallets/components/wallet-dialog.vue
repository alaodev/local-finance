<script lang="ts" setup>
type Props = {
  title: string;
  walletId?: string;
  operator: number;
};

const props = defineProps<Props>();

const walletsStore = useWallets();

const { calculateReservedValue } = walletsStore;

const dialog = ref(false);

const value = ref(0);
const valueError = ref(false);
watch(value, function () {
  valueError.value = false;
});

function validate() {
  if (!value.value) {
    return false;
  }
  return true;
}

function handleOperation() {
  if (validate()) {
    calculateReservedValue(
      props.walletId as string,
      value.value,
      props.operator
    );
  }
}
</script>

<template>
  <v-btn color="primary" size="small" block>
    <slot />
    <v-dialog v-model="dialog" activator="parent" max-width="500">
      <v-card class="pa-6">
        <v-card-title> {{ props.title }} </v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12">
                <currency-input v-model="value" :error="valueError" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-spacer />
          <v-btn @click="dialog = false">Fechar</v-btn>
          <v-btn @click="handleOperation" color="primary" variant="flat">
            <slot />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
