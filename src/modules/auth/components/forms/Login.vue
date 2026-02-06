<template>
  <div class="login-container">
    <input class="form-input" type="text" placeholder="Usuario" />
    <input
      class="form-input"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Contraseña"
    />
    <!-- <svg-icon type="mdi" :path="path"></svg-icon> -->
    <router-link to="/auth/forgot-password" class="text-color">
      Olvidé mi contraseña
    </router-link>
  </div>
  <div class="button-container">
    <button class="form-button">Iniciar Sesión</button>
  </div>
</template>
<script setup>
import { ref } from "vue-demi";
let showPassword = ref(false);
</script>

<style scoped>
@import "../../../../styles/forms.css";
:root {
  --property-logo: 1;
}
.login-container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-input {
  background-color: transparent;
  height: 15px;
  font-size: 15px;
  border-radius: 7px;
  border: 1px solid gray;
  color: var(--color-contrast);
  [data-theme="dark"] & {
    color: white;
    border: 1px solid white;
  }
}
.text-color {
  color: var(--color-contrast);
  text-decoration: none;
  font-size: 13px;
}
.button-container {
  width: 42%;
}
.form-button {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  background-color: var(--color-contrast);
  color: var(--color-primary);
  border-radius: 999px;
  border: 2px solid white;
  cursor: pointer;
  width: 100%;
  font-size: 13px;
  height: 40px;
  [data-theme="light"] & {
    background-color: transparent;
    color: #541811;
    border: 2px solid #541811;
  }
}

@media (min-width: 375px) {
  @media (min-height: 667px) {
    .login-container {
      width: 80%;
      gap: 15px;
    }
  }
}
</style>
