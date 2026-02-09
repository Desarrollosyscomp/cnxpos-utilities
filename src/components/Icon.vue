<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path :d="path" />
  </svg>
</template>

<script setup>
defineProps({
  path: String,
  size: {
    type: [Number, String],
    default: 24
  }
})
</script>
