<template>
  <div class="enter-code-container">
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
import { ref } from "vue";
let showPassword = ref(false);
</script>

<style scoped>
@import "../../../../styles/forms.css";

.enter-code-container {
  position: relative;
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
  width: 100%;
  padding-top: 25px;
  text-align: center;
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
    .enter-code-container {
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
