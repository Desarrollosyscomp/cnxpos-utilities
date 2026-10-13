<template>
  <div class="card-content">
    <slot></slot>
  </div>
</template>

<script setup>
// ==================== COMPONENTE: CardContent ====================
// Contenido (valor) de una tarjeta del resumen.
import Card from "./Card.vue";
</script>

<style scoped>
.card-content {
  padding: 18px;
}
</style>
