<template>
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


.button-container {
  
  width: 100%;
  text-align: center;
}

</style>
