<template>
  <svg
    :width="size "
    :height="size"
    viewBox="0 0 37.417732 37.417732"
    xmlns="http://www.w3.org/2000/svg"
    :class="class"
  >
    <defs />
    <g transform="translate(-7527.5596,-620.29541)">
      <path
        d="m 7564.0855,620.29528 -9.7843,1.19671 1.7635,2.33936 -10.3202,7.77747 -9.0435,-7.81081 -6.7655,6.15011 -1.4841,1.34603 2.6961,2.96538 1.4821,-1.34802 4.1394,-3.76206 8.8042,7.60746 12.9028,-9.72618 1.7647,2.34071 z m -35.308,16.89898 v 20.51902 h 9.7195 v -20.51902 z m 24.0298,2.70004 v 17.81898 h 9.7195 V 639.8943 Z m -12.015,3.24006 v 14.57892 h 9.7196 v -14.57892 z"
      />
    </g>
  </svg>
</template>
<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 24,
  },

  fill: {
    type: String,
    default: "red",
  },
  class: {
    type: String,
    default: "",
  },
});
</script>
