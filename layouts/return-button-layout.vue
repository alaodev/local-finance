<script lang="ts" setup>
type Props = {
  returnTo?: string;
};

const props = withDefaults(defineProps<Props>(), {
  returnTo: "/",
});
</script>

<template>
  <v-row>
    <v-col>
      <v-btn :to="props.returnTo" icon="mdi-arrow-left" />
    </v-col>
  </v-row>
  <slot />
</template>
