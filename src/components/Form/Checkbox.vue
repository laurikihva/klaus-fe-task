<template>
  <label :class="labelClasses">
    <span class="relative block w-[16px] h-[16px]">
      <input :id v-model="model" class="sr-only peer" :name :checked="model" type="checkbox" :disabled />
      <span :class="checkboxClasses" />
      <span v-if="!indeterminate" :class="checkmarkClasses">
        <Icon name="check" size="small" />
      </span>
      <span v-else :class="indeterminateClasses" />
    </span>
    <slot />
  </label>
</template>

<script lang="ts" setup>
import { toRefs, computed } from "vue";

import Icon from "../Icon.vue";

export interface ICheckboxProps {
  id: string;
  name?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

const props = defineProps<ICheckboxProps>();
const { indeterminate, disabled } = toRefs(props);

const model = defineModel<boolean>({ required: true });

const labelClasses = computed(() => {
  const base = "flex items-center gap-2";
  const isDisabled = disabled.value ? "cursor-not-allowed opacity-50" : "cursor-pointer";

  return [base, isDisabled];
});
const checkboxClasses = computed(() => {
  const base = `
    block
    w-full
    h-full
    rounded-[3px]
    border
    border-gray-200
    peer-focus:shadow-primary
  `;
  const checkedClasses = indeterminate.value
    ? "bg-blue-400 border-blue-400"
    : "peer-checked:bg-blue-400 peer-checked:border-blue-400";

  return [base, checkedClasses];
});

const sharedIconClasses = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

const checkmarkClasses = computed(() => {
  const base = "text-white";
  return [base, sharedIconClasses];
});
const indeterminateClasses = computed(() => {
  const base = "bg-white rounded-full w-[9px] h-[2px]";
  return [base, sharedIconClasses];
});
</script>
