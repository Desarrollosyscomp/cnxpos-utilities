<template>
    <div class="auth-background"></div>
    <conexion-pos-logo class="logo hide-on-light" />
    <conexion-pos-color-logo class="logo hide-on-dark" />
    forgot password
    <!-- <theme-mode-icon
      @click="toggleTheme"
      class="toggle-theme clickable"
      width="30px"
      height="30px"
    /> -->
    <div class="auth-container">
        <h3>¿No puedes entrar?</h3>
        <p>Ingresa el email de tu cuenta para proceder con la recuperación de tu contraseña</p>
        <input type="email" placeholder="Email">


        <button>Enviar</button>
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
//   import BetoMessage from "./BetoMessage.vue";
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
  
  </script>
  <style scoped>
  @import "../../../../styles/backgrounds.css";
  
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
    top: calc(50% - 20%);
    left: 50%;
    transform: translate(-50%, -50%);
    fill: #541811;
    width: 85vw;
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
  
  @media (max-width: 375px) {
    .auth-card {
      padding: -0px;
    }
  }
  </style>
  <!-- test styles errase -->
  <style></style>
  