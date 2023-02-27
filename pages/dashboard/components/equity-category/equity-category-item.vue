<script lang="ts" setup>
type Props = {
  item: {
    color: string;
    icon: string;
    title: string;
    value: number;
  };
};

const props = defineProps<Props>();

const currencyStore = useCurrency();

const { currency } = storeToRefs(currencyStore);
</script>

<template>
  <div class="equity-category-item">
    <div class="equity-category-item__icon" :class="`bg-${props.item.color}`">
      <v-icon :icon="props.item.icon" />
    </div>
    <div class="equity-category-item__infos">
      <sub>{{ props.item.title }}</sub>
      <strong>{{ currencyNumber(props.item.value, currency) }}</strong>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.equity-category-item {
  align-items: center;
  display: flex;
  gap: 1rem;
  .equity-category-item__icon {
    align-items: center;
    background-color: #c4c4c4;
    border-radius: 4px;
    display: flex;
    height: 50px;
    justify-content: center;
    width: 50px;
  }

  .equity-category-item__infos {
    align-items: start;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>
