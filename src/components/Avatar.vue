<template>
  <div class="flex gap-3 items-center overflow-hidden">
    <div class="w-[32px] h-[32px] rounded-full overflow-hidden text-xs shrink-0">
      <img :src="image" :alt="name" />
    </div>
    <div class="flex flex-col gap-0.5 text-sm overflow-hidden">
      <span class="font-medium text-ellipsis text-nowrap overflow-hidden">{{ name }}</span>
      <span class="text-gray-700 text-ellipsis overflow-hidden">{{ email }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface IAvatarProps {
  image: string;
  name: string;
  email: string;
}
defineProps<IAvatarProps>();
</script>
