<script lang="ts" setup>
import { currency } from "~~/utils/formatters";

import WalletDialog from "~~/pages/wallets/components/wallet-dialog.vue";

type Props = {
  wallet: {
    uuid?: string;
    name: string;
    reserved?: string | number;
    goal?: string | number;
  };
};

const props = defineProps<Props>();

const { locale } = useI18n();

const goalPercentage = computed(() => {
  if (props.wallet.goal) {
    const percentage =
      (parseFloat(props.wallet.reserved as string) * 100) /
      parseFloat(props.wallet.goal as string);
    return `${Math.round(percentage)}%`;
  }

  return 0;
});
</script>

<template>
  <v-card class="pa-6">
    <v-row>
      <v-col class="d-flex">
        <v-card-title class="ml-n4">
          {{ props.wallet.name }}
        </v-card-title>
        <v-spacer />
        <v-btn
          icon="mdi-cog-outline"
          :to="`/wallets/edit/${props.wallet.uuid}`"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet class="pa-6" color="pink">
          <v-row>
            <v-col cols="8" class="justify-center d-flex flex-column">
              <span>{{
                $t("pages.wallets.index.wallet-card.money-header")
              }}</span>
              <span class="text-h5">{{
                currency(props.wallet.reserved, locale)
              }}</span>
            </v-col>
            <v-col cols="4" class="align-center d-flex justify-center">
              <v-progress-circular
                v-if="props.wallet.goal"
                :model-value="goalPercentage"
                :size="60"
                :width="10"
              >
                {{ goalPercentage }}
              </v-progress-circular>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <span>{{ $t("pages.wallets.index.wallet-card.goal-text") }}</span>
        <strong>{{
          props.wallet.goal
            ? currency(props.wallet.goal, locale)
            : $t("pages.wallets.index.wallet-card.goal-not-defined")
        }}</strong>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <wallet-dialog
          :title="
            $t('pages.wallets.index.wallet-card.btn-group.reserve.dialog')
          "
          :operator="1"
          :wallet-id="props.wallet.uuid"
        >
          {{ $t("pages.wallets.index.wallet-card.btn-group.reserve.title") }}
        </wallet-dialog>
      </v-col>
      <v-col cols="6">
        <wallet-dialog
          :title="
            $t('pages.wallets.index.wallet-card.btn-group.withdraw.dialog')
          "
          :operator="-1"
          variant="tonal"
          :wallet-id="props.wallet.uuid"
        >
          {{ $t("pages.wallets.index.wallet-card.btn-group.withdraw.title") }}
        </wallet-dialog>
      </v-col>
    </v-row>
  </v-card>
</template>
