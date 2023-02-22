<script lang="ts" setup>
type Props = {
  loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>

<template>
  <div v-if="props.loading" class="list-layout-loading">
    <v-progress-circular color="primary" size="90" width="12" indeterminate />
  </div>
  <div class="list-layout" v-else>
    <div class="list-layout__filter">
      <slot name="list-filter" />
    </div>
    <div class="list-layout__content">
      <slot name="list-content" />
    </div>
    <div class="list-layout__paginator">
      <slot name="list-paginator" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-layout-loading {
  align-items: center;
  display: flex;
  height: calc(100vh - 64px);
  justify-content: center;
}

.list-layout {
  @media (min-width: 960px) {
    display: grid;
    grid-template-rows: 60px 1fr 60px;
    height: calc(100vh - 100px);

    .list-layout__filter {
      align-items: center;
      display: flex;
    }

    .list-layout__content {
      overflow-y: auto;
      overflow-x: hidden;
    }

    .list-layout__paginator {
      align-items: center;
      display: flex;
    }
  }
}
</style>
