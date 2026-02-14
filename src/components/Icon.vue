<template>
  <svg
    viewBox="0 0 24 24"
    :class="class"
  >
    <path :d="path" />
  </svg>
</template>

<script setup>
defineProps({
  path: String,
  size: {
    type: [Number, String],
    default: "24px"
  },
  class: {
    type: String,
    default: ""
  }
})
</script>
