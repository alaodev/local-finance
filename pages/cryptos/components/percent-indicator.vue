<script lang="ts" setup>
type Props = {
  value: number;
  tooltip?: string;
};

const props = defineProps<Props>();

const indicator = computed(() => {
  if (props.value < 0)
    return {
      color: "text-red-darken-1",
      icon: "mdi-menu-down",
    };
  if (props.value > 0)
    return {
      color: "text-green-darken-1",
      icon: "mdi-menu-up",
    };
  return {};
});
const percentualValue = computed(() =>
  Number(Math.abs(props.value)).toFixed(2)
);
</script>

<template>
  <div :class="`${indicator.color} d-flex`">
    <v-icon :icon="indicator.icon" />
    <strong> {{ percentualValue }}% </strong>
    <v-tooltip v-if="props.tooltip" activator="parent" location="top">
      {{ props.tooltip }}
    </v-tooltip>
  </div>
</template>
