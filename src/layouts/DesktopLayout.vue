<template>
  <left-menu :is-open="menuOpen" @close-menu="toggleMenu">
    <div class="menu-container">
      <img class="beto-avatar-menu" src="../assets/avatars/beto.svg" />
      <button class="form-button-2">
        Cuenta
        <Icon :path="mdiPencil" size="15px" :class="'icon'" />
      </button>
      <hr class="menu-hr" />
      <div class="menu-items">
        <div class="menu-item">
          <Icon :path="mdiHome" size="0px" :class="'icon'" />
          <span>Inicio</span>
        </div>
        <div class="menu-item">
          <WebReporterIcon size="18px" :class="'icon'" />
          <span>Web Reporter</span>
        </div>
      </div>
    </div>
  </left-menu>
  <div class="app-container">
    <div class="app-header">
      <Icon :path="mdiWhiteBalanceSunny" class="menu-icon clickable" @click="toggleTheme" />
      <Icon :path="mdiDotsVertical" class="menu-icon clickable" @click="toggleMenu" />
    </div>
    <div class="app-content">
      <router-view />
    </div>
  </div>
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
  mdiHome
} from "@mdi/js";
import ConexionPosLogo from "../assets/logos/ConexionPosLogo.vue";
import { toggleTheme, visible } from "../utils/theme-transitions";
import ThemeModeIcon from "../assets/general/icons/ThemeModeIcon.vue";
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue-demi";
import ConexionPosColorLogo from "../assets/logos/ConexionPosColorLogo.vue";
import LeftMenu from "../components/LeftMenu.vue";
import Icon from "../components/Icon.vue";
import WebReporterIcon from "../assets/general/icons/WebReporterIcon.vue";
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
};
</script>
<style scoped>
@import "../utils/css/dialog-bubble.css";
@import "../styles/backgrounds.css";
@import "../styles/forms.css";

.menu-hr {
  width: 70%;
  margin: 0 auto;
}

.beto-avatar-menu {
  width: 30vw;
  height: 30vh;
}

.menu-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.menu-item {
  display: flex;
  gap: 5px;
  padding: 5px;
  cursor: pointer;
  width: 100%;
  color: var(--color-contrast);
  border-radius: 5px;
}

.menu-item:hover {
  color: white;
  background-color: var(--color-cnx-orange);
  transition: all 0.4s ease;
  width: 105%;
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 10px;
  top: 20%;
}

.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 18px 25px 18px 25px;
  display: flex;
  justify-content: right;
  gap: 20px;
  background: var(--color-primary-dark);
}

.app-content {
  flex: 1;
}

.toggle-theme {
  width: 40px;
  fill: var(--color-contrast);
}

.menu-icon {
  width: 40px;
  fill: var(--color-contrast);
}
@media (min-width: 2560px){

  .app-header{
    padding: 50px 30px 50px 30px;
    gap: 50px;
  }
  .menu-icon{
    width: 70px;
  }

}
</style>
<!-- test styles errase -->
<style></style>
