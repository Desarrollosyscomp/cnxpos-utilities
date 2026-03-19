<template>
  <div class="app-background"></div>
  <conexion-pos-logo class="logo" width="90vw" height="90vh" />
  <div class="container">
    <div class="main-container">
      <div class="search-container">
        <div class="date-field">
          <label for="fecha">Consultar fecha</label>
          <input
            v-model="date"
            type="date"
            id="fecha"
            required
            class="form-input size-input"
          />
        </div>
      </div>
      <div class="beto-message-container" v-if="warehousesArray.length == 0">
        <img
          v-if="initBettoMessage"
          class="beto-avatar"
          src="../../../../../../assets/avatars/beto.svg"
        />
        <img
          v-if="BettoMessageNotFound"
          class="beto-avatar"
          src="../../../../../../assets/avatars/beto-sad.png"
        />
        <div class="bubble bubble-a bubble-up">
          <div v-if="initBettoMessage">
            <span>Aquí encontraras</span>
            <h3 class="web-reporter-title">
              Informes de <br />
              ventas por día
            </h3>
            <span>Ingresa una fecha para continuar</span>
          </div>
          <div v-if="BettoMessageNotFound">
            <h3 class="web-reporter-title">UPS!</h3>
            <span
              >No se encontraron <br />
              ventas en esa fecha <br />
              ¡Intenta con otra!</span
            >
          </div>
        </div>
      </div>
      <div v-if="warehousesArray.length > 0" class="daily-sales-container">
        <h3 class="web-reporter-title">Informes de <br />ventas por día</h3>
        <div class="cards-container">
          <Card :dark="true" class="test-card">
            <CardContent>
              <div class="text-container">
                <span class="title">Resumen</span>
                <div class="item">
                  <span class="item-bold">Total ventas</span>
                  <span>{{ numberToCurrency(summary.totalSales) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Total productos</span>
                  <span>{{ summary.totalProducts }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Total facturas</span>
                  <span>{{ summary.totalInvoices }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Costo</span>
                  <span>{{ numberToCurrency(summary.totalCost) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Utilidad</span>
                  <span>{{ numberToCurrency(summary.totalProfit) }}</span>
                </div>
                <!-- <hr>
                <div class="item">
                  <span class="item-bold">Metodos de pago</span>
                  <span>{{ summary.paymentMethods }}</span>
                </div>
                <hr> -->
              </div>
            </CardContent>
          </Card>
          <Card
            class="test-card"
            v-for="item in warehousesArray"
            :key="item.id"
          >
            <CardContent>
              <span class="title">Almacén</span> <br />
              <span class="warehouse">{{ item.nomalmacen }}</span>
              <div class="text-align">
                <div class="item-2">
                  <span> <b>Subtotal</b></span>
                  <span>{{ numberToCurrency(item.subtot) }}</span>
                </div>
                <hr />
                <div class="item-2">
                  <span> <b>Total</b></span>
                  <span>{{ numberToCurrency(item.total) }}</span>
                </div>
                <hr />
                <div class="item-2">
                  <span> <b>Costo</b></span>
                  <span>{{ numberToCurrency(item.costoacum) }}</span>
                </div>
                <hr />
              </div>
              <div class="buttons">
                <button class="form-button-2" @click="openDetail(item)">
                  Detalles
                </button>
                <button
                  class="form-button-2"
                  @click="
                    router.push(`invoices/${item.fecha}/${item.idalmacen}`)
                  "
                >
                  Ver facturas
                </button>
              </div>
            </CardContent>
          </Card>
          </div>
          <Modal :openModal="openModal" @closeModal="closeModal()" width="80vw">
            <div class="modal-content">
              <div class="modal-title">
                <span class="color-contrast font-warehouse">{{
                  selectedItem?.nomalmacen
                }}</span>
                <h3 class="color-contrast">Detalle de ventas</h3>
              </div>
              <div>
                <div class="item-3">
                  <span class="item-3-bold">Fecha</span>
                  <span class="item3-value">{{
                    formatDateWithHyphen(selectedItem?.fecha || "")
                  }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Id del almacen</span>
                  <span class="item3-value">{{ selectedItem?.idalmacen }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Subtotal</span>
                  <span class="item3-value">{{
                    numberToCurrency(selectedItem?.subtot || 0)
                  }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Costo</span>
                  <span class="item3-value">{{
                    numberToCurrency(selectedItem?.costoacum || 0)
                  }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Facturas</span>
                  <span class="item3-value">{{ selectedItem?.cantfact }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Productos vendidos</span>
                  <span class="item3-value">{{ selectedItem?.prodvendid }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Total</span>
                  <span class="item3-value">{{
                    numberToCurrency(selectedItem?.total || 0)
                  }}</span>
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
</template>
<script setup lang="ts">
import ConexionPosLogo from "../../../../../../assets/logos/ConexionPosLogo.vue";
import { onMounted, ref, watch } from "vue";
import Card from "../Card.vue";
import CardContent from "../CardContent.vue";
import Modal from "../../../../../../components/Modal.vue";
import { useRouter } from "vue-router";
import { useDailySalesStore } from "../../store/daily-sales.store";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import { formatDateWithHyphen } from "../../../../../../utils/parsers/parse-date";
import type { TDetailModal, TWarehouseDaySale } from "../../interfaces/warehouse-day-sales.type";
import type { TSummary } from "../../interfaces/summary-daily-sales.type";
import { useAppStore } from "../../../../../../store/app.store";
const appStore = useAppStore();
const initBettoMessage = ref(true);
const BettoMessageNotFound = ref(false);
const openModal = ref(false);
const selectedItem = ref<TDetailModal | null>(null);
const router = useRouter();

const date = ref("");

const dailySalesStore = useDailySalesStore();
const warehousesArray = ref<TWarehouseDaySale[]>([]);
const summary = ref<TSummary>({
    totalSales: 0,
    totalProducts: 0,
    totalInvoices: 0,
    totalCost: 0,
    totalProfit: 0,
});

const setArray = async () => {
  BettoMessageNotFound.value = false;
  initBettoMessage.value = false;
  warehousesArray.value = [];
  
  const sendDateParsed = date.value.replace(/-/g, "");
  appStore.showLoadingScreen = true;
  let response = await dailySalesStore.dailySales(sendDateParsed);

  if (response.error || !response.data.sales.length) {
    BettoMessageNotFound.value = true;
    appStore.showLoadingScreen = false;
    return;
  }
  
  appStore.showLoadingScreen = false;
  summary.value = response.data.summary;
  warehousesArray.value = response.data.sales;
};

watch(date, () => {
  setArray();
});
 
const openDetail = (item: any) => {
  selectedItem.value = item;
  openModal.value = true;
  console.log(selectedItem.value);
};

const closeModal = () => {
  openModal.value = false;
  selectedItem.value = null;
};

onMounted(async () => {
  setArray();
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
.text-align {
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  padding-bottom: calc(12px * var(--padding-bottom-buttons));
}
.item-2 {
  --font-size: 1;
  --padding-top: 1;
  font-size: calc(12px * var(--font-size));
  padding-top: calc(5px * var(--padding-top));
  font-weight: 500;
  display: flex;
  justify-content: space-between;
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
