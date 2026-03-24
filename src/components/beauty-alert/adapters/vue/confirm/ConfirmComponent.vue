<template>
  <BaseModal :onClose="onCancel">
    <template #default="{ close }">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>

      <button @click="() => close(true)">Aceptar</button>
      <button @click="() => close(false)">Cancelar</button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "../BaseModal.vue";

const props = defineProps<{
  title: string;
  message: string;
  onResolve: (value: boolean) => void;
}>();

function onCancel() {
  props.onResolve(false);
}
</script>