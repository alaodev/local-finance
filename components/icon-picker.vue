<script lang="ts" setup>
import { IconPickerType } from "~~/types/icon-picker";

type Props = {
  modelValue?: IconPickerType;
  items: Array<IconPickerType>;
};

const props = defineProps<Props>();

const emits = defineEmits(["update:modelValue"]);

function updateModelValue(value: string) {
  const item = props.items.find((item) => item.icon === value);
  emits("update:modelValue", item);
}
</script>

<template>
  <v-radio-group
    :model-value="props.modelValue?.icon"
    @update:model-value="updateModelValue"
    class="icon-picker"
    inline
  >
    <v-radio
      v-for="item of items"
      :color="item.color"
      :false-icon="item.icon"
      :true-icon="item.icon"
      :value="item.icon"
    ></v-radio>
  </v-radio-group>
</template>

<style lang="scss">
.icon-picker {
  .v-selection-control-group--inline {
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
