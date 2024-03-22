<template>
  <div class="flex flex-col gap-2 text-sm">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="relative text-gray-600">
      <div v-if="icon" class="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none">
        <Icon :name="icon" />
      </div>
      <input :id v-model="model" :name :class="computedInputClasses" v-bind="attrs" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, useAttrs } from "vue";

import Icon, { TIconName } from "@/components/Icon.vue";

export interface IInputProps {
  id: string;
  label?: string;
  name?: string;
  icon?: TIconName;
}

const props = defineProps<IInputProps>();
const { icon } = toRefs(props);

defineOptions({
  inheritAttrs: false,
});

const model = defineModel<string | number>({ required: true });

const attrs = useAttrs();

const computedInputClasses = computed(() => {
  const base =
    "w-full min-h-[40px] pr-2 py-2 placeholder:text-gray-100 enabled:focus:outline-blue-400 rounded bg-white disabled:opacity-50 border border-gray-400";
  const withIcon = icon.value ? "pl-8" : "pl-2";

  return [base, withIcon];
});
</script>
