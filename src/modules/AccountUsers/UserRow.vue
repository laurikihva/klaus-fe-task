<template>
  <div :class="computedClasses">
    <div class="flex items-center basis-3/5">
      <Checkbox :id="`${user.id}-check`" v-model="user.checked" :name="`${user.name} check`">
        <Avatar :name="user.name" :email="user.email" :image="user.avatar" />
      </Checkbox>
    </div>
    <div class="flex items-center justify-between gap-2 basis-2/5 flex-wrap">
      <div class="shrink-0">
        <Tag :label="handleTag(user.role).label" :color="handleTag(user.role).color" />
      </div>
      <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
        <Button label="Edit" color="secondary" icon="pencil" small @click="console.log('Edit: ', user)" />
        <Button color="secondary" icon="trash" small @click="console.log('Delete: ', user)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, toRefs, computed, watch } from "vue";

import { IUser, TUserRole } from "@/interfaces/user";

import Avatar from "@/components/Avatar.vue";
import Button from "@/components/Button.vue";
import Checkbox from "@/components/Form/Checkbox.vue";
import Tag, { TTagColor } from "@/components/Tag.vue";

interface IUserTagItem {
  label: string;
  color: TTagColor;
}

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    required: true,
  },
});
const { user } = toRefs(props);
const emit = defineEmits<{
  check: [user: IUser];
}>();

const computedClasses = computed(() => {
  const base =
    "flex flex-col sm:flex-row justify-between gap-2 pl-3 pr-5 py-2 min-h-[64px] w-full rounded-md border-l-4 hover:bg-gray-300 group";
  const activeClasses = user.value.checked ? "bg-gray-300 border-blue-400" : "border-white hover:border-gray-300";
  return [base, activeClasses];
});

const handleTag = (role: TUserRole) => {
  return {
    ADMIN: { label: "Admin", color: "purple" },
    AGENT: { label: "Agent", color: "blue" },
    ACCOUNT_MANAGER: { label: "Account manager", color: "pink" },
    EXTERNAL_REVIEWER: { label: "External reviewer", color: "yellow" },
  }[role] as IUserTagItem;
};

watch(
  user,
  () => {
    emit("check", user.value);
  },
  { deep: true },
);
</script>
