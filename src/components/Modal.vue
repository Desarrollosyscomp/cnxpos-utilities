<template>
  <div class="overlay" v-if="openModal">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.623);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  width: 80%;
  height: 50%;
  background: white;
  border-radius: 12px;
  color: var(--color-contrast);
  padding-top: 10px;
}
</style>
