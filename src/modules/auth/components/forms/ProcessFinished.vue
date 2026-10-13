<template>
  <div class="button-container">
    <button class="form-button">Iniciar sesión</button>
  </div>
</template>
<script setup>
// ==================== PANTALLA: Proceso terminado ====================
// Último paso de la recuperación de contraseña; sin llamadas a la API.
import { ref } from "vue";
let showPassword = ref(false);
</script>

<style scoped>
@import "../../../../styles/forms.css";


.button-container {
 
  text-align: center;
  width: 100%;
}


</style>
