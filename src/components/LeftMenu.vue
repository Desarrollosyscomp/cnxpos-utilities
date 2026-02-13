<template>
    <transition name="fade">
        <div v-if="isOpen" @click="closeMenu" class="background"></div>
    </transition>
    <transition name="slide">
        <div v-if="isOpen" class="left-menu">
            <slot></slot>
        </div>
    </transition>

</template>
<script setup>
import { defineEmits, watch } from 'vue';
const emit = defineEmits(['close-menu'])
const props = defineProps({
    isOpen:{
        type: Boolean,
        default: false,
    }
})
watch(()=>props.isOpen, ()=>{
    console.log(props.isOpen)
})
const closeMenu = () => {
    emit('close-menu')
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* ===== Menu slide ===== */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.background{
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.344);
}

.left-menu{
    position: fixed;
    left: 0;
    top: 0;
    width: 70%;
    height: 100vh;
    z-index: 3;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-primary-dark));
}

@media (min-width: 768px) {
    .left-menu{
        width: 60%;
    }
}
</style>