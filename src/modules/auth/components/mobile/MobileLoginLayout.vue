<template>
  <div class="auth-background"></div>
  <conexion-pos-logo
    :class="[
      logoStyle ? 'logo-check-email' : 'logo',
      'hide-on-light',
      'hide-on-landscape',
    ]"
  />
  <conexion-pos-color-logo
    :class="[
      logoStyle ? 'logo-check-email' : 'logo',
      'hide-on-dark',
      'hide-on-landscape',
    ]"
  />
  <theme-mode-icon
    @click="toggleTheme"
    class="toggle-theme clickable"
    width="25px"
    height="25px"
  />
  <div class="auth-container">
    <!-- <beto-message>
                  <component v-if="Header" :is="Header" />
              </beto-message> -->

    <router-view />
  </div>
</template>
<script setup>
import ConexionPosLogo from "../../../../assets/logos/ConexionPosLogo.vue";
import { toggleTheme, visible } from "../../../../utils/theme-transitions";
import ThemeModeIcon from "../../../../assets/general/icons/ThemeModeIcon.vue";
import BetoMessage from "../beto-messages/LoginBetoMessage.vue";
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue-demi";
import ConexionPosColorLogo from "../../../../assets/logos/ConexionPosColorLogo.vue";
const route = useRoute();
console.log(route.meta.headerComponent);
const Header = computed(() => {
  const loader = route.meta.headerComponent;
  return loader ? defineAsyncComponent(loader) : null;
});
console.log(Header.value);
const logoStyle = computed(() => {
  if(route.meta.logoStyle && route.name === 'check-email'){
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
.auth-container {
  position: fixed;
  top: 70px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  position: fixed;
  left: 50%;
  transform: translate(-50%, -17%);
  fill: #541811;
  width: 57vw;
  height: 85vh;
  [data-theme="dark"] & {
    fill: var(--color-contrast);
  }
}

.logo-check-email {
  position: fixed;
  left: 50%;
  transform: translate(-50%, -12%);
  fill: #541811;
  width: 65vw;
  height: 85vh;
  [data-theme="dark"] & {
    fill: var(--color-contrast);
  }
}
.auth-card {
  position: relative;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.135);
  border-radius: 1rem;
  top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
}
.toggle-theme {
  position: absolute;
  top: 10px;
  right: 10px;
  fill: var(--color-contrast);
}

@media (min-width: 375px) {
  @media (min-height: 812px) {
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
  }
}
</style>
<!-- test styles errase -->
<style></style>
