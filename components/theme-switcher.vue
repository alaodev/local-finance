<script lang="ts" setup>
const store = useTheme();

const { theme } = storeToRefs(store);
const { switchTheme } = store;

const themeStateIcon = computed(() =>
  theme.value === "light" ? "mdi-weather-night" : "mdi-weather-sunny"
);
</script>

<template>
  <v-btn :icon="themeStateIcon" @click="switchTheme" />
</template>
