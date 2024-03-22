<template>
  <div class="flex flex-col sm:flex-row sm:items-center mb-5 gap-x-2 gap-y-4">
    <h1 class="text-lg font-medium">Account users</h1>
    <div class="flex gap-2 flex-grow sm:justify-end">
      <div class="max-w-[205px] w-full">
        <Input
          id="search-input"
          v-model="searchValue"
          icon="search"
          placeholder="Search by name"
          type="text"
          title="Search"
          name="search"
          :disabled="loadingUsers || !!loadUsersError.length"
        />
      </div>
      <div class="shrink-0">
        <Button label="Connect users" @click="console.log('Connect users')" />
      </div>
    </div>
  </div>
  <Card>
    <div class="pl-4 pr-5 mb-1">
      <div class="flex items-center flex-wrap gap-x-6 gap-y-4 mb-4">
        <h2 class="text-base text-gray-600 font-medium">
          {{ selectedUsers.length }} {{ numberLabel(selectedUsers.length, "user") }} selected
        </h2>
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
            :disabled="loadingUsers || !listUsers.length || !!loadUsersError.length"
            @input="handleSelectAll"
          >
            User
          </Checkbox>
        </div>
        <div class="basis-2/5">
          <button
            class="flex items-center gap-1 disabled:opacity-70 disabled:cursor-not-allowed"
            type="button"
            :disabled="loadingUsers || !listUsers.length || !!loadUsersError.length"
            @click="handleSortDir"
          >
            Permission
            <span :class="computedSortIconClasses">
              <Icon name="arrowUp" size="medium" />
            </span>
          </button>
        </div>
      </div>
    </div>
    <AccountUsersLoader v-if="loadingUsers" />
    <h3 v-else-if="loadUsersError" :class="infoMessageBaseClasses" class="text-red-600">
      {{ loadUsersError }}
    </h3>
    <template v-else-if="users.length">
      <ul class="flex flex-col gap-1">
        <li v-for="user in listUsers" :key="user.id">
          <UserRow :user="user" @check="handleCheckedUser" />
        </li>
      </ul>
      <h3 v-if="showNoResultsMsg" :class="infoMessageBaseClasses" class="text-gray-600">
        No results found for {{ searchValue }}
      </h3>
      <div class="flex justify-center mt-5">
        <VueAwesomePaginate
          v-model="currentPage"
          :total-items="paginationTotalItems"
          :items-per-page="perPage"
          :hide-prev-next="true"
        />
      </div>
    </template>
    <div v-else>
      <h3 :class="infoMessageBaseClasses" class="text-gray-600">
        You don't have any users. Go add first users to get started!
      </h3>
      <div class="flex justify-center mt-5">
        <Button label="Add users" @click="console.log('Add users')" />
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";

import { IUser } from "@/interfaces/user";

import useUser from "@/composables/useUser";

import UserRow from "@/modules/AccountUsers/UserRow.vue";

import AccountUsersLoader from "@/contentLoaders/AccountUsersLoader.vue";

import { numberLabel } from "@/utils/typography";

import Button from "@/components/Button.vue";
import Card from "@/components/Card.vue";
import Checkbox from "@/components/Form/Checkbox.vue";
import Icon from "@/components/Icon.vue";
import Input from "@/components/Form/Input.vue";

type TSortDir = "asc" | "desc";

const { loadingUsers, users, loadUsersError, loadUsers } = useUser();

const listUsers = computed(() => filteredUsers.value.slice(paginationFrom.value, paginationTo.value));
const filteredUsers = ref<IUser[]>([]);

const infoMessageBaseClasses = "text-base font-medium flex justify-center mt-5";

// Pagination
const currentPage = ref(1);
const perPage = ref(10);
const paginationFrom = ref(0);
const paginationTo = ref(perPage.value);
const paginationTotalItems = computed(() =>
  searchValue.value.length ? filteredUsers.value.length : users.value.length,
);
const handlePagination = () => {
  paginationFrom.value = currentPage.value === 1 ? 0 : currentPage.value * perPage.value - perPage.value;
  paginationTo.value = paginationFrom.value + perPage.value;
  clearAllCheckedUsers();
};
watch(currentPage, handlePagination);

// Checkbox related functionality
const selectedUsers = ref<IUser[]>([]);
const selectAll = ref(false);
const allChecked = computed(() => !!listUsers.value.length && listUsers.value.every(({ checked }) => checked));
const someChecked = computed(() => !!listUsers.value.length && listUsers.value.some(({ checked }) => checked));
const handleSelectAll = () => {
  if (someChecked.value && !allChecked.value) return listUsers.value.forEach((user) => (user.checked = true));
  listUsers.value.forEach((user) => (user.checked = !user.checked));
};
const handleCheckedUser = (user: IUser) => {
  if (user.checked && !selectedUsers.value.includes(user)) return selectedUsers.value.push(user);
  const index = selectedUsers.value.indexOf(user);
  if (index >= 0 && !user.checked) selectedUsers.value.splice(index, 1);
};
const clearAllCheckedUsers = () => {
  listUsers.value.forEach((user) => {
    if (!user.checked) return;
    user.checked = false;
  });
  selectedUsers.value = [];
};
watch(allChecked, () => {
  selectAll.value = allChecked.value;
});

// Filtering
const searchValue = ref("");
const showNoResultsMsg = computed(() => searchValue.value.length && !filteredUsers.value.length);
const handleFilters = () => {
  filteredUsers.value = users.value;

  clearAllCheckedUsers();

  // Search
  filteredUsers.value = searchValue.value.length
    ? users.value.filter(({ name }) => name.toLowerCase().includes(searchValue.value.toLowerCase()))
    : users.value;

  currentPage.value = 1;
};
watch(searchValue, handleFilters);

// Sorting
const sortDir = ref<TSortDir>();
const handleSortDir = () => {
  if (!sortDir.value) return (sortDir.value = "asc");
  sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
};
const computedSortIconClasses = computed(() => {
  const inactiveClass = !sortDir.value ? "opacity-50" : "";
  const rotateClass = !sortDir.value || sortDir.value === "asc" ? "rotate-180" : "";
  return [inactiveClass, rotateClass];
});
const handleSorting = () => {
  if (!sortDir.value) return;
  filteredUsers.value = users.value.sort((a, b) =>
    sortDir.value === "asc" ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role),
  );
  handleFilters();
};
watch(sortDir, handleSorting);

onMounted(async () => {
  await loadUsers();
  handleFilters();
});
</script>

<style>
.pagination-container {
  @apply flex gap-1.5;
}
.paginate-buttons {
  @apply w-[30px] h-[30px] rounded cursor-pointer bg-white border border-gray-400 hover:bg-gray-400 text-gray-500 font-medium text-xs focus:shadow-primary focus:outline-none;
}

.active-page {
  @apply bg-gray-400 hover:bg-gray-200;
}
</style>
