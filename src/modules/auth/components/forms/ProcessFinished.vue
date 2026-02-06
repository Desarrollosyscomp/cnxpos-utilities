<template>
  <div class="button-container">
    <button class="form-button">Iniciar sesión</button>
  </div>
</template>
<script setup>
import { ref } from "vue-demi";
let showPassword = ref(false);
</script>

<style scoped>
@import "../../../../styles/forms.css";

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
}

.text-title {
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  color: var(--color-contrast);
}

.text-medium {
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  color: var(--color-contrast);
}

.text-color {
  color: var(--color-contrast);
  text-decoration: none;
  font-size: 13px;
  text-align: center;
  width: 70%;
}

.button-container {
 
 margin-top: 20px;
  width: 40%;
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
.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  text-align: center;
}

@media (min-width: 375px) {
  @media (min-height: 812px) {
    .login-container {
      width: 80%;
      gap: 15px;
    }
  }
}
</style>
