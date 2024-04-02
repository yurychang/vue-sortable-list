<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps<{
    customHandle?: boolean;
  }>();

  const items = defineModel<{ id: any; [key: string]: any }[]>('items', {
    required: true,
  });

  const innerItems = ref(items.value);

  let dragItem: any;

  const onDragStart = (e: DragEvent, item: any) => {
    let shouldAssignItem = !props.customHandle;
    if (props.customHandle) {
      let el: HTMLElement | null = e.target as HTMLElement;

      while (el && el !== e.currentTarget) {
        if ((el as HTMLElement).classList.contains('sortable-list-handle')) {
          shouldAssignItem = true;
        }
        el = el.parentElement;
      }

      e.dataTransfer!.setDragImage(e.currentTarget as HTMLElement, 0, 0);
    }
    if (shouldAssignItem) {
      dragItem = item;
    }
  };

  const onDrop = () => {
    if (!dragItem) return;
    dragItem.drop = true;
  };

  const onDragEnd = () => {
    if (!dragItem) return;
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
    if (!dragItem) return;
    innerItems.value = innerItems.value.filter((i) => i.placeholder !== true);
    innerItems.value.splice(index, 0, { ...dragItem, placeholder: true });
    innerItems.value = innerItems.value.filter(
      (i) => i.id !== dragItem.id || i.placeholder === true
    );
  };

  const container = ref<HTMLElement | null>(null);
</script>

<template>
  <div
    ref="container"
    @drop.prevent="onDrop"
    @dragend="onDragEnd"
    @dragover.prevent
  >
    <div
      v-for="(item, index) in innerItems"
      :key="item.id"
      :draggable="!props.customHandle"
      @dragstart="(e) => !item.placeholder && onDragStart(e, item)"
      @dragenter="() => !item.placeholder && onDragEnter(index)"
      :class="{ placeholder: item.placeholder }"
    >
      <slot name="item" :item="item" :index="index" />
    </div>
  </div>
</template>

<style scoped>
  .placeholder {
    opacity: 0.5;
  }
</style>
