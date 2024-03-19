<template>
  <main class="flex justify-center m-8 mt-10">
    <div class="max-w-[716px] w-full">
      <div class="flex items-center mb-5">
        <h1 class="text-lg font-medium">Account users</h1>
        <div class="flex gap-2 flex-grow justify-end">
          <div class="max-w-[205px] w-full">
            <Input id="search-input" v-model="searchValue" icon="search" placeholder="Search" type="text" />
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
          <div class="flex justify-between text-xs">
            <div class="basis-3/5">
              <Checkbox id="all-select-check" v-model="selectAll" :type="allChecked ? 'checkmark' : 'indeterminate'">
                User
              </Checkbox>
            </div>
            <div class="basis-2/5">Permission</div>
          </div>
        </div>
        <ul class="flex flex-col gap-1">
          <li v-for="user in dummyData" :key="user.id">
            <UserRow :user="user" />
          </li>
        </ul>
      </Card>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";

import { IUser } from "./interfaces/user";

import Button from "./components/Button.vue";
import Card from "./components/Card.vue";
import Checkbox from "./components/Form/Checkbox.vue";
import Input from "./components/Form/Input.vue";

import UserRow from "./modules/AccountUsers/UserRow.vue";

const searchValue = ref("");

const dummyData = ref<IUser[]>([
  {
    checked: false,
    id: 10001,
    name: "Geraldine Daniel",
    email: "Estelle_Crona@example.org",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "ADMIN",
  },
  {
    checked: false,
    id: 10002,
    name: "Hugh Graham",
    email: "Roxanne30@example.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "AGENT",
  },
  {
    checked: false,
    id: 10003,
    name: "Johnathan Feeney",
    email: "Junius35@example.org",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    role: "ACCOUNT_MANAGER",
  },
  {
    checked: false,
    id: 10004,
    name: "Johanna Stamm",
    email: "Murl_Lemke1@example.org",
    avatar: "https://randomuser.me/api/portraits/men/97.jpg",
    role: "ACCOUNT_MANAGER",
  },
  {
    checked: false,
    id: 10005,
    name: "Paul Christiansen",
    email: "Rowena.Greenholt@example.net",
    avatar: "https://uifaces.co/our-content/donated/gPZwCbdS.jpg",
    role: "EXTERNAL_REVIEWER",
  },
]);

const selectAll = ref(false);
const allChecked = computed(() => dummyData.value.every(({ checked }) => checked));
const someChecked = computed(() => dummyData.value.some(({ checked }) => checked));
const handleSelectAll = () => {
  if (someChecked.value && !allChecked.value) return dummyData.value.forEach((user) => (user.checked = true));
  dummyData.value.forEach((user) => (user.checked = !user.checked));
};
watch(selectAll, handleSelectAll);

const selectedUsers = ref<IUser[]>([]);
watch(
  dummyData,
  () => {
    selectedUsers.value = dummyData.value.filter(({ checked }) => checked);
  },
  { deep: true },
);
</script>
