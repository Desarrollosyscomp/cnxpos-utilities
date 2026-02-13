<template>
  <div class="auth-background"></div>
  <theme-mode-icon @click="toggleTheme" class="toggle-theme clickable" width="25px" height="25px" />
  <div class="auth-container">
    <div class="auth-content">
      <div class="logo-container">
        <conexion-pos-logo :class="[
          'logo',
          'hide-on-light',
          'hide-on-landscape',
        ]" />
        <conexion-pos-color-logo :class="[
          'logo',
          'hide-on-dark',
          'hide-on-landscape',
        ]" />
      </div>
      <div class="header-text">
        <component v-if="Header" :is="Header" />
      </div>
      <div class="form-card">
        <router-view />
      </div>
    </div>
  </div>


</template>
<script setup>
import ConexionPosLogo from "../../../../assets/logos/ConexionPosLogo.vue";
import { toggleTheme, visible } from "../../../../utils/theme-transitions";
import ThemeModeIcon from "../../../../assets/general/icons/ThemeModeIcon.vue";
import BetoMessage from "../beto-messages/LoginBetoMessage.vue";
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue";
import ConexionPosColorLogo from "../../../../assets/logos/ConexionPosColorLogo.vue";
const route = useRoute();
console.log(route.meta.headerComponent);
const Header = computed(() => {
  const loader = route.meta.headerComponent;
  return loader ? defineAsyncComponent(loader) : null;
});
console.log(Header.value);
const logoStyle = computed(() => {
  if (route.meta.logoStyle && route.name === 'check-email') {
    return true;
  }
  return false;
});
</script>
<style scoped>
@import "../../../../styles/backgrounds.css";

:root {
  --property-one: 15%;
}

.auth-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;  
  height: 90%;
  gap: 4%;
}

.auth-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  
}

.logo-container{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 160px;
  width: 50vw;
  max-width: 300px;
}
.logo {
  
  fill: #541811;
  width: 100%;
  height: 100%;
  [data-theme="dark"] & {
    fill: var(--color-contrast);
  }
}

.toggle-theme {
  position: fixed;
  top: 10px;
  right: 10px;
  fill: var(--color-contrast);
}

.header-text {
  display: flex;
  flex-direction: column;
  text-align: center;
  color: var(--color-contrast);
}

.header-text > :nth-child(1) {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}
.form-card{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
@media (min-width: 375px) {
  /* @media (min-height: 812px) {
    .logo {
      top: calc(50% - 17%);
      left: 50%;
      transform: translate(-50%, -50%);
      fill: #541811;
      width: 80vw;
      height: 85vh;
      [data-theme="dark"] & {
        fill: var(--color-contrast);
      }
    }

    .auth-container {
      top: 80px;
    }
  } */
}
</style>