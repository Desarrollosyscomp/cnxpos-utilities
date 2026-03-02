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
        <h3 class="web-reporter-title">Informes de <br />ventas por día</h3>
        <div class="cards-container">
          <Card :dark="true" class="test-card">
            <CardContent>
              <div class="text-container">
                <span class="title">Resumen</span>
                <div class="item">
                  <span class="item-bold">Total ventas</span>
                  <span>{{ calcTotal() }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Total productos</span>
                  <span>{{ calcProductTotal() }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Total facturas</span>
                  <span>{{ calcInvoiceTotal() }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Costo</span>
                  <span>{{ calcCostTotal() }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Utilidad</span>
                  <span>{{ calcUtilidadTotal() }}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card class="test-card" v-for="item in array" :key="item.id">
            <CardContent>
              <span class="title">Almacén</span> <br />
              <span class="warehouse">{{ item.nomalmacen }}</span>
              <div class="text-align">
                <div class="item-2">
                  <span> <b>Subtotal</b></span>
                  <span>{{ numberToCurrency(item.subtot) }}</span>
                </div>
                <div class="item-2">
                  <span> <b>Total</b></span>
                  <span>{{ numberToCurrency(item.total) }}</span>
                </div>
                <div class="item-2">
                  <span> <b>Costo</b></span>
                  <span>{{ numberToCurrency(item.costoacum) }}</span>
                </div>
              </div>
              <div class="buttons">
                <button class="form-button-2" @click="openDetail(item)">
                  Detalles
                </button>
                <button class="form-button-2" @click="router.push('invoices')">
                  Ver facturas
                </button>
              </div>
            </CardContent>
          </Card>
          <Modal :openModal="openModal" @closeModal="closeModal()" width="80vw">
            <div class="modal-content">
              <div class="modal-title">
                <span class="color-contrast font-warehouse">{{
                  selectedItem.nomalmacen
                }}</span>
                <h3 class="color-contrast">Detalle de ventas</h3>
              </div>
              <div>
                <div class="item-3">
                  <span class="item-3-bold">Fecha</span>
                  <span class="item3-value">{{ parseDate(selectedItem.fecha) }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Id del almacen</span>
                  <span class="item3-value">{{ selectedItem.idalmacen }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Subtotal</span>
                  <span class="item3-value">{{ numberToCurrency(selectedItem.subtot) }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Costo</span>
                  <span class="item3-value">{{ numberToCurrency(selectedItem.costoacum) }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Facturas</span>
                  <span class="item3-value">{{ selectedItem.cantfact }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Productos vendidos</span>
                  <span class="item3-value">{{ selectedItem.prodvendid }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Total</span>
                  <span class="item3-value">{{ numberToCurrency(selectedItem.total) }}</span>
                </div>
                <hr />
              </div>
              <div class="container-button">
                <button
                  @click="closeModal()"
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
import { onMounted, ref } from "vue";
import Card from "../Card.vue";
import CardContent from "../CardContent.vue";
import Modal from "../../../../../../components/Modal.vue";
import { useRouter } from "vue-router";
import { useDailySalesStore } from "../../store/daily-sales.store";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import { parseDate } from "../../../../../../utils/parsers/parse-date";
const isVisible = ref(false);
const isVisible2 = ref(false);
const openModal = ref(false);
const selectedItem = ref(null);
const router = useRouter();
const items = ref([
  { item: "Fecha", value: "2025-01-01" },
  { item: "Id del almacen", value: "1" },
  { item: "Subtotal", value: "$1.263.932.99" },
  { item: "Total", value: "$1.263.932.99" },
  { item: "Facturas", value: "1" },
  { item: "Productos vendidos", value: "1" },
  { item: "Costo", value: "$1.263.932.99" },
]);

const showDate = ref(false);
const modelValue = ref("");

const dailySalesStore = useDailySalesStore();

const array = ref([]);

const setArray = async () => {
  let response = await dailySalesStore.dailySales();
  array.value = response.data;
  console.log(array.value);
};

const calcTotal = () => {
  let total = 0;
  for (let i = 0; i < array.value.length; i++) {
    total += array.value[i].total;
  }
  return numberToCurrency(total);
};

const calcProductTotal = () => {
  let totalProducts = 0;
  for (let i = 0; i < array.value.length; i++) {
    totalProducts += array.value[i].prodvendid;
  }
  return totalProducts;
};
const calcInvoiceTotal = () => {
  let totalInvoices = 0;
  for (let i = 0; i < array.value.length; i++) {
    totalInvoices += array.value[i].cantfact;
  }
  return totalInvoices;
};

const calcCostTotal = () => {
  let totalCost = 0;
  for (let i = 0; i < array.value.length; i++) {
    totalCost += array.value[i].costoacum;
  }
  return numberToCurrency(totalCost);
};

const calcUtilidadTotal = () => {
  let totalUtilidad = 0;
  for (let i = 0; i < array.value.length; i++) {
    totalUtilidad += array.value[i].total - array.value[i].costoacum;
  }
  return numberToCurrency(totalUtilidad);
};

const extractWarehouseName = () => {
  let warehouse = "";
  for (let i = 0; i < array.value.length; i++) {
    warehouse = array.value[i].nomalmacen;
  }
  return warehouse;
};

const openDetail = (item) => {
  selectedItem.value = item;
  openModal.value = true;
  console.log(selectedItem.value);
};

const closeModal = () => {
  openModal.value = false;
  selectedItem.value = null;
};
onMounted(async () => {
  await setArray();
});
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";
@import "../../../../../../utils/css/dialog-bubble.css";
:global(:root) {
  --font-size: 1;
  --font-size-title: 1;
  --gap-size: 1;
  --padding-bottom-buttons: 1;
}

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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
}
.main-container {
  padding-top: 5px;
  width: 100%;
  height: 88%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-container {
  padding-bottom: 15px;
  width: 80%;
}
.size-input {
  width: 100%;
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
  gap: calc(10px * var(--gap-size));
  overflow-y: scroll;
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
  font-size: calc(12px * var(--font-size));
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  [data-theme="dark"] & {
    color: var(--color-primary);
  }
}
.item-3 {
  padding-top: 5px;
  color: var(--color-contrast);
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  [data-theme="dark"] & {
    color: var(--color-contrast);
  }
}
.item-3-bold {
  font-weight: bold;
}
.item-2 {
  --font-size: 1;
  --padding-top: 1;
  font-size: calc(12px * var(--font-size));
  padding-top: calc(5px * var(--padding-top));
  font-weight: 500;
  display: flex;
  flex-direction: column;
}

.text-align {
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  padding-bottom: calc(12px * var(--padding-bottom-buttons));
}

.buttons {
  display: flex;
  justify-content: space-evenly;
}
.modal-content {
  padding: 12px;
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
  color: var(--color-contrast);
  width: 90%;
}

.web-reporter-title {
  color: var(--color-contrast);
}

.title {
  font-size: calc(16px * var(--font-size-title));
  font-weight: 600;
}

.warehouse {
  font-size: 18px;
  font-weight: 800;
}

.font-warehouse {
  font-weight: 500;
}

.modal-title {
  padding-bottom: 10px;
}
.item-bold {
  font-weight: bold;
}
@media (min-width: 375px) {
  .item {
    --font-size: 1.2;
  }
  .item-2 {
    --font-size: 1.2;
  }
  .title {
    --font-size-title: 1.2;
  }
}
@media (min-width: 768px) {
  .item-2 {
    --font-size: 1.5;
  }
  .title {
    font-size: 25px;
  }
  .warehouse {
    font-size: 25px;
  }
  .web-reporter-title {
    font-size: 25px;
    padding-bottom: 10px;
  }
  .cards-container {
    --gap-size: 1.5;
  }

  .text-align {
    --padding-bottom-buttons: 2;
  }
}
</style>
