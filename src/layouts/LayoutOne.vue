<template>
    <div class="container">
        <header class="layout-header">
            <div class="title">{{title}}</div>
            <div class="actions">
                <button @click="openMenu">button de menu</button>
            </div>
        </header>
        <main class="layout-main">
            <slot></slot>
        </main>
        <LeftMenu v-if="showMenu" @close-menu="closeMenu">
            
                <div class="">Menu</div>
                <div class="" @click="toggleTheme">light | dark</div>
            
        </LeftMenu>
    </div>
</template>
<script setup>
import { ref } from 'vue-demi';
import LeftMenu from '../components/LeftMenu.vue';

const showMenu = ref(false) 
const title = ref('')

const toggleTheme = () => {


const html = document.documentElement
const theme = html.getAttribute('data-theme')

html.setAttribute(
    'data-theme',
    theme === 'dark' ? 'light' : 'dark'
)

}
const closeMenu = () => {
    showMenu.value = false
}
const openMenu = () => {
    showMenu.value = true
}
</script>
<style scoped>

.container{
    display:flex;
    flex-direction: column;
    height: 100vh;
    color: var(--color-contrast);
}

.layout-header{
    background-color: var(--color-primary-dark-2);
    padding: 1rem;
    display:flex;
    justify-content: space-between;
}

.layout-main{
    flex: 1;
    background: linear-gradient(-30deg, var(--color-primary-dark), var(--color-primary));
    padding: 1rem;
}

</style>