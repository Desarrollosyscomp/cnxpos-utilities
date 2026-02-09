<template>
  <div class="login-container">
    <input class="form-input" type="text" placeholder="Usuario" v-model="authForm.username" />
    <input
      class="form-input"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Contraseña"
      v-model="authForm.password"
    />
    <div class="forgot-password-label-container">
      <router-link to="/auth/forgot-password" class="text-color">
        Olvidé mi contraseña
      </router-link>
    </div>
    <div class="button-container">
      <button class="form-button" @click="onSubmit">Iniciar Sesión</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue-demi";
import { useAuthStore } from "../../store/auth.store";
let showPassword = ref(false);

const authStore = useAuthStore();
const authForm = ref({
    username: "",
    password: "",
})

const onSubmit = async () => {
  let response = await authStore.login(authForm.value); 
  console.log(response)
}
</script>

<style scoped>
@import "../../../../styles/forms.css";
:root {
  --property-logo: 1;
}
/**
 * Container for the login form.
 *
 * This container is a flexbox column with centered items and a gap of 10px.
 * It also has a padding of 15px.
 */
.login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}


.text-color {
  color: var(--color-contrast);
  text-decoration: none;
  font-size: 13px;
}

.button-container {
  padding-top: 15px;
  width: 100%;
  text-align: center;
}

/* 
@media (min-width: 375px) {
  @media (min-height: 667px) {
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
} */
</style>
