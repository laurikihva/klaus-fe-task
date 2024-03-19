<template>
  <div :class="computedClasses">
    <span class="text-xs font-medium">{{ label }}</span>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from "vue";

export type TTagColor = "pink" | "purple" | "blue" | "yellow";
export interface ITagProps {
  color: TTagColor;
  label: string;
}

const props = defineProps<ITagProps>();
const { color } = toRefs(props);

const tagColors = computed(() => {
  return {
    pink: "bg-pink-100 text-pink-200",
    purple: "bg-purple-100 text-purple-200",
    blue: "bg-blue-200 text-blue-300",
    yellow: "bg-yellow-100 text-yellow-200",
  }[color.value];
});

const computedClasses = computed(() => {
  const base = "inline-flex items-center min-h-[24px] rounded px-2 py-0.5";

  return [base, tagColors.value];
});
</script>
