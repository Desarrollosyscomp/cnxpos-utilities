<template>
  <div class="card-content">
    <slot></slot>
  </div>
</template>

<script setup>
import Card from "./Card.vue";
</script>

<style scoped>
.card-content {
  padding: 18px;
}
</style>
