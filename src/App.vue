<template>
  <SplashScreen v-if="appStore.showSplashScreen" />
  <LoadingScreen v-if="appStore.showLoadingScreen" />

  <div class="background-app"></div>
  <router-view />
</template>
<script setup lang="ts">
import LoadingScreen from "./components/LoadingScreen.vue";
import SplashScreen from "./components/SplashScreen.vue";
import { useAppStore } from "./store/app.store";
const appStore = useAppStore();
</script>
<style scoped>
.background-app {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: var(--bg);
}
</style>
