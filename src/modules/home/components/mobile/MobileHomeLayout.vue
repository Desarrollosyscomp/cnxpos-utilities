<template>
  <div class="auth-background">
    <div class="beto-message-container">
      <img class="beto-avatar" src="../../../../assets/avatars/beto.svg" />
      <div class="bubble bubble-a bubble-left">
        <span>¡Hola Fernando!</span>
        <span>¿Qué quieres hacer hoy?</span>
      </div>
    </div>

    <div class="items-container">
      <div class="item">
        <Icon :path="mdiFileChart" size="35px"/>
        <span>Web Reporter</span>
      </div>
      <div class="item">
        <Icon :path="mdiCurrencyUsd" size="35px"/>
        <span>Resumen de ventas</span>
      </div>
    </div>
  </div>
  <left-menu :is-open="menuOpen">
    <div class="menu-container">
      <img class="beto-avatar-menu" src="../../../../assets/avatars/beto.svg" />
      <button class="form-button">Cuenta 
        <Icon :path="mdiPencil" size="15px" color="black"/>
      </button>
    </div>
    
  </left-menu>
  <theme-mode-icon
    @click="toggleTheme"
    class="toggle-theme clickable"
    width="25px"
    height="25px"
  />
  <Icon
    :path="mdiDotsVertical"
    class="clickable menu-icon"
    width="25px"
    height="25px"
    @click="toggleMenu"
  />
  <!-- <div class="auth-container">
    <router-view />
  </div> -->
</template>
<script setup>
import {
  mdiFileChart,
  mdiChartBar,
  mdiCurrencyUsd,
  mdiWhiteBalanceSunny,
  mdiMoonWaningCrescent,
  mdiDotsVertical,
  mdiPencil,
} from "@mdi/js";
import ConexionPosLogo from "../../../../assets/logos/ConexionPosLogo.vue";
import { toggleTheme, visible } from "../../../../utils/theme-transitions";
import ThemeModeIcon from "../../../../assets/general/icons/ThemeModeIcon.vue";
import BetoMessage from "../../../auth/components/beto-messages/LoginBetoMessage.vue";
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue-demi";
import ConexionPosColorLogo from "../../../../assets/logos/ConexionPosColorLogo.vue";
import LeftMenu from "../../../../components/LeftMenu.vue";
import Icon from "../../../../components/Icon.vue";
const route = useRoute();
console.log(route.meta.headerComponent);
const Header = computed(() => {
  const loader = route.meta.headerComponent;
  return loader ? defineAsyncComponent(loader) : null;
});
console.log(Header.value);
let menuOpen = ref(false);
const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
}
</script>
<style scoped>
@import "../../../../utils/css/dialog-bubble.css";
@import "../../../../styles/backgrounds.css";
/* .auth-container {
  position: fixed;
  top: 70px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */
.beto-avatar-menu {
  width: 30vw;
  height: 30vh;
  position: relative;
  left: 25%;
}

.menu-container{
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-content: center;
}

.beto-avatar {
  width: 30vw;
  height: 30vh;
}

.items-container {
  display: flex;
  justify-content: space-evenly;
}

.item {
  color: var(--color-contrast);
  cursor: pointer;
  position: relative;
  top: -20px;
  width: 30%;
  height: 80px;
  border-radius: 10px;
  border: 1px solid var(--color-contrast);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  font-style: normal;
  font-weight: 600;
  padding: 5px;
  transition: all 0.3s ease;
}

.item:hover {
  background-color: #c5c2c2ce;
  [data-theme="dark"] & {
    background-color: #ebebeb1e;
  }
}

.icon {
  margin: 5px;
  width: 40px;
  height: 40px;
  color: var(--color-contrast);
}

.toggle-theme {
  position: absolute;
  top: 10px;
  right: 50px;
  fill: var(--color-contrast);
}
.menu-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--color-contrast);
}

/* @media (min-width: 375px) {
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
} */
.beto-message-container {
  position: relative;
  top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 38px;
}
.bubble-a.bubble {
  --border: 1px;
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: 1;
  --triangle-y: 30px;

  color: var(--color-contrast);
  font-size: 12px;

  line-height: 18px;
  text-align: center;
}
.bubble > :nth-child(1) {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.auth-background {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-button {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  background-color: transparent;
  color: white;
  border-radius: 999px;
  border: 2px solid white;
  cursor: pointer;
  width: 70%;
  font-size: 13px;
  height: 40px;
  [data-theme="light"] & {
    background-color: transparent;
    color: #541811;
    border: 2px solid #541811;
  }
}
</style>
<!-- test styles errase -->
<style></style>
