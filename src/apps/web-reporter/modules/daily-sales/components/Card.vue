<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  height: 40vh;
  background-color: var(--color-contrast);
  border-radius: 10px;
  border: 1px solid var(--color-contrast);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
}
</style>
