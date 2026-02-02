<template>
    <div class="login-container">
        <input class="form-input" type="text" placeholder="Usuario">
        <input class="form-input" :type="showPassword ? 'text' : 'password'" placeholder="Contraseña">
        <!-- <svg-icon type="mdi" :path="path"></svg-icon> -->
        <a href="#" class="text-color">Olvidé mi contraseña</a>
    </div>
    <div class="button-container">
        <button class="form-button">Iniciar Sesión</button>
    </div>
    

</template>
<script setup>
import { ref } from 'vue-demi';
let showPassword = ref(false);

</script>

<style scoped>
@import '../../../../styles/forms.css';
.login-container{
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-input{
    background-color: transparent;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid var(--color-contrast);
    color: var(--color-contrast);
}
.text-color{
    color: var(--color-contrast);
    text-decoration: none;
    font-size: 16px;
}
.button-container{
    width: 50%;
}
.form-button{
    background-color: var(--color-contrast);
    color: var(--color-primary);
    border-radius: 10px;
    border: none;
    margin-top: 20px;
    padding: 10px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
}
</style>