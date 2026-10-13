<template>
    <Transition name="ba-vue-overlay-fade">
      <div
        v-show="visible"
        class="ba-vue-overlay"
        @click="handleOverlayClick"
      >
        <Transition name="ba-vue-modal-scale">
          <div
            v-show="visible"
            class="ba-vue-modal"
            ref="modalRef"
            @click.stop
          >
            <slot :close="close" />
          </div>
        </Transition>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
// ==================== BEAUTY-ALERT VUE: BaseModal ====================
// Modal base de las alertas Vue: overlay, cierre con Escape y clic fuera.
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const props = defineProps<{
    onClose: (reason?: any) => void;
  }>();
  
  const visible = ref(false);
  const isClosing = ref(false);
    
  onMounted(() => {
    visible.value = true;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
  });
  
  onBeforeUnmount(() => {
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKeyDown);
  });
  
  // -------------------- Cierra el modal con un motivo --------------------
  function close(reason?: any) {
    if (isClosing.value) return;
    isClosing.value = true;
    visible.value = false;
    setTimeout(() => {
      props.onClose(reason);
    }, 200);
  }
  
  // -------------------- Cierre al hacer clic en el fondo --------------------
  function handleOverlayClick() {
    close(null);
  }
  
  // -------------------- Cierre con la tecla Escape --------------------
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      close(null);
    }
  }
  </script>