<script lang="ts" setup>
import { currencyNumber } from "~~/utils/formatters";
import { StockType } from "~~/types/stocks";

import StockDialog from "./stock-dialog.vue";
import RemoveStock from "./remove-stock.vue";

type Props = {
  stock: StockType;
};

const props = defineProps<Props>();

const currencyStore = useCurrency();
const stocksStore = useStocks();
const i18n = useI18n();

const { currency } = storeToRefs(currencyStore);

const { findStockTableItemById } = stocksStore;
const { locale } = i18n;

const stockInfos = computed(() => findStockTableItemById(props.stock.id));
const stockValue = computed(
  () => (stockInfos.value?.price as number) * props.stock.amount
);
</script>

<template>
  <v-card class="pa-6">
    <v-row>
      <v-col class="d-flex">
        <v-card-title class="align-center d-flex ml-n4">
          <v-avatar :image="props.stock.image" :size="25" class="mr-2" />
          {{ props.stock.name }}
        </v-card-title>
        <v-spacer />
        <v-btn
          icon="mdi-list-box-outline"
          :to="`/stocks/transactions/${props.stock.id}`"
        />
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
          </template>
          <v-list>
            <remove-stock :stock-id="props.stock.id">{{
              $t("pages.stocks.index.stock-card.menu.remove")
            }}</remove-stock>
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
                localeNumber(props.stock.amount, locale)
              }}</sub>
              <span class="text-h5">{{
                currencyNumber(stockValue, currency)
              }}</span>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <stock-dialog
          :title="$t('pages.stocks.index.stock-card.btn-group.deposit.dialog')"
          :operator="1"
          :stock-id="props.stock.id"
        >
          {{ $t("pages.stocks.index.stock-card.btn-group.deposit.title") }}
        </stock-dialog>
      </v-col>
      <v-col cols="6">
        <stock-dialog
          :title="$t('pages.stocks.index.stock-card.btn-group.withdraw.dialog')"
          :operator="-1"
          variant="tonal"
          :stock-id="props.stock.id"
        >
          {{ $t("pages.stocks.index.stock-card.btn-group.withdraw.title") }}
        </stock-dialog>
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
