<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="beto-message-container">
      <img class="beto-avatar" :src="BetoImg" />
      <div class="bubble bubble-a bubble-left">
        <span class="font-montserrat-bold"
          >Aquí puedes editar algunos detalles de tu cuenta, como correo,
          contraseña, y ver algunos datos mas</span
        >
      </div>
    </div>
    <div class="home-content">
      <Card>
        <CardContent>
          <div class="params-container">
            <img
              class="beto-avatar-params"
              :src="isGirl ? WomanImg : BetoImg"
            />
            <div class="flex sex">
              <span
                class="font-montserrat-bold clickable"
                :class="!isGirl ? 'selected-sex' : ''"
                @click="isGirl = false"
                >Soy chico</span
              >
              |
              <span
                class="font-montserrat-bold clickable"
                :class="isGirl ? 'selected-sex' : ''"
                @click="isGirl = true"
                >Soy chica</span
              >
            </div>
          </div>
          <div class="forms">
            <div class="form-email">
              <span class="text-contrast font-montserrat-bold"
                >Correo electrónico</span
              >
              <input type="text" placeholder="Correo" class="form-input" />
              <Icon :path="mdiContentSaveOutline" class="icon" />
            </div>
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
            <div align="center">
              <button class="form-button">Guardar contraseña</button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { mdiContentSaveOutline } from "@mdi/js";
import Card from "../../../../apps/web-reporter/modules/daily-sales/components/Card.vue";
import CardContent from "../../../../apps/web-reporter/modules/daily-sales/components/CardContent.vue";
import BetoImg from "../../../../assets/avatars/beto.svg";
import WomanImg from "../../../../assets/avatars/woman.jpg";
import { ref } from "vue-demi";
import Icon from "../../../../components/Icon.vue";

let isGirl = ref<boolean>(true);
</script>
<style scoped>
@import "../../../../utils/css/dialog-bubble.css";
@import "../../../../styles/backgrounds.css";
@import "../../../../styles/forms.css";
@import "../../../../styles/style.css";

:global(:root) {
  --beto-proportion: 1;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.home-content {
  width: 30%;
}

.beto-message-container {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
}

.beto-avatar {
  width: calc(45% * var(--beto-proportion));
}
.beto-avatar-params {
  width: calc(25% * var(--beto-proportion));
}

.bubble-a.bubble {
  --border: calc(2px * var(--beto-proportion));
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: calc(1.3 * var(--beto-proportion));
  --triangle-y: calc(60px * var(--beto-proportion));
  color: var(--color-contrast);
  text-align: center;
  border-radius: calc(17px * var(--beto-proportion));
  width: calc(340px * var(--beto-proportion));
  height: calc(190px * var(--beto-proportion));
  padding: 5px;
}

.beto-content {
  line-height: calc(28px * var(--beto-proportion));
  text-align: center;
  padding: calc(10px * var(--beto-proportion));
  display: flex;
  flex-direction: column;
  gap: calc(10px * var(--beto-proportion));
}

.params-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
}

.sex {
  gap: 10px;
}

.selected-sex {
  color: var(--color-accent);
}

.forms {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
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

.icon {
  position: absolute;
  top: 50.2%;
  right: 13%;
  width: 20px;
  fill: var(--color-contrast);
}
@media (min-width: 1440px) {
  :global(:root) {
    --beto-proportion: 1.3;
  }
}
@media (min-width: 1920px) {
  :global(:root) {
    --beto-proportion: 1.6;
  }
}

@media (min-width: 2560px) {
  :global(:root) {
    --beto-proportion: 2;
  }
}
</style>
<!-- test styles errase -->
<style></style>
