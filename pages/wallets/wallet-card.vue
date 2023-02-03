<script lang="ts" setup>
import { currency } from "~~/utils/formatters";

const { locale } = useI18n();

type Props = {
  title: string;
  reserved: string | number;
  goal?: string | number;
};

const props = withDefaults(defineProps<Props>(), {});

const goalPercentage = computed(() => {
  if (props.goal)
    return (
      (parseFloat(props.reserved as string) * 100) /
      parseFloat(props.goal as string)
    );

  return 0;
});
</script>

<template>
  <v-card class="pa-6">
    <v-row>
      <v-col class="d-flex">
        <v-card-title class="ml-n4">
          {{ props.title }}
        </v-card-title>
        <v-spacer />
        <v-btn icon="mdi-cog-outline" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet class="pa-6" color="pink">
          <v-row>
            <v-col cols="8" class="justify-center d-flex flex-column">
              <span>Dinheiro reservado</span>
              <span class="text-h5">{{
                currency(props.reserved, locale)
              }}</span>
            </v-col>
            <v-col cols="4" class="align-center d-flex justify-center">
              <v-progress-circular
                v-if="props.goal"
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
      <v-col v-if="props.goal">
        <span>Meta a alcançar: </span>
        <strong>{{ currency(props.goal, locale) }}</strong>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-btn size="x-small" block>Reservar dinheiro</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn size="x-small" block>Retirar dinheiro</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
