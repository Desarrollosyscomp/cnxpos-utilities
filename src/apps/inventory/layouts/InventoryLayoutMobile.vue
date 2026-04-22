<template>
  <left-menu :is-open="menuOpen" @close-menu="menuOpen = false">
    <div class="menu-container">
      <div class="menu-content">
        <img class="beto-avatar-menu" :src="BetoAvatar" />
        <div class="menu-buttons">
          <button class="form-button-2" @click="router.push('/account/profile')">
            Cuenta
            <Icon :path="mdiPencil" class="pencil-icon" />
          </button>
          <button class="form-button-2" @click="logout">
            Salir
            <Icon :path="mdiExitToApp" class="pencil-icon" />
          </button>
        </div>
        <hr class="menu-hr" />
        <div class="menu-items">
          <div class="menu-item" @click="router.push('/home/welcome')">
            <Icon :path="mdiHome" class="icon" />
            <span>Inicio</span>
          </div>
          <div
            class="menu-item"
            @click="router.push('/web-report-v2/dashboard')"
          >
            <WebReporterIcon class="web-report-icon" />
            <span>Web Reporter</span>
          </div>
          <div
            class="menu-item"
            @click="router.push('/inventory/report-inventory')"
          >
            <Icon :path="mdiCurrencyUsd" :class="'icon'" />
            <span>Inventario</span>
          </div>
        </div>
      </div>
    </div>
  </left-menu>
  <theme-mode-icon @click="toggleTheme" class="toggle-theme clickable" />
  <Icon
    :path="mdiDotsVertical"
    class="clickable menu-icon"
    @click="toggleMenu"
  />
  <div class="app-container">
    <div class="app-content">
      <router-view />
    </div>
    <div class="bottom">
      <InventoryBottomMenu />
    </div>
  </div>
</template>
<script setup lang="ts">
import { mdiDotsVertical, mdiPencil, mdiHome, mdiExitToApp, mdiCurrencyUsd } from "@mdi/js";
import { toggleTheme } from "../../../utils/theme-transitions";
import ThemeModeIcon from "../../../assets/general/icons/ThemeModeIcon.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue";
import LeftMenu from "../../../components/LeftMenu.vue";
import Icon from "../../../components/Icon.vue";
import WebReporterIcon from "../../../assets/general/icons/WebReporterIcon.vue";
import BetoAvatar from "../../../assets/avatars/beto.svg";
import { useAuthStore } from "../../../modules/auth/store/auth.store";
import InventoryBottomMenu from "../components/InventoryBottomMenu.vue";
const authStore = useAuthStore();
const route = useRoute();
const Header = computed(() => {
  const loader = route.meta.headerComponent;
  return loader ? defineAsyncComponent(loader as any) : null;
});
console.log(Header.value);
let menuOpen = ref(false);
const router = useRouter();
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
  --hr-margin-top: 1;
  width: 100%;
  margin: 0 auto;
  margin-top: calc(10px * var(--hr-margin-top));
}
.beto-avatar-menu {
  width: 30vw;
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
}
.icon {
  width: 20px;
  height: 20px;
}

.menu-item:hover {
  color: white;
  background-color: var(--color-cnx-orange);
  transition: all 0.25s ease;
  width: 100%;
  .icon {
    fill: white;
  }
  .web-report-icon {
    fill: white;
  }
}

.menu-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu-content {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.toggle-theme {
  --icon-size: 1;
  position: absolute;
  top: 10px;
  right: 45px;
  width: calc(20px * var(--icon-size));
  height: calc(30px * var(--icon-size));
  fill: var(--color-contrast);
}
.menu-icon {
  --icon-size: 1;
  position: absolute;
  top: 10px;
  right: 10px;
  width: calc(20px * var(--icon-size));
  height: calc(30px * var(--icon-size));
  fill: var(--color-contrast);
}

.icon {
  fill: var(--color-contrast);
  transform: translateX(-2px);
}

.pencil-icon {
  --pencil-icon-size: 1;
  fill: var(--color-contrast);
  width: calc(15px * var(--pencil-icon-size));
  height: calc(15px * var(--pencil-icon-size));
}

.web-report-icon {
  --web-report-icon-size: 1;
  fill: var(--color-contrast);
  width: calc(15px * var(--web-report-icon-size));
  height: calc(15px * var(--web-report-icon-size));
}
.icon-logout {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 24px;
  height: 25px;
  fill: var(--color-contrast);
}
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  overflow-y: scroll;
}
.menu-buttons {
  display: flex;
  gap: 10px;
}

@media (min-width: 360px) {
  .menu-item {
    font-size: 20px;
  }
  .toggle-theme {
    --icon-size: 1.2;
  }
  .menu-icon {
    --icon-size: 1.2;
  }
  .web-report-icon {
    --web-report-icon-size: 1.4;
  }
  .icon {
    width: 25px;
    height: 25px;
  }
}

@media (min-width: 375px) {
  @media (min-height: 812px) {
    .pencil-icon {
      --pencil-icon-size: 1.4;
    }
    .icon {
      width: 25px;
      height: 25px;
    }
  }
}

@media (min-width: 768px) {
  .menu-item {
    font-size: 35px;
    width: 100%;
  }
  .menu-item:hover {
    width: 110%;
  }
  .menu-hr {
    --hr-margin-top: 2;
  }
  .toggle-theme {
    --icon-size: 1.5;
    top: 20px;
    right: 70px;
  }
  .menu-icon {
    --icon-size: 1.5;
    top: 20px;
    right: 20px;
  }
  .beto-avatar-menu {
    margin-bottom: 20px;
  }
  .pencil-icon {
    --pencil-icon-size: 1.6;
  }
  .icon {
    width: 48px;
    height: 44px;
  }
  .web-report-icon {
    --web-report-icon-size: 2.4;
  }
}
</style>
