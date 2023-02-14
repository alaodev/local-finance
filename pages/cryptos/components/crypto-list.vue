<script lang="ts" setup>
import { currency } from "~~/utils/formatters";

import Sparkline from "./sparkline.vue";
import PercentIndicator from "./percent-indicator.vue";

type Props = {
  cryptos: any;
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
        <th class="text-left">
          {{ $t("pages.cryptos.list.crypto-list-card.list.name") }}
        </th>
        <th class="text-center" width="55px">1h %</th>
        <th class="text-center" width="55px">24h %</th>
        <th class="text-center" width="55px">7d %</th>
        <th class="text-right">
          {{ $t("pages.cryptos.list.crypto-list-card.list.value") }}
        </th>
        <th class="text-center">Últimos 7 dias</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.cryptos" :key="item.name">
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
          <div :style="'height: 80px; width: 150px'">
            <sparkline :data="item.sparklineData" />
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
