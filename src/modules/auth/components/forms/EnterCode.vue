<template>
  <div class="login-container">
      <input class="form-input" type="text" placeholder="Código" />

    <!-- <svg-icon type="mdi" :path="path"></svg-icon> -->
    <div class="links-container">
      <router-link to="/auth/login" class="text-color">Iniciar sesión</router-link>
    </div>
  </div>
  <div class="button-container">
    <button class="form-button">Continuar</button>
  </div>
</template>
<script setup>
import { ref } from "vue-demi";
let showPassword = ref(false);
</script>

<style scoped>
@import "../../../../styles/forms.css";

.login-container {
  padding: 40px;
  position: relative;
  transform: translateY(-3%);
  display: flex;
  flex-direction: column;
  gap: 10px;
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

.text-title{
  font-size: 13px;
  font-style: normal;
  color: var(--color-contrast);
  font-weight: 600;
}
.button-container {
  width: 50%;
}
.form-button {
  position: relative;
  top: -25px;
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
.text-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;
  font-size: 13px;
}
.links-container {
  display: flex;
  justify-content: space-between;
}

@media (min-width: 375px) {
  @media (min-height: 812px) {
    .login-container {
      width: 80%;
      gap: 15px;
    }
  }
}

@media (min-width: 1029px) {
  @media (min-height: 893px) {
    .button-container {
      width: 40%;
    }
  }
}
</style>
