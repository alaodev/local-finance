<script lang="ts" setup>
import { currency } from "~~/utils/formatters";
import { CryptoType } from "~~/types/cryptos";

import PercentIndicator from "./percent-indicator.vue";
import CryptoDialog from "./crypto-dialog.vue";
import RemoveCrypto from "./remove-crypto.vue";
import Sparkline from "./sparkline.vue";

type Props = {
  crypto: CryptoType;
};

const props = defineProps<Props>();

const crytosStore = useCryptos();
const i18n = useI18n();

const { findCryptoListItemById } = crytosStore;
const { locale } = i18n;

const cryptoInfos = computed(() => findCryptoListItemById(props.crypto.id));
const cryptoValue = computed(
  () => (cryptoInfos.value?.price as number) * props.crypto.amount
);
</script>

<template>
  <v-card class="pa-6">
    <v-row>
      <v-col class="d-flex">
        <v-card-title class="align-center d-flex ml-n4">
          <v-avatar :image="props.crypto.image" :size="25" class="mr-2" />
          {{ props.crypto.name }}
        </v-card-title>
        <v-spacer />
        <v-btn
          icon="mdi-list-box-outline"
          :to="`/cryptos/transactions/${props.crypto.id}`"
        />
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>
          <v-list>
            <remove-crypto :crypto-id="props.crypto.id">{{
              $t("pages.cryptos.index.crypto-card.menu.remove")
            }}</remove-crypto>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-sheet class="pa-6">
          <v-row dense>
            <v-col cols="12" class="d-flex flex-column">
              <sub class="text-h6">{{
                localeNumber(props.crypto.amount, locale)
              }}</sub>
              <span class="text-h5">{{ currency(cryptoValue, locale) }}</span>
              <div class="card-sparkline">
                <sparkline :data="cryptoInfos?.sparklineData" />
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="4">
        <percent-indicator
          :value="(cryptoInfos?.percentageIn1h as number)"
          tooltip="1h"
        />
      </v-col>
      <v-col cols="4">
        <percent-indicator
          :value="(cryptoInfos?.percentageIn24h as number)"
          tooltip="24h"
        />
      </v-col>
      <v-col cols="4">
        <percent-indicator
          :value="(cryptoInfos?.percentageIn7d as number)"
          tooltip="7d"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <crypto-dialog
          :title="
            $t('pages.cryptos.index.crypto-card.btn-group.deposit.dialog')
          "
          :operator="1"
          :crypto-id="props.crypto.id"
        >
          {{ $t("pages.cryptos.index.crypto-card.btn-group.deposit.title") }}
        </crypto-dialog>
      </v-col>
      <v-col cols="6">
        <crypto-dialog
          :title="
            $t('pages.wallets.index.wallet-card.btn-group.withdraw.dialog')
          "
          :operator="-1"
          variant="tonal"
          :crypto-id="props.crypto.id"
        >
          {{ $t("pages.wallets.index.wallet-card.btn-group.withdraw.title") }}
        </crypto-dialog>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.card-sparkline {
  height: 50px;
  width: 100%;
}
</style>
