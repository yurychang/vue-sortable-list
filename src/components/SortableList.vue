<script setup lang="ts">
  import { ref } from 'vue';

  const items = defineModel<{ id: any; [key: string]: any }[]>('items', {
    required: true,
  });

  const innerItems = ref(items.value);

  let dragItem: any;

  const onDragStart = (item: any) => {
    dragItem = item;
  };

  const onDrop = () => {
    dragItem.drop = true;
  };

  const onDragEnd = (event: DragEvent) => {
    console.log('Drag end event', event);
    if (dragItem && dragItem.drop) {
      console.log('item moved');
      innerItems.value = innerItems.value.map(({ placeholder, ...item }) => ({
        ...item,
      }));
      items.value = innerItems.value;
    } else {
      console.log('item not moved');
      innerItems.value = items.value;
    }
    dragItem = null;
  };

  const onDragEnter = (index: number) => {
    innerItems.value = innerItems.value.filter((i) => i.placeholder !== true);
    innerItems.value.splice(index, 0, { ...dragItem, placeholder: true });
    innerItems.value = innerItems.value.filter(
      (i) => i.id !== dragItem.id || i.placeholder === true
    );
  };
</script>

<template>
  <div @drop.prevent="onDrop" @dragend="onDragEnd" @dragover.prevent>
    <div
      v-for="(item, index) in innerItems"
      :key="item.id"
      draggable="true"
      @dragstart="() => !item.placeholder && onDragStart(item)"
      @dragenter="() => !item.placeholder && onDragEnter(index)"
    >
      <slot name="item" :item="item" :index="index" />
    </div>
  </div>
</template>

<style scoped></style>
