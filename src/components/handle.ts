export const vHandle = {
  mounted(el: HTMLElement) {
    el.draggable = true;
    el.classList.add('sortable-list-handle');
  },
};
