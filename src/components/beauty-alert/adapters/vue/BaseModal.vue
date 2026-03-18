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
  
  function close(reason?: any) {
    if (isClosing.value) return;
    isClosing.value = true;
    visible.value = false;
    setTimeout(() => {
      props.onClose(reason);
    }, 200);
  }
  
  function handleOverlayClick() {
    close(null);
  }
  
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      close(null);
    }
  }
  </script>