<script lang="ts" setup>
type Props = {
  equityValue: number;
};

const props = defineProps<Props>();
</script>

<template>
  <v-card
    class="pa-6"
    title="Patrimônio total"
    subtitle="Somatório de todas as categorias"
  >
    <v-sheet class="pa-6">
      <span class="text-h3 text-primary">
        {{ Number(props.equityValue).toFixed(2) }}
      </span>
    </v-sheet>
  </v-card>
</template>

<style lang="scss" scoped></style>
