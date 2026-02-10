<template>
  <div class="auth-background">
    <div class="beto-message-container">
      <img class="beto-avatar" src="../../../../assets/avatars/beto.svg" />
      <div class="bubble bubble-a bubble-left">
        <span>¡Hola Fernando!</span>
        <span>¿Qué quieres hacer hoy?</span>
      </div>
    </div>

    <div class="items-container">
      <div class="item">
        <Icon :path="mdiFileChart" size="35px" />
        <span>Web Reporter</span>
      </div>
      <div class="item">
        <Icon :path="mdiCurrencyUsd" size="35px" />
        <span>Resumen de ventas</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  mdiFileChart,
  mdiChartBar,
  mdiCurrencyUsd,
} from "@mdi/js";
import Icon from "../../../../components/Icon.vue";
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue-demi";
const route = useRoute();
console.log(route.meta.headerComponent);
</script>
<style scoped>
@import "../../../../utils/css/dialog-bubble.css";
@import "../../../../styles/backgrounds.css";

.beto-avatar {
  width: 30vw;
  height: 30vh;
}

.items-container {
  display: flex;
  justify-content: space-evenly;
}

.item {
  color: var(--color-contrast);
  cursor: pointer;
  position: relative;
  top: -20px;
  width: 30%;
  height: 80px;
  border-radius: 10px;
  border: 1px solid var(--color-contrast);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  font-style: normal;
  font-weight: 600;
  padding: 5px;
  transition: all 0.3s ease;
}

.item:hover {
  background-color: #c5c2c2ce;
  [data-theme="dark"] & {
    background-color: #ebebeb1e;
  }
}

.beto-message-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 38px;
}
.bubble-a.bubble {
  --border: 1px;
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: 1;
  --triangle-y: 30px;

  color: var(--color-contrast);
  font-size: 12px;

  line-height: 18px;
  text-align: center;
}
.bubble > :nth-child(1) {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
<!-- test styles errase -->
<style></style>
