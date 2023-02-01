<script lang="ts" setup>
const themeStore = useTheme();

const { theme } = storeToRefs(themeStore);
const { switchTheme } = themeStore;

const themeStateIcon = computed(() =>
  theme.value === "light" ? "mdi-weather-night" : "mdi-weather-sunny"
);
</script>

<template>
  <v-btn :icon="themeStateIcon" @click="switchTheme" />
</template>
