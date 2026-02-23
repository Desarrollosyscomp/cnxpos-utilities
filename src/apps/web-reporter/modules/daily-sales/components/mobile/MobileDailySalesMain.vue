<template>
  <div class="app-background"></div>
  <conexion-pos-logo class="logo" width="90vw" height="90vh" />
  <div class="container">
    <div class="main-container">
      <div class="search-container">
        <div class="date-field">
          <label for="fecha">Consultar fecha</label>
          <input
            type="date"
            id="fecha"
            required
            class="form-input size-input"
          />
        </div>
      </div>
      <div class="beto-message-container" v-if="isVisible">
        <img
          class="beto-avatar"
          src="../../../../../../assets/avatars/beto.svg"
          v-if="isVisible === true"
        />
        <img
          class="beto-avatar"
          src="../../../../../../assets/avatars/beto-sad.png"
          v-else
        />
        <div class="bubble bubble-a bubble-up">
          <div v-if="isVisible">
            <span>Aquí encontraras</span>
            <h3 class="web-reporter-title">
              Informes de <br />
              ventas por día
            </h3>
            <span>Ingresa una fecha para continuar</span>
          </div>
          <div v-else>
            <h3 class="web-reporter-title">UPS!</h3>
            <span
              >No se encontraron <br />
              ventas en esa fecha <br />
              ¡Intenta con otra!</span
            >
          </div>
        </div>
      </div>
      <div v-else class="daily-sales-container">
        <h3>Informes de <br />ventas por día</h3>
        <div class="cards-container">
          <Card class="test-card">
            <CardContent>
              <div class="text-container">
                <span>Resumen</span>
                <div class="item">
                  <span>Total ventas</span>
                  <span>$1.964.059.99</span>
                </div>
                <hr />
                <div class="item">
                  <span>Total productos</span>
                  <span>19</span>
                </div>
                <hr />
                <div class="item">
                  <span>Total facturas</span>
                  <span>9</span>
                </div>
                <hr />
                <div class="item">
                  <span>Costo</span>
                  <span>$975.331</span>
                </div>
                <hr />
                <div class="item">
                  <span>Utilidad</span>
                  <span>$687.593.37</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card class="test-card">
            <CardContent>
              <span>Almacén</span> <br />
              <span>Cap Club 82</span>
              <div class="text-align">
                <div class="item-2">
                  <span> <b>Subtotal</b></span>
                  <span>$1.263.932.99</span>
                </div>
                <div class="item-2">
                  <span> <b>Total</b></span>
                  <span>$1.964.059.99</span>
                </div>
                <div class="item-2">
                  <span> <b>Costo</b></span>
                  <span>$1.964.059.99</span>
                </div>
              </div>
              <div class="buttons">
                <button class="form-button-2" @click="openModal = true">
                  Detalles
                </button>
                <button class="form-button-2" @click="router.push('invoices')">
                  Ver facturas
                </button>
              </div>
            </CardContent>
          </Card>
          <Modal :openModal="openModal" @closeModal="openModal = false" width="70vw">
            <div class="modal-content">
              <p class="color-contrast">Cap Club 81</p>
              <h3 class="color-contrast">Detalle de ventas</h3>
              <div v-for="(item, index) in items" :key="index">
                <div class="item-3">
                  <span>{{ item.item }}</span>
                  <span>{{ item.value }}</span>
                </div>
                <hr />
              </div>
              <div class="container-button">
                <button
                  @click="openModal = false"
                  class="form-button-2 color-button"
                >
                  Regresar
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Icon from "../../../../../../components/Icon.vue";
import ConexionPosLogo from "../../../../../../assets/logos/ConexionPosLogo.vue";
import { ref } from "vue";
import Card from "../Card.vue";
import CardContent from "../CardContent.vue";
import Modal from "../../../../../../components/Modal.vue";
import { useRouter } from "vue-router";
const isVisible = ref(false);
const isVisible2 = ref(true);
const openModal = ref(false);
const router = useRouter();
const items = ref([
  { item: "Fecha", value: "2024-01-01" },
  { item: "Id del almacen", value: "1" },
  { item: "Subtotal", value: "$1.263.932.99" },
  { item: "Total", value: "$1.263.932.99" },
  { item: "Facturas", value: "1" },
  { item: "Productos vendidos", value: "1" },
  { item: "Costo", value: "$1.263.932.99" },
]);

const showDate = ref(false);
const modelValue = ref("");
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";
@import "../../../../../../utils/css/dialog-bubble.css";
.logo {
  z-index: -1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  fill: #e9cfcf;
  [data-theme="dark"] & {
    fill: #5b2b26;
  }
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-container {
  padding-top: 5px;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-container {
  width: 80%;
  height: 10vh;
}
.size-input {
  width: 100%;
}
.date-field {
  display: flex;
  position: relative;
}
.date-field label {
  position: absolute;
  left: 12px;
  top: -8px;
  color: var(--color-contrast);
  background: var(--color-primary);
  padding: 0 6px;
  font-size: 12px;
}

.beto-message-container {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.beto-avatar {
  width: 30vw;
}

.bubble-a.bubble {
  --line-height-proportion: 1;
  --font-size-proportion: 1;
  --border: 1px;
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: 1;
  --triangle-x: 40%;

  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size-proportion));

  line-height: calc(18px * var(--line-height-proportion));
  text-align: center;
}

.bubble > :nth-child(1) {
  font-weight: light;
  font-size: calc(12px * var(--font-size-proportion));
  margin-bottom: 2px;
}

.daily-sales-container {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  flex: 1;
}
.cards-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: scroll;
}

.cards-container > .card:nth-child(2) {
  color: var(--color-contrast);
  background-color: var(--color-primary-light);
  [data-theme="dark"] & {
    color: var(--color-contrast);
    background-color: var(--color-primary);
  }
}

.text-container {
  color: var(--color-primary);
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  [data-theme="dark"] & {
    color: var(--color-primary);
  }
}
.item-3 {
  color: var(--color-contrast);
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  [data-theme="dark"] & {
    color: var(--color-contrast);
  }
}

.item-2 {
  --font-size: 1;
  font-size: calc(12px * var(--font-size));
  font-weight: 500;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .item-2 {
    --font-size: 1.5;
  }
}

.text-align {
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
}

.buttons {
  padding-top: 10px;
  display: flex;
  justify-content: space-evenly;
}
.modal-content {
  padding: 25px;
}

h3 {
  color: var(--color-contrast);
}

.color-contrast {
  color: var(--color-contrast);
}

.color-button {
  margin-top: 10px;
}
.container-button {
  display: flex;
  justify-content: center;
}

.test-card {
  background-color: var(--color-contrast);
  color: white;
  width: 90%;
}

.date-field input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0);
}

[data-theme="dark"] .date-field input::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>
