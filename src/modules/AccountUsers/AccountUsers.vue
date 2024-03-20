<template>
  <div class="flex items-center mb-5">
    <h1 class="text-lg font-medium">Account users</h1>
    <div class="flex gap-2 flex-grow justify-end">
      <div class="max-w-[205px] w-full">
        <Input
          id="search-input"
          v-model="searchValue"
          icon="search"
          placeholder="Search by name"
          type="text"
          title="Search"
          name="search"
        />
      </div>
      <div class="shrink-0">
        <Button label="Connect users" :disabled="!selectedUsers.length" />
      </div>
    </div>
  </div>
  <Card>
    <div class="pl-4 pr-5 mb-1">
      <div class="flex items-center gap-6 mb-4">
        <h2 class="text-base text-gray-600 font-medium">{{ selectedUsers.length }} users selected</h2>
        <div class="flex gap-2">
          <Button
            label="Edit"
            color="secondary"
            icon="pencil"
            small
            :disabled="!selectedUsers.length"
            @click="console.log('Bulk edit: ', selectedUsers)"
          />
          <Button
            label="Delete"
            color="secondary"
            icon="trash"
            small
            :disabled="!selectedUsers.length"
            @click="console.log('Bulk delete: ', selectedUsers)"
          />
        </div>
      </div>
      <div class="flex justify-between text-xs text-gray-700">
        <div class="basis-3/5">
          <Checkbox
            id="all-select-check"
            v-model="selectAll"
            :indeterminate="someChecked && !allChecked"
            @input="handleSelectAll"
          >
            User
          </Checkbox>
        </div>
        <div class="basis-2/5">Permission</div>
      </div>
    </div>
    <ul class="flex flex-col gap-1">
      <li v-for="user in filteredUsers" :key="user.id">
        <UserRow :user="user" @check="handleCheckedUser" />
      </li>
    </ul>
  </Card>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";

import { IUser } from "../../interfaces/user";

import useUser from "../../composables/useUser";

import Button from "../../components/Button.vue";
import Card from "../../components/Card.vue";
import Checkbox from "../../components/Form/Checkbox.vue";
import Input from "../../components/Form/Input.vue";

import UserRow from "./UserRow.vue";

const searchValue = ref("");

const { users, loadUsers } = useUser();

const filteredUsers = ref<IUser[]>([]);

const selectAll = ref(false);
const allChecked = computed(() => filteredUsers.value.every(({ checked }) => checked));
const someChecked = computed(() => filteredUsers.value.some(({ checked }) => checked));

const handleSelectAll = () => {
  if (someChecked.value && !allChecked.value) return filteredUsers.value.forEach((user) => (user.checked = true));
  users.value.forEach((user) => (user.checked = !user.checked));
};
watch(allChecked, () => {
  selectAll.value = allChecked.value;
});

const selectedUsers = ref<IUser[]>([]);
const handleCheckedUser = (user: IUser) => {
  if (user.checked && !selectedUsers.value.includes(user)) return selectedUsers.value.push(user);
  const index = selectedUsers.value.indexOf(user);
  if (index >= 0 && !user.checked) selectedUsers.value.splice(index, 1);
};

onMounted(async () => {
  await loadUsers();
  filteredUsers.value = users.value.slice(0, 10);
});
</script>
