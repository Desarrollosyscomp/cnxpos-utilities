<template>
    <div @click="closeMenu" class="background"></div>
    <div class="left-menu">
        <slot></slot>
    </div>

</template>
<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['close-menu'])
const closeMenu = () => {
    emit('close-menu')
}
</script>
<style scoped>
.background{
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.344);
}
.left-menu{
    position: fixed;
    width: 20%;
    height: 100vh;
    background: linear-gradient(to bottom, var(--color-primary), var(--color-primary-dark));
}
</style>