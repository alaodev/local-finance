<script lang="ts" setup>
type Props = {
  modelValue?: number;
  error?: boolean;
};

const props = defineProps<Props>();

const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <input
    v-model="value"
    :class="error && 'error'"
    class="xl-number-input"
    placeholder="0.0"
    type="number"
  />
</template>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.xl-number-input {
  text-align: center;
  font-size: 150px;
  font-weight: bold;
  height: 200px;
  outline: none;
  width: 100%;

  &::placeholder {
    color: #c4c4c4;
  }

  &.error::placeholder {
    color: #c62828;
  }
}
</style>
