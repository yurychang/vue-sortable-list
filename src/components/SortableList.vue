<script setup lang="ts">
  import { ref } from 'vue';

  let dragItem: any;

  const items = ref<
    {
      id: number;
      name: string;
      index: number;
      placeholder?: boolean;
    }[]
  >(
    new Array(10)
      .fill(0)
      .map((_, i) => ({ id: i, name: `Item ${i}`, index: i }))
  );

  const onDragStart = (item: any) => {
    dragItem = item;
  };

  const onDrop = (event: DragEvent) => {
    console.log('Drop event', event);
    dragItem.drop = true;
  };

  const onDragEnd = (event: DragEvent) => {
    console.log('Drag end event', event);
    if (dragItem && dragItem.drop) {
      console.log('item moved');
    } else {
      console.log('item not moved');
    }
    dragItem = null;
  };

  const onDragEnter = (item: any) => {
    console.log(`Drag enter from ${dragItem.index} to ${item.index}`);
    items.value = items.value.filter((i) => i.placeholder !== true);
    items.value.splice(item.index, 0, { ...dragItem, placeholder: true });
    items.value = items.value.filter(
      (i) => i.id !== dragItem.id || i.placeholder === true
    );
  };
</script>

<template>
  <ul
    class="sortable-list"
    @drop.prevent="onDrop"
    @dragend="onDragEnd"
    @dragover.prevent
  >
    <li
      v-for="item in items"
      :key="item.id"
      :class="{
        'sortable-placeholder': item.placeholder,
      }"
      draggable="true"
      @dragstart="() => !item.placeholder && onDragStart(item)"
      @dragenter="() => !item.placeholder && onDragEnter(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<style scoped>
  .sortable-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 350px;
  }

  .sortable-list li {
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: move;
  }

  .sortable-placeholder {
    border-color: red;
    opacity: 0.5;
  }
</style>
