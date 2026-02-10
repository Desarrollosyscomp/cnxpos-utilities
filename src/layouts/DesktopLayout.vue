<template>
  <left-menu :is-open="menuOpen">
    <div class="menu-container">
      <img class="beto-avatar-menu" src="../../../../assets/avatars/beto.svg" />
      <button class="form-button">
        Cuenta
        <Icon :path="mdiPencil" size="15px" color="var(--color-contrast)" />
      </button>
      <hr class="menu-hr" />
      <div class="menu-items">
        <div class="menu-item">
          <Icon :path="mdiFileChart" size="25px" />
          <span>Inicio</span>
        </div>
        <div class="menu-item">
          <Icon :path="mdiCurrencyUsd" size="25px" />
          <span>Web Reporter</span>
        </div>
      </div>
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
  <router-view />
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
import ConexionPosLogo from "../assets/logos/ConexionPosLogo.vue";
import { toggleTheme, visible } from "../utils/theme-transitions";
import ThemeModeIcon from "../assets/general/icons/ThemeModeIcon.vue";
import BetoMessage from "../modules/auth/components/beto-messages/LoginBetoMessage.vue";
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue-demi";
import ConexionPosColorLogo from "../assets/logos/ConexionPosColorLogo.vue";
import LeftMenu from "../components/LeftMenu.vue";
import Icon from "../components/Icon.vue";
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
  cursor: pointer;
  width: 100%;
  color: var(--color-contrast);
}

.menu-item:hover {
  background-color: var(--color-cnx-orange);
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 10px;
  top: 20%;
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
</style>
<!-- test styles errase -->
<style></style>
