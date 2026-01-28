<template>
  <div class="background-app"></div>
    <router-view />
</template>
<script setup lang="ts"></script>
<style scoped>
.background-app{
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;  
  background-color: var(--bg);
}
</style>