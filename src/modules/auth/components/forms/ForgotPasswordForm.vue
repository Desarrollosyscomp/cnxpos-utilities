<template>
  <div class="forgot-password-container">
    <input class="form-input" type="text" placeholder="Email" />

    <!-- <svg-icon type="mdi" :path="path"></svg-icon> -->
    <div class="links-container">
      <router-link to="/auth/login" class="text-color"
        >Iniciar sesión</router-link
      >
      <router-link to="/auth/enter-code" class="text-color"
        >Ya tengo mi código</router-link
      >
    </div>
  </div>
  <div class="button-container">
    <button class="form-button">Enviar</button>
  </div>
</template>
<script setup>
import { ref } from "vue-demi";
let showPassword = ref(false);
</script>

<style scoped>
@import "../../../../styles/forms.css";

.form-input {
  background-color: transparent;
  height: 15px;
  font-size: 15px;
  margin-bottom: 4px;
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
.text-title {
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  color: var(--color-contrast);
}
.button-container {
  padding-top: 25px;
  width: 100%;
  text-align: center;
}

.text-container {
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

h3 {
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
}

@media (min-width: 1029px) {
  @media (min-height: 893px) {
    .form-input {
      height: 15px;
      width: 92%;
    }
  }
}
</style>
