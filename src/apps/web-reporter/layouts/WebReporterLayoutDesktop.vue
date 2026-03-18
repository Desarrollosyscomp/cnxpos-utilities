<template>
  <left-menu :is-open="menuOpen" @close-menu="toggleMenu">
    <div class="menu-container">
      <img class="beto-avatar-menu" :src="BetoAvatar" />
      <div class="menu-buttons">
        <button class="form-button-2" @click="router.push('/account/profile')">
          Cuenta
          <Icon :path="mdiPencil" :class="'pencil-icon'" />
        </button>
        <button class="form-button-2" @click="logout">
          Salir
          <Icon :path="mdiExitToApp" :class="'pencil-icon'" />
        </button>
      </div>
      <hr class="menu-hr" />
      <div class="menu-items">
        <div class="menu-item" @click="router.push('/home/welcome')">
          <Icon :path="mdiHome" :class="'icon'" />
          <span>Inicio</span>
        </div>
        <div class="menu-item" @click="router.push('/web-report-v2/dashboard')">
          <WebReporterIcon :class="'web-report-icon'" />
          <span>Web Reporter</span>
        </div>
        <div class="menu-item" @click="router.push('/inventory/report-inventory')">
          <Icon :path="mdiCurrencyUsd" :class="'icon'" />
          <span>Inventario</span>
        </div>
      </div>
    </div>
  </left-menu>
  <div class="app-container">
    <div class="app-header">
      <Icon
        :path="mdiWhiteBalanceSunny"
        class="menu-icon clickable"
        @click="toggleTheme"
      />
      <Icon
        :path="mdiDotsVertical"
        class="menu-icon clickable"
        @click="toggleMenu"
      />
    </div>
    <div class="app-content scrollable-y">
      <router-view />
      <WebReporterRightMenu></WebReporterRightMenu>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  mdiWhiteBalanceSunny,
  mdiDotsVertical,
  mdiPencil,
  mdiHome,
  mdiExitToApp,
  mdiCurrencyUsd,
} from "@mdi/js";
import { toggleTheme } from "../../../utils/theme-transitions";
import { useRoute, useRouter } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue-demi";
import LeftMenu from "../../../components/LeftMenu.vue";
import Icon from "../../../components/Icon.vue";
import WebReporterIcon from "../../../assets/general/icons/WebReporterIcon.vue";
import WebReporterRightMenu from "../components/WebReporterRightMenu.vue";
import BetoAvatar from "../../../assets/avatars/beto.svg";
import { useAuthStore } from "../../../modules/auth/store/auth.store";
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
console.log(route.meta.headerComponent);
const Header = computed(() => {
  const loader = route.meta.headerComponent;
  return loader ? defineAsyncComponent(loader as any) : null;
});
console.log(Header.value);
let menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const logout = () => {
  authStore.auth = {
    isLogged: false,
    token: "",
  };
  router.push("/auth/login");
};
</script>
<style scoped>
@import "../../../utils/css/dialog-bubble.css";
@import "../../../styles/backgrounds.css";
@import "../../../styles/forms.css";

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
  position: relative;
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
  position: relative;
  flex: 1;
}

.toggle-theme {
  width: 40px;
  fill: var(--color-contrast);
}

.menu-icon {
  width: 25px;
  fill: var(--color-contrast);
}
.icon {
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
.menu-buttons {
  display: flex;
  gap: 10px;
}
@media (min-width: 2560px) {
  .app-header {
    padding: 25px 35px 25px 35px;
    gap: 30px;
  }
  .menu-icon {
    width: 50px;
  }
}
</style>
<!-- test styles errase -->
<style></style>
