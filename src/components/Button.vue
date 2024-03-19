<template>
  <button :class="computedClasses" type="button" :disabled="disabled">
    <span class="flex items-center gap-2">
      <Icon v-if="icon" :name="icon" />
      {{ label }}
    </span>
  </button>
</template>

<script lang="ts" setup>
import { toRefs, computed } from "vue";

import Icon, { TIconName } from "./Icon.vue";

export type TButtonColor = "primary" | "secondary";
export interface IButtonProps {
  label?: string;
  color?: TButtonColor;
  icon?: TIconName;
  small?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IButtonProps>(), {
  color: "primary",
});
const { color, small, disabled } = toRefs(props);

const buttonColor = computed(() => {
  return {
    primary: "text-white bg-blue-400 enabled:hover:bg-blue-500",
    secondary: "text-gray-500 bg-white border border-gray-400 enabled:hover:bg-gray-400",
  }[color.value];
});

const computedClasses = computed(() => {
  const base = "rounded text-sm tracking-wider font-medium";
  const isSmall = small.value ? "py-1 px-2 min-h-[32px]" : "py-2 px-3 min-h-[40px]";
  const isDisabled = disabled.value ? "cursor-not-allowed opacity-85" : "";
  return [base, buttonColor.value, isSmall, isDisabled];
});
</script>
