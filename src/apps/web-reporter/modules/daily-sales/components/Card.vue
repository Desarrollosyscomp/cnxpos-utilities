<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
:global(:root) {
  --proportions:1;
}
.card {
  background-color: var(--color-contrast);
  border-radius: calc(10px * var(--proportions));
  border: calc(1px * var(--proportions)) solid var(--color-contrast);
  /* box-shadow: calc(8px * var(--proportions)) calc(8px * var(--proportions)) calc(20px * var(--proportions)) 0px var(--color-contrast); */
}
</style>
