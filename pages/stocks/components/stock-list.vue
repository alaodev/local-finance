<script lang="ts" setup>
import { currencyNumber } from "~~/utils/formatters";

import { StockTableItemType } from "~~/types/stocks";

type Props = {
  stocks: Array<StockTableItemType>;
};

const props = defineProps<Props>();

const currencyStore = useCurrency();

const { currency } = storeToRefs(currencyStore);
const { height } = useWindowSize();

const tableHeight = computed(() => height.value - 540);
</script>

<template>
  <v-table :height="tableHeight">
    <thead>
      <tr>
        <th class="text-center" width="40px" />
        <th class="text-left">
          {{ $t("pages.stocks.list.stock-list-card.list.name") }}
        </th>
        <th class="text-right" width="100px">
          {{ $t("pages.stocks.list.stock-list-card.list.price") }}
        </th>
        <th class="text-center" width="55px" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.stocks" :key="item.id">
        <td>
          <v-avatar :image="item.image" size="25" />
        </td>
        <td>
          <div class="d-flex flex-column">
            <strong>
              {{ item.name }}
            </strong>
            <sub>
              {{ String(item.symbol).toUpperCase() }}
            </sub>
          </div>
        </td>
        <td class="text-right">
          {{ currencyNumber(item.price, currency) }}
        </td>
        <td>
          <menu-button
            :items="[
              {
                icon: 'mdi-plus',
                title: $t(
                  'pages.stocks.list.stock-list-card.list.menu.add-stock'
                ),
                to: `/stocks/create/${item.id}`,
              },
            ]"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
