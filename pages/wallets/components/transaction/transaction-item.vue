<script lang="ts" setup>
import { currencyNumber } from "~~/utils/formatters";
import { timestampToLocaleDateString } from "~~/utils/converters";
import { TransactionType } from "~~/types/transaction";

type Props = {
  item: TransactionType;
};

const props = defineProps<Props>();

const currencyStore = useCurrency();

const { currency } = storeToRefs(currencyStore);
const { locale, t } = useI18n();

const initialValueTitle = computed(() =>
  t("transactions.transaction-item.initial-title")
);
const withdrawValueTitle = computed(() =>
  t("transactions.transaction-item.withdraw-title")
);
const reservedValueTitle = computed(() =>
  t("transactions.transaction-item.reserved-title")
);
const localeDate = computed(() =>
  timestampToLocaleDateString(props.item.createdAt, locale.value)
);

const transactionTypes: any = ref({
  "-1": {
    color: "black",
    icon: "mdi-cash-minus",
    label: withdrawValueTitle,
    symbol: "-",
  },
  "0": {
    color: "grey",
    icon: "mdi-cash-fast",
    label: initialValueTitle,
    symbol: "",
  },
  "1": {
    color: "green",
    icon: "mdi-cash-plus",
    label: reservedValueTitle,
    symbol: "+",
  },
});
</script>

<template>
  <v-list-item
    :key="props.item.uuid"
    :subtitle="localeDate"
    :title="transactionTypes[props.item.type].label"
  >
    <template v-slot:prepend>
      <v-avatar>
        <v-icon :icon="transactionTypes[props.item.type].icon" />
      </v-avatar>
    </template>

    <template v-slot:append>
      <strong :class="`text-${transactionTypes[props.item.type].color}`">{{
        `${transactionTypes[props.item.type].symbol} ${currencyNumber(
          props.item.value,
          currency
        )}`
      }}</strong>
    </template>
  </v-list-item>
</template>
