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
            <Button label="Connect users" />
          </div>
        </div>
      </div>
      <Card>
        <div class="flex items-center gap-6">
          <h2 class="text-base text-gray-600 font-medium">2 users selected</h2>
          <div class="flex gap-2">
            <Button label="Edit" color="secondary" icon="pencil" small />
            <Button label="Delete" color="secondary" icon="trash" small />
          </div>
        </div>
      </Card>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import Button from "./components/Button.vue";
import Card from "./components/Card.vue";
import Input from "./components/Form/Input.vue";

const searchValue = ref("");
</script>
