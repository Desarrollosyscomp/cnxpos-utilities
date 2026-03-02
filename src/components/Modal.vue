<template>
  <div class="overlay" v-if="open_modal" @click="closeModal"></div>
  <div class="modal" v-if="open_modal" :style="{ width, minHeight, display: 'flex' }">
    <div style="flex: 1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue-demi';
const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },  
  width: {
    type: String,
    default: '90vw',
  },
  minHeight: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(['closeModal']);

let open_modal = ref(false);

watch(() => props.openModal, (newVal) => {
  open_modal.value = newVal;
});

function closeModal() {
  open_modal.value = false;
  emit('closeModal');
}

</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.799);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-primary-dark);
  border-radius: 12px;
  color: var(--color-contrast);
  padding: 10px;
  z-index: 11;
  border: 1px solid var(--color-contrast);
}
</style>
