<script setup lang="ts">
  import { ref } from 'vue';
  import SortableList from './components/SortableList.vue';

  const items = ref<
    {
      id: number;
      name: string;
      placeholder?: boolean;
    }[]
  >(new Array(10).fill(0).map((_, i) => ({ id: i, name: `Item ${i}` })));
</script>

<template>
  <SortableList v-model:items="items">
    <template #item="{ item }">
      <div class="item">
        <div class="item-name">{{ item.name }}</div>
      </div>
    </template>
  </SortableList>
</template>

<style>
  .item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 5px 0;
  }

  .item-name {
    font-weight: bold;
  }
</style>
