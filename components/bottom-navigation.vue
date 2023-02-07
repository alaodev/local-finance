<script lang="ts" setup>
const navigationStore = useNavigation();

const { items } = storeToRefs(navigationStore);
</script>

<template>
  <v-bottom-navigation elevation="0" :absolute="false" grow>
    <v-btn v-for="item of items" :to="item.props.to">
      <v-icon :icon="item.props.prependIcon" :value="item.value" />
    </v-btn>
  </v-bottom-navigation>
</template>
