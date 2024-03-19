<template>
  <component :is="name" class="w-[14px] h-[14px]" />
</template>

<script lang="ts" setup>
export type TIconName = "pencil" | "search" | "trash";
export type TIconSize = "default" | "small";
export interface IIconProps {
  name: TIconName;
  size?: TIconSize;
}

defineProps<IIconProps>();
</script>

<script lang="ts">
import { defineComponent } from "vue";

import pencil from "./icons/pencil.svg";
import search from "./icons/search.svg";
import trash from "./icons/trash.svg";

export default defineComponent({
  components: {
    pencil,
    search,
    trash,
  },
});
</script>
