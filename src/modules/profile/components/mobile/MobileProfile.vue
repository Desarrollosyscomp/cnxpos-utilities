<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="profile-container scrollable-y">
      <div class="beto-message-container">
        <img class="beto-avatar" src="../../../../assets/avatars/beto.svg" />
        <div class="bubble bubble-a bubble-left">
          <span
            >Aquí puedes editar algunos detalles de tu cuenta, como tu correo,
            contraseña y más.</span
          >
        </div>
      </div>

      <div class="form scrollable-y">
        <div class="form-email">
          <span class="text-contrast font-montserrat-bold"
            >Correo electrónico</span
          >
          <input type="text" placeholder="Correo" class="form-input" />
          <!-- <Icon :path="mdiContentSaveOutline" class="icon" /> -->
        </div>
        <div align="left"></div>
        <div class="form-password">
          <span class="text-contrast font-montserrat-bold">Contraseña</span>
          <input
            type="password"
            placeholder="Contraseña actual"
            class="form-input"
          />
          <input
            type="password"
            placeholder="Contraseña nueva"
            class="form-input"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            class="form-input"
          />
        </div>
        <div align="left">
          <button class="form-button-2">Guardar contraseña</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import {
//   mdiFileChart,
//   mdiChartBar,
//   mdiCurrencyUsd,
//   mdiContentSaveOutline,
// } from "@mdi/js";
// import Icon from "../../../../components/Icon.vue";
// import WebReporterIcon from "../../../../assets/general/icons/WebReporterIcon.vue";
import { useRoute } from "vue-router";
// import { computed, ref } from "vue";
const route = useRoute();
console.log(route.meta.headerComponent);
</script>
<style scoped>
@import "../../../../utils/css/dialog-bubble.css";
@import "../../../../styles/backgrounds.css";
@import "../../../../styles/forms.css";

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.beto-avatar {
  width: 25vw;
}

.profile-container {
  width: 87%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 30px;
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

.bubble > :nth-child(1) {
  font-weight: bold;
  font-size: calc(16px * var(--font-size-proportion));
  /* margin-bottom: 10px; */
}

.icon {
  position: absolute;
  top: 50.9%;
  right: 2%;
  --icon-proportion: 1;
  --icon-size: 1;
  fill: var(--color-contrast);
  margin-bottom: calc(5px * var(--icon-proportion));
  width: calc(25% * var(--icon-size));
  height: calc(25px * var(--icon-size));
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-email {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-password {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
