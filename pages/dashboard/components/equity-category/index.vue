<script lang="ts" setup>
import EquityCategoryItem from "./equity-category-item.vue";

type Props = {
  items: Array<{ color: string; icon: string; title: string; value: number }>;
};

const props = defineProps<Props>();
</script>

<template>
  <v-card
    :title="$t('pages.dashboard.equity-category-card.title')"
    :subtitle="$t('pages.dashboard.equity-category-card.subtitle')"
    class="pa-6"
  >
    <v-sheet class="pa-6">
      <v-row>
        <v-col v-for="category of props.items" cols="6" sm="4">
          <equity-category-item :item="category" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-card>
</template>
