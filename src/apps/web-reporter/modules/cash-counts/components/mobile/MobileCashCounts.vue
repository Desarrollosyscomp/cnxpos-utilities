<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="report-inventory-container">
      <div
        v-if="!params && cashCounts.length != 0"
        class="back-button clickable"
        @click="onBack()"
      >
        <Icon :path="mdiArrowLeftCircle" class="back-icon" />
        <span>Regresar</span>
      </div>
      <div class="beto-message-container" v-if="params">
        <img
          :class="beto_state == BetoState.WELCOME ? 'beto-avatar' : 'beto-avatar-sad'"
          :src="beto_state == BetoState.WELCOME ? BetoImg : BetoImgSad"
        />
        <div
          class="bubble bubble-a bubble-left"
          v-if="beto_state == BetoState.WELCOME"
        >
          <span>Bienvenido al modulo de</span>
          <h4 class="web-reporter-title">Arqueos de caja</h4>
          <span>Selecciona un alamacen para generar un</span>
          <span class="font-montserrat-bold text-contrast"
            >informe de arqueos</span
          >
        </div>
        <div class="bubble bubble-a bubble-left" v-else>
          <span>{{ messageNotFound.split(" p")[0] }}</span>
          <span>p{{ messageNotFound.split(" p")[1] }}</span>
          <span class="font-montserrat-bold text-contrast"
            >Selecciona otro almacen y/o fecha</span
          >
        </div>
      </div>
      <div class="search-container" v-if="params">
        <div class="date-field">
          <label for="fecha">Fecha de inicio</label>
          <input
            v-model="date"
            type="date"
            id="fecha"
            required
            class="form-input size-input"
          />
        </div>
      </div>
      <div class="warehouses-container scrollable-y" v-if="params">
        <span class="font-montserrat-medium text-contrast text-center"
          >Selecciona un almacen para generar un informe de arqueos</span
        >
        <!-- <div class="checkbox-container">
          <input
            class="input-checkbox"
            type="checkbox"
            id="all-warehouses"
            v-model="all_warehouses"
          />
          <label
            class="text-contrast font-montserrat-medium"
            @click="all_warehouses = !all_warehouses"
            >Todos los almacenes</label
          >
        </div> -->
        <div class="scrollable-y flex flex-column">
          <CenterAndScroll>
            <RadioLabels
              :disabled="all_warehouses"
              :options="warehouses_array"
              @checked-option="(meta: any) => { selectedWarehouse = meta}"
            />
          </CenterAndScroll>
        </div>
        <div class="flex flex-justify-center">
          <button
            class="form-button-2"
            :class="{ disabled: !selectedWarehouse && !all_warehouses }"
            :disabled="!selectedWarehouse && !all_warehouses"
            @click="searchCashCounts()"
          >
            Buscar
          </button>
        </div>
      </div>
      <div v-if="cashCounts.length > 0" class="scrollable-y card-container">
        <div align="center">
          <h3 class="font-montserrat-bold text-contrast">Informe de arqueo</h3>
        </div>
        <Card v-for="(item, index) in cashCounts" :key="index">
          <CardContent>
            <div class="container-details">
              <div class="title-details">
                <span class="font-montserrat-bold"
                  >Arqueo #{{ item.idarqueo }}</span
                >
                <span class="font-montserrat-medium font-size-title"
                  >{{ parseDate(item.fechaap) }} al
                  {{ parseDate(item.fechacie) || "2026/02/20" }}</span
                >
                <span class="font-montserrat-bold font-size-title">{{
                  item.nomalmacen
                }}</span>
              </div>
              <div class="card-align">
                <div class="row-up">
                  <div class="item-box">
                    <span class="font-montserrat-medium">Total apertura</span>
                    <span class="subtitle font-montserrat-bold">{{
                      numberToCurrency(item.total_apertura)
                    }}</span>
                  </div>
                  <div class="item-box">
                    <span class="font-montserrat-medium">Total cierre</span>
                    <span class="subtitle font-montserrat-bold">{{
                      numberToCurrency(item.total_cierre)
                    }}</span>
                  </div>
                </div>

                <div class="row-down">
                  <div class="item-box">
                    <span class="font-montserrat-medium"
                      >Cantidad de facturas</span
                    >
                    <span class="subtitle font-montserrat-bold">{{
                      item.cant_facturas
                    }}</span>
                  </div>
                  <div class="item-box">
                    <span class="font-montserrat-medium">Total facturado</span>
                    <span class="subtitle font-montserrat-bold">{{
                      numberToCurrency(item.total_facturas)
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="buttons">
                <button class="form-button-2" @click="onOpenModal(item)">
                  Detalles
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div align="center">
          <Paginator
            v-if="cashCountStore.itemsCount > cashCountStore.limit"
            :key="cashCountStore.page"
            :items-per-page="cashCountStore.limit"
            :max-buttons="4"
            :total-pages="cashCountStore.totalPages"
            :current-page="cashCountStore.page"
            @on-change-page="onChangePage"
          />
        </div>
      </div>
    </div>
  </div>
  <Modal :openModal="modal" @close-modal="closeModal()" width="80vw">
    <div class="modal-container-2">
      <div class="text-container">
        <span class="font-montserrat-bold"
          >Arqueo #{{ selectedItem.idarqueo }}</span
        >
        <span class="font-montserrat-medium font-size-title"
          >{{ parseDate(selectedItem.fechaap) }} al
          {{ parseDate(selectedItem.fechacie) || "2026/02/20" }}</span
        >
        <span class="font-montserrat-bold font-size-title">{{
          selectedItem.nomalmacen
        }}</span>
        <div class="item">
          <span class="font-montserrat-bold">Total apertura</span>
          <span>{{ numberToCurrency(selectedItem.total_apertura) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Total cierre</span>
          <span>{{ numberToCurrency(selectedItem.total_cierre) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Cantidad de facturas</span>
          <span>{{ selectedItem.cant_facturas }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Total facturado</span>
          <span>{{ numberToCurrency(selectedItem.total_facturas) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Cantidad de pedidos</span>
          <span>{{ selectedItem.cant_pedidos }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Total en pedidos</span>
          <span>{{ numberToCurrency(selectedItem.total_pedidos) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Total salidas</span>
          <span>{{ numberToCurrency(selectedItem.total_salidas) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Total en pagos</span>
          <span>{{ numberToCurrency(selectedItem.total_pagos) }}</span>
        </div>
        <hr />
        <div class="button-leave">
          <button class="form-button-2" @click="closeModal()">Salir</button>
        </div>
      </div>
    </div>
  </Modal>
  <!-- <Modal
    :openModal="modalWarehouses"
    @close-modal="closeModalWarehouses()"
    width="80vw"
  >
    <div class="modal-container">
      <div class="text-container">
        <div class="warehouse-container">
          <span class="font-montserrat-bold">Almacenes</span>
          <div class="warehouse-list">
            <span
              v-for="(warehouse, index) in warehouses_array"
              :key="index"
              class="form-input"
              :disabled="true"
              >{{ warehouse.title }}</span
            >
          </div>
        </div>
        <div class="button-leave">
          <button class="form-button-2" @click="closeModalWarehouses()">
            Salir
          </button>
        </div>
      </div>
    </div>
  </Modal> -->
</template>
<script setup lang="ts">
import BetoImg from "../../../../../../assets/avatars/beto.svg";
import BetoImgSad from "../../../../../../assets/avatars/beto-sad.png";
import { onMounted, ref } from "vue";
import { useAppStore } from "../../../../../../store/app.store";
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import RadioLabels, {
  type TOptionsType,
} from "../../../../../../components/radio-label/RadioLabels.vue";
import { useCashCountsStore } from "../../store/cash-counts.store";
import Paginator from "../../../../../../components/Paginator.vue";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import Card from "../../../../../web-reporter/modules/daily-sales/components/Card.vue";
import CardContent from "../../../../../web-reporter/modules/daily-sales/components/CardContent.vue";
import Modal from "../../../../../../components/Modal.vue";
import { mdiArrowLeftCircle } from "@mdi/js";
import Icon from "../../../../../../components/Icon.vue";
import { parseDate } from "../../../../../../utils/parsers/parse-date";
// import type { TSummaryCashCounts } from "../../interfaces/summary-cash-counts.type";
enum BetoState {
  WELCOME = 0,
  NOT_FOUND = 1,
}

let beto_state = ref(BetoState.WELCOME);
const appStore = useAppStore();
const cashCountStore = useCashCountsStore();
const all_warehouses = ref(false);
const selectedWarehouse = ref<any>(null);
const cashCounts = ref<any[]>([]);
const date = ref<string | undefined>(new Date().toISOString().split("T")[0]);
const warehouses_array = ref<TOptionsType[]>([]);
const params = ref<boolean>(true);
const modal = ref<boolean>(false);
const selectedItem = ref<any>(null);
const messageNotFound = ref<string>("");

const searchCashCounts = async () => {
  appStore.showLoadingScreen = true;
  const newDate = new Date().toISOString().split("T")[0];
  const response = await cashCountStore.cashCounts(
    newDate,
    selectedWarehouse.value?.idalmacen ?? 0
  );
  if (response.data.cash_balance) {
    cashCounts.value = response.data.cash_balance;
    params.value = false;
    appStore.showLoadingScreen = false;
    return;
  }
  beto_state.value = BetoState.NOT_FOUND;
  params.value = true;
  cashCounts.value = [];
  appStore.showLoadingScreen = false;
  selectedWarehouse.value = null;
  messageNotFound.value = response.data;
  return;
};

const loadWarehouses = async () => {
  const warehouses = await appStore.getWarehouses();
  warehouses_array.value = warehouses.data.map((warehouse: any) => {
    return {
      title: warehouse.nomalmacen,
      meta: warehouse,
    };
  });
};

const onChangePage = (emmited: any) => {
  if (cashCountStore.page !== emmited.data.page) {
    cashCountStore.page = emmited.data.page;
    // searchSales();
  }
};

const onBack = () => {
  params.value = true;
  selectedWarehouse.value = null;
  cashCounts.value = [];
  beto_state.value = BetoState.WELCOME;
};

const onOpenModal = (item: any) => {
  selectedItem.value = item;
  modal.value = true;
};

const closeModal = () => {
  return (modal.value = false);
};

onMounted(() => {
  appStore.afterLoading(loadWarehouses);
});
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../utils/css/dialog-bubble.css";
@import "../../../../../../styles/forms.css";

:global(:root) {
  --beto-width: 1;
  --item-title-font-size: 1;
  --margin-title-bottom: 1;
  --font-size: 1;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
}

.report-inventory-container {
  width: 85%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
}

.beto-message-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 25px; */
  gap: 10px;
}
.beto-avatar {
  width: calc(25vw * var(--beto-width));
}

.beto-avatar-sad {
  width: calc(25vw * var(--beto-width));
  transform: scaleX(-1);
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
  font-weight: light;
  font-size: calc(12px * var(--font-size-proportion));
  margin-bottom: 2px;
}

.web-reporter-title {
  font-size: calc(16px * var(--item-title-font-size));
  margin-bottom: calc(5px * var(--margin-title-bottom));
}
.warehouses-container {
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.text-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.title {
  font-size: calc(16px * var(--font-size-title));
  font-weight: bold;
  text-align: center;
  padding-bottom: 5px;
}

.item {
  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size));
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-container {
  padding-top: 15px;
  padding-bottom: 10px;
}

.warehouse-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.warehouse-list {
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 10px;
}
.button-leave {
  display: flex;
  justify-content: end;
  width: 100%;
  padding-top: 5px;
}

.color-link {
  color: var(--color-accent);
  text-decoration: underline;
}

.back-button {
  color: var(--color-contrast);
  width: 50%;
  font-weight: bold;
  font-size: calc(12px * var(--font-size));
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
}
.back-icon {
  fill: var(--color-contrast);
  width: 20px;
}

.card-align {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.row-up {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
.row-down {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.box {
  width: 100%;
  padding: 10px;
  height: 60%;
}

.item-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid var(--color-contrast);
}

.subtitle {
  text-align: end;
  font-size: calc(14px * var(--item-subtitle-font-size));
}

.container-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.font-size-title {
  font-size: calc(13px * var(--font-size));
}

.title-details {
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 10px;
  /* display: flex;
  justify-content: space-between; */
}
.buttons {
  display: flex;
  justify-content: center;
}
.modal-container-2 {
  padding: 10px;
  padding-bottom: 2px;
}
.padding-bottom {
  padding-bottom: 10px;
}

.disabled {
  opacity: 0.5;
}

.search-container {
  width: 100%;
}

.size-input {
  width: 100%;
}

@media (min-width: 360px) {
  .font-size-title {
    --font-size: 1.1;
  }
  .back-button {
    --font-size: 1.2;
  }
}

@media (min-width: 414px) {
  .card-align {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .row-up {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .row-down {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
