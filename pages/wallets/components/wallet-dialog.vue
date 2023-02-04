<script lang="ts" setup>
import DialogForm from "../forms/dialog-form.vue";

type Props = {
  title: string;
  walletId?: string;
  operator: number;
};

const props = defineProps<Props>();

const walletsStore = useWallets();

const { calculateReservedValue } = walletsStore;

const dialog = ref(false);
const form = ref();

function handleCalculateReservedAmount() {
  const validData = form.value.validate();

  if (validData) {
    const { amount } = validData;
    calculateReservedValue(props.walletId as string, amount, props.operator);
    dialog.value = false;
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
          <dialog-form ref="form" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">Fechar</v-btn>
          <v-btn
            @click="handleCalculateReservedAmount"
            color="primary"
            variant="flat"
          >
            <slot />
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
