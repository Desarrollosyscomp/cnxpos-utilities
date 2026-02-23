<template>
  <left-menu :is-open="menuOpen" @close-menu="toggleMenu">
    <div class="menu-container">
      <img class="beto-avatar-menu" src="../assets/avatars/beto.svg" />
      <button class="form-button-2">
        Cuenta
        <Icon :path="mdiPencil" :class="'pencil-icon'" />
      </button>
      <hr class="menu-hr" />
      <div class="menu-items">
        <div class="menu-item" @click="router.push('/home/welcome')" >
          <Icon :path="mdiHome" :class="'icon'" />
          <span>Inicio</span>
        </div>
        <div class="menu-item" @click="router.push('/web-report-v2/dashboard')" >
          <WebReporterIcon :class="'web-report-icon'" />
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
    <div class="app-content scrollable-y">
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
import { toggleTheme, visible } from "../utils/theme-transitions";
import ThemeModeIcon from "../assets/general/icons/ThemeModeIcon.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue-demi";
import LeftMenu from "../components/LeftMenu.vue";
import Icon from "../components/Icon.vue";
import WebReporterIcon from "../assets/general/icons/WebReporterIcon.vue";
const route = useRoute();
const router = useRouter();
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
  gap: 3px;
}

.menu-item {
  display: flex;
  gap: 5px;
  padding-left: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
  width: 100%;
  color: var(--color-contrast);
  border-radius: 5px;
  font-size: 28px;
}

.menu-item:hover {
  color: white;
  background-color: var(--color-cnx-orange);
  transition: all 0.4s ease;
  width: 105%;
  .icon {
    fill: white;
  }
  .web-report-icon {
    fill: white;
  }
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
.icon{
  width: 35px;
  height: 35px;
  fill: var(--color-contrast);
}

.pencil-icon {
  --pencil-icon-size: 1;
  fill: var(--color-contrast);
  width: calc(25px * var(--pencil-icon-size));
  height: calc(25px * var(--pencil-icon-size));
}

.web-report-icon {
  --web-report-icon-size: 1;
  fill: var(--color-contrast);
  width: calc(30px * var(--web-report-icon-size));
  height: calc(30px * var(--web-report-icon-size));
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
