<template>
    <LayoutOne>
        hola
    </LayoutOne>
    <!-- <p class="text">daily sales main</p>
    <button @click="toggleTheme">change theme</button> -->
</template>
<script setup>
import { ref } from 'vue';
import LayoutOne from '../../../../../layouts/LayoutOne.vue';
const toggleTheme = () => {


    const html = document.documentElement
    const theme = html.getAttribute('data-theme')
    
    html.setAttribute(
        'data-theme',
        theme === 'dark' ? 'light' : 'dark'
    )

}

</script>
<style scoped>

.text {
    color: var(--text);
}
</style>
