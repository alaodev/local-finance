<script lang="ts" setup>
import { currency } from "~~/utils/formatters";

import { CryptoTableItemType } from "~~/types/cryptos";

import Sparkline from "./sparkline.vue";
import PercentIndicator from "./percent-indicator.vue";

type Props = {
  cryptos: Array<CryptoTableItemType>;
};

const props = defineProps<Props>();

const { height } = useWindowSize();
const { locale } = useI18n();

const tableHeight = computed(() => height.value - 540);
</script>

<template>
  <v-table :height="tableHeight">
    <thead>
      <tr>
        <th class="text-center" width="40px" />
        <th class="text-left" width="150px">
          {{ $t("pages.cryptos.list.crypto-list-card.list.name") }}
        </th>
        <th class="text-center" width="55px">1h %</th>
        <th class="text-center" width="55px">24h %</th>
        <th class="text-center" width="55px">7d %</th>
        <th class="text-right" width="100px">
          {{ $t("pages.cryptos.list.crypto-list-card.list.price") }}
        </th>
        <th class="text-center">
          {{ $t("pages.cryptos.list.crypto-list-card.list.last-7d") }}
        </th>
        <th class="text-center" width="55px" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.cryptos" :key="item.id">
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
        <td>
          <percent-indicator :value="item.percentageIn1h" />
        </td>
        <td>
          <percent-indicator :value="item.percentageIn24h" />
        </td>
        <td>
          <percent-indicator :value="item.percentageIn7d" />
        </td>
        <td class="text-right">
          {{ currency(item.price, locale) }}
        </td>
        <td align="center">
          <div :style="'height: 80px; width: 120px'">
            <sparkline :data="item.sparklineData" />
          </div>
        </td>
        <td>
          <menu-button
            :items="[
              {
                icon: 'mdi-plus',
                title: $t(
                  'pages.cryptos.list.crypto-list-card.list.menu.add-crypto'
                ),
                to: `/cryptos/create/${item.id}`,
              },
            ]"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
