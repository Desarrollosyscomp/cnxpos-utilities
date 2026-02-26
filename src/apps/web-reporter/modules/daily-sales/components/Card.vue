<template>
  <div :class="dark ? 'dark-card' : 'card'">
    <slot></slot>
  </div>
</template>

<script setup>

const props = defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});

</script>

<style scoped>
:global(:root) {
  --proportions:1;
}
.card {
  background-color: var(--color-primary-light);
  border-radius: calc(10px * var(--proportions));
  border: calc(1px * var(--proportions)) solid var(--color-contrast);
  /* box-shadow: calc(8px * var(--proportions)) calc(8px * var(--proportions)) calc(20px * var(--proportions)) 0px var(--color-contrast); */
}

.dark-card {
  background-color: var(--color-contrast);
  border-radius: calc(10px * var(--proportions));
  border: calc(1px * var(--proportions)) solid var(--color-primary);
  /* box-shadow: calc(8px * var(--proportions)) calc(8px * var(--proportions)) calc(20px * var(--proportions)) 0px var(--color-contrast); */
}

</style>
