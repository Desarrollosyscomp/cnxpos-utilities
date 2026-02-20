<template>
  <div class="overlay" v-if="open_modal" @click="closeModal">
    <div class="modal">
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
  background: rgba(0, 0, 0, 0.623);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
    
  background: white;
  border-radius: 12px;
  color: var(--color-contrast);
  padding-top: 10px;
}
</style>
