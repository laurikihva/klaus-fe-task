<template>
  <component :is="name" :class="iconSizeClasses" />
</template>

<script lang="ts" setup>
import { toRefs, computed } from "vue";

export type TIconName = "check" | "pencil" | "search" | "trash" | "arrowUp";
export type TIconSize = "default" | "small" | "medium";
export interface IIconProps {
  name: TIconName;
  size?: TIconSize;
}

const props = withDefaults(defineProps<IIconProps>(), {
  size: "default",
});
const { size } = toRefs(props);

const iconSizeClasses = computed(() => {
  return {
    small: "w-[10px] h-[10px]",
    medium: "w-[12px] h-[12px]",
    default: "w-[14px] h-[14px]",
  }[size.value];
});
</script>

<script lang="ts">
import { defineComponent } from "vue";

import arrowUp from "./icons/arrow-up.svg";
import check from "./icons/check.svg";
import pencil from "./icons/pencil.svg";
import search from "./icons/search.svg";
import trash from "./icons/trash.svg";

export default defineComponent({
  components: {
    arrowUp,
    check,
    pencil,
    search,
    trash,
  },
});
</script>
