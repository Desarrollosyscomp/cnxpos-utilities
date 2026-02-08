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


.button-container {
 
  text-align: center;
  width: 100%;
}


</style>
