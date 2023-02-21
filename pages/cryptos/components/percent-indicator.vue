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
</script>

<template>
  <div :class="`${indicator.color} d-flex`">
    <v-icon :icon="indicator.icon" />
    <strong> {{ Math.abs(props.value) }}% </strong>
    <v-tooltip v-if="props.tooltip" activator="parent" location="top">
      {{ props.tooltip }}
    </v-tooltip>
  </div>
</template>
