<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="home-container">
      <div class="beto-message-container">
        <img class="beto-avatar" src="../../../../assets/avatars/beto.svg" />
        <div class="bubble bubble-a bubble-left">
          <span>¡Hola Fernando!</span>
          <span>¿Qué quieres hacer hoy?</span>
        </div>
      </div>

      <div class="items-container">
        <div class="item" @click="router.push('/home/dashboard')">
          <WebReporterIcon :class="'icon'" />
          <span>Web Reporter</span>
        </div>
        <div class="item">
          <Icon :path="mdiCurrencyUsd" :class="'icon'" />
          <span>Resumen de ventas</span>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { mdiFileChart, mdiChartBar, mdiCurrencyUsd } from "@mdi/js";
import Icon from "../../../../components/Icon.vue";
import WebReporterIcon from "../../../../assets/general/icons/WebReporterIcon.vue";
import { useRoute, useRouter } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue";
const route = useRoute();
const router = useRouter();
console.log(route.meta.headerComponent);
</script>
<style scoped>
@import "../../../../utils/css/dialog-bubble.css";
@import "../../../../styles/backgrounds.css";

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

.items-container {
  display: flex;
  justify-content: space-evenly;
}

.home-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.item {
  --item-proportion: 1;
  --font-size-proportion: 1;
  color: var(--color-contrast);
  cursor: pointer;
  width: calc(30% * var(--item-proportion));
  height: calc(80px * var(--item-proportion));
  border-radius: 10px;
  border: 1px solid var(--color-contrast);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: calc(12px * var(--font-size-proportion));
  text-align: center;
  font-style: normal;
  font-weight: 600;
  padding: calc(5px * var(--item-proportion));
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
  gap: 18px;
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
  font-weight: bold;
  font-size: calc(16px * var(--font-size-proportion));
  margin-bottom: 10px;
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
    --item-proportion: 1.2;
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
  .home-background {
    --padding-proportion: 0.8;
  }

  .beto-message-container {
    margin-bottom: 50px;
  }

  .item {
    --font-size-proportion: 1.5;
    height: 15vh;
  }

  .icon {
    --icon-proportion: 2;
    --icon-size: 2;
  }

  .bubble-a.bubble {
    --line-height-proportion: 3;
    --font-size-proportion: 2;
    padding: 28px;
  }

}
</style>