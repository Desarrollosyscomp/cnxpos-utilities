<template>
    <div class="button-container">
      <button class="form-button">Continuar</button>
    </div>
</template>
<script setup>
// ==================== PANTALLA: Revisa tu correo ====================
// Paso informativo de la recuperación de contraseña; sin llamadas a la API.
import { ref } from "vue";
let showPassword = ref(false);
</script>

<style scoped>
@import "../../../../styles/forms.css";


.button-container {
  
  width: 100%;
  text-align: center;
}

</style>
