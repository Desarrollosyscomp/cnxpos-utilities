<template>
  <div class="auth-background"></div>
  <conexion-pos-logo class="logo" width="85vw" height="85vh" />
  <div class="auth-container">
      <div class="auth-card">
          <beto-message>
              <component v-if="Header" :is="Header" />
          </beto-message>
          
          <theme-mode-icon @click="toggleTheme" class="toggle-theme clickable" width="30px" height="30px" />
              <router-view />
      </div>
  </div>
</template>
<script setup>
import ConexionPosLogo from '../../../../assets/logos/ConexionPosLogo.vue';
import { toggleTheme } from '../../../../utils/theme-transitions';
import ThemeModeIcon from '../../../../assets/general/icons/ThemeModeIcon.vue';
import BetoMessage from './BetoMessage.vue';
import { useRoute } from 'vue-router'
import { computed, defineAsyncComponent } from 'vue-demi'
const route = useRoute()
console.log(route.meta.headerComponent)
const Header = computed(() => {
const loader = route.meta.headerComponent
return loader ? defineAsyncComponent(loader) : null
})
console.log(Header.value)
</script>
<style scoped>
@import "../../../../styles/backgrounds.css";

.auth-container{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo{
  position:fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #e9cfcf;
  [data-theme="dark"] &{
      fill: #5b2b26
  }

}
.auth-card{
  position:relative;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.135);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
}
.toggle-theme{
  position:absolute;
  top:10px;
  right:10px;
  fill: var(--color-contrast)
}
</style>
<!-- test styles errase -->
<style>

</style>