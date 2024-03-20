<template>
  <div class="flex gap-3 items-center">
    <div class="w-[32px] h-[32px] rounded-full overflow-hidden text-xs">
      <img :src="image" :alt="name" />
    </div>
    <div class="flex flex-col gap-0.5 text-sm">
      <span class="font-medium">{{ name }}</span>
      <span class="text-gray-700">{{ email }}</span>
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
