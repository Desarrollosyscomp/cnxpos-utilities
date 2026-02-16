<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="dashboard-container">
      <div class="beto-message-container">
        <img class="beto-avatar" src="../../../../assets/avatars/beto.svg" />
        <div class="bubble bubble-a bubble-left">
          <span>Bienvenido al</span>
          <h3 class="web-reporter-title">Web <br>Reporter</h3>
          <span>Aquí encontraras un resumen de tu negocio</span>
        </div>
      </div>
      <div class="items-dashboard">
        <div class="items-content">
        <div class="item">
          <div class="text">
            <span>Facturado Hoy</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>$25.000.000</span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>Cuentas por pagar</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>$25.000.000</span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>Cuentas por cobrar</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>$25.000.000</span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>Cuentas por cobrar</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>$25.000.000</span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>Cuentas por cobrar</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>$25.000.000</span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>Cuentas por cobrar</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>$25.000.000</span>
          </div>
        </div>
        <div class="item">
          <div class="text">
            <span>Cuentas por cobrar</span>
            <span class="subtitle">Total</span>
          </div>
          <div class="value">
            <span>$25.000.000</span>
          </div>
        </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import { mdiFileChart, mdiChartBar, mdiCurrencyUsd } from "@mdi/js";
import Icon from "../../../../components/Icon.vue";
import WebReporterIcon from "../../../../assets/general/icons/WebReporterIcon.vue";
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue";
const route = useRoute();
</script>
<style scoped>
@import "../../../../utils/css/dialog-bubble.css";
@import "../../../../styles/backgrounds.css";

:global(:root) {
  --item-font-size: 1;
  --item-title-font-size: 1;
  --item-subtitle-font-size: 1;
  --item-value-font-size: 1;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.beto-avatar {
  width: 25vw;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80%;
  gap: 20px;
}

.items-dashboard {
  width: 80%;
  flex:1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  /* 
  gap: 15px; */
}
.items-content {
  margin: auto 0; 
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  padding-bottom: 15px;
  height: 10vh;
  border-radius: 10px;
  border: 1px solid #2f1310;
  background-color: var(--color-primary-light);
  color: var(--color-contrast);
  font-size: calc(13px * var(--item-font-size));
  font-weight: 600;

  [data-theme="dark"] & {
    border-color: transparent;
    color: white;
  }
}

.item:first-child {
  background-color: var(--color-contrast);
  color: var(--color-primary);
}

.text {
  display: flex;
  flex-direction: column;
}

.subtitle {
  font-size: calc(12px * var(--item-subtitle-font-size));
  font-weight: 500;
}

.value {
  display: flex;
  justify-content: end;
  font-size: calc(15px * var(--item-value-font-size));
}

.beto-message-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.web-reporter-title {
  font-size: calc(20px * var(--item-title-font-size));
}

.bubble-a.bubble {
  --line-height-proportion: 1;
  --font-size-proportion: 1;
  --border: 1px;
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: 1;
  --triangle-y: 30px;

  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size-proportion));

  line-height: calc(18px * var(--line-height-proportion));
  text-align: center;
}

.bubble> :nth-child(1) {
  font-weight: light;
  font-size: calc(12px * var(--font-size-proportion));
  margin-bottom: 2px;
}

.icon {
  --icon-proportion: 1;
  --icon-size: 1;
  fill: var(--color-contrast);
  margin-bottom: calc(5px * var(--icon-proportion));
  width: calc(40% * var(--icon-size));
  height: calc(40px * var(--icon-size));
}

@media (min-width: 360px) {
  .home-background {
    --padding-proportion: 1.1;
  }

  .item {
    --item-font-size: 1.3;
  }

  .subtitle {
    --item-subtitle-font-size: 1.3;
  }

  .value {
    --item-value-font-size: 1.3;
  }

  @media (min-height: 800px) {
    .beto-avatar {
      width: 35vw;
    }
  }
}

@media (min-width: 375px) {
  .beto-avatar {
    width: 30vw;
  }
}

@media (min-width: 414px) {
  .beto-avatar {
    width: 35vw;
  }
}

@media (min-width: 768px) {
  .bubble-a.bubble {
    --line-height-proportion: 2;
    --font-size-proportion: 2;
  }

  .item {
    --item-font-size: 2;
    padding: 15px;
  }

  .web-reporter-title {
    --item-title-font-size: 2;
  }

  .subtitle {
    --item-subtitle-font-size: 2;
  }

  .value {
    --item-value-font-size: 2;
  }
}
</style>
