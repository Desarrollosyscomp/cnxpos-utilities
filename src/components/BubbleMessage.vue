<template>
    <div :class="[
      'bubble',
      orientation,
    ]"
    :style="{
      '--border': props.border,
      '--border-color': props.borderColor,
      '--background': props.background,
      '--triangle-size': `${props.triangleSize}`,
      '--triangle-y': `${props.triangleY}`,
      '--triangle-x': `${props.triangleX}`,
      'min-width': `${props.minWidth}`,
    }"
    >
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue-demi';

const props = defineProps({
    left: {
        type: Boolean,
        required: false
    },
    right: {
        type: Boolean,
        required: false
    },
    top: {
        type: Boolean,
        required: false
    },
    bottom: {
        type: Boolean,
        required: false
    },
    border: {
        type: String,
        default: '3px'
    },
    borderColor: {
        type: String,
        default: 'var(--color-primary-dark-2)'
    },

    background: {
        type: String,
        default: 'yellow'
    },
    triangleSize: {
        type: String,
        default: '1'
    },
    triangleY: {
        type: String,
        default: '40px'
    },
    triangleX: {
        type: String,
        default: '40px'
    },
    minWidth: {
        type: String,
        default: null
    },
})

let orientation = ref('')

const setArrowDirection = () => {
  if(props.left){
    orientation.value = 'bubble-left'
    return
  }
  
  if(props.right){
    orientation.value = 'bubble-right'
    return
  }
  
  if(props.top){
    orientation.value = 'bubble-up'
    return
  }
  
  if(props.bottom){
    orientation.value = 'bubble-down'
  }
}

onMounted(() => {
    setArrowDirection()
})
</script>
<style scoped>
@import "../utils/css/dialog-bubble.css";
</style>