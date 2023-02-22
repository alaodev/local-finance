<script lang="ts" setup>
type Props = {
  sortItem: Array<{ icon: string; callback: Function }>;
};

const props = defineProps<Props>();

const currentItemIndex = ref(0);

const currentItem = computed(() => {
  if (props.sortItem && props.sortItem.length)
    return props?.sortItem[currentItemIndex.value];
});

function handleCurrentItemChange() {
  if (currentItemIndex.value === props.sortItem.length - 1)
    currentItemIndex.value = -1;
  currentItemIndex.value++;
  props.sortItem[currentItemIndex.value].callback();
}
</script>

<template>
  <v-btn
    @click="handleCurrentItemChange"
    :active="false"
    :icon="currentItem?.icon"
  ></v-btn>
</template>
