<template>
  <div class="app-plain-background"></div>
  <div class="container layout-container">
    <div class="report-inventory-container">
      <div
        v-if="!params && cashCounts.length != 0"
        class="back-button clickable"
        @click="onBack()"
      >
        <Icon :path="mdiArrowLeftCircle" class="back-icon" />
        <span>Regresar</span>
      </div>
      <div class="title-container">
        <h3 class="font-montserrat-bold text-contrast">Informe de arqueo</h3>
        <div class="date-field">
          <label for="fecha">Fecha de inicio</label>
          <input
            type="date"
            id="fecha"
            required
            class="form-input size-input"
            v-model="date"
          />
        </div>
      </div>
      <div
        :class="
          params ? 'cash-counts-container' : 'cash-counts-container-table'
        "
      >
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
            <h2 class="web-reporter-title">Arqueos de caja</h2>
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
        <div class="warehouses-container" v-if="params">
          <span class="font-montserrat-medium text-contrast"
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
                @checked-option="
              (meta: any) => {
                selectedWarehouse = meta;
              }
            "
              />
            </CenterAndScroll>
          </div>
          <div class="flex flex-justify-center">
            <button
              class="form-button"
              :class="{ 'disabled-button': !selectedWarehouse }"
              :disabled="!selectedWarehouse"
              @click="searchCashCounts()"
            >
              Buscar
            </button>
          </div>
        </div>
        <div class="table-container" v-if="cashCounts.length > 0">
          <table class="custom-table-two">
            <thead>
              <tr>
                <th class="font-montserrat-bold text-left">Almacén</th>
                <th class="font-montserrat-bold text-center">
                  Apertura / cierre
                </th>
                <th class="font-montserrat-bold text-center">Facturas</th>
                <th class="font-montserrat-bold text-center">Pedidos</th>
                <th class="font-montserrat-bold text-center">Salidas</th>
                <th class="font-montserrat-bold text-right">Total en pagos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cashCount in cashCounts" :key="cashCount.id">
                <td>{{ cashCount.nomalmacen }}</td>
                <td class="text-center">
                  <div>
                    <span class="font-montserrat-bold">Desde: </span>
                    {{ parseDateWhitHour(cashCount.fechaap) }}
                  </div>
                  <div>
                    <span class="font-montserrat-bold">Hasta: </span>
                    {{ parseDateWhitHour(cashCount.fechacie) || "N/A" }}
                  </div>
                </td>
                <td class="text-center">
                  <div>
                    {{ numberToCurrency(cashCount.total_facturas) }}
                  </div>
                  <div>
                    <span>Cantidad: </span>
                    <span class="font-montserrat-bold">
                      {{ cashCount.cant_facturas }}
                    </span>
                  </div>
                </td>
                <td class="text-center">
                  <div>
                    {{ numberToCurrency(cashCount.total_pedidos) }}
                  </div>
                  <div>
                    <span>Cantidad: </span>
                    <span class="font-montserrat-bold">
                      {{ cashCount.cant_pedidos }}
                    </span>
                  </div>
                </td>
                <td class="text-center">
                  <div>
                    {{ numberToCurrency(cashCount.total_salidas) }}
                  </div>
                </td>
                <td class="text-right">
                  {{ numberToCurrency(cashCount.total_pagos) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import BetoImg from "../../../../../../assets/avatars/beto.svg";
import BetoImgSad from "../../../../../../assets/avatars/beto-sad.png";
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import RadioLabels from "../../../../../../components/radio-label/RadioLabels.vue";
import { useAppStore } from "../../../../../../store/app.store";
import { useCashCountsStore } from "../../store/cash-counts.store";
import { parseDateWhitHour } from "../../../../../../utils/parsers/parse-date";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import { mdiArrowLeftCircle } from "@mdi/js";
import Icon from "../../../../../../components/Icon.vue";

const all_warehouses = ref(false);
const selectedWarehouse = ref<any | null>(null);
const warehouses_array = ref([]);
const cashCountStore = useCashCountsStore();
const date = ref<string | undefined>(new Date().toISOString().split("T")[0]);
const cashCounts = ref<any[]>([]);
const params = ref<boolean>(true);
const messageNotFound = ref<string>("");

enum BetoState {
  WELCOME = 0,
  NOT_FOUND = 1,
}

let beto_state = ref(BetoState.WELCOME);

const appStore = useAppStore();
const loadWarehouses = async () => {
  const warehouses = await appStore.getWarehouses();
  warehouses_array.value = warehouses.data.map((warehouse: any) => {
    return {
      title: warehouse.nomalmacen,
      meta: warehouse,
    };
  });
};

const searchCashCounts = async () => {
  appStore.showLoadingScreen = true;
  const newDate = new Date().toISOString().split("T")[0];
  console.log(selectedWarehouse.value?.idalmacen ?? 0);
  const response = await cashCountStore.cashCounts(
    newDate,
    selectedWarehouse.value?.idalmacen ?? 0
  );
  console.log(response.data);
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

const onBack = () => {
  params.value = true;
  selectedWarehouse.value = null;
  cashCounts.value = [];
  beto_state.value = BetoState.WELCOME;
};


onMounted(() => {
  loadWarehouses();
});
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";
@import "../../../../../../utils/css/dialog-bubble.css";
:global(:root) {
  --beto-width: 1;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.report-inventory-container {
  width: 80%;
  max-height: 100%;
  height: 80%;
}

.cash-counts-container {
  height: 92%;
  border-radius: 5px;
  background-color: var(--color-primary-dark);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.cash-counts-container-table {
  height: 92%;
  border-radius: 5px;
  background-color: var(--color-primary-dark);
  display: flex;
  justify-content: space-evenly;
  align-items: start;
}

.beto-message-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.beto-avatar {
  width: calc(10vw * var(--beto-width));
}

.beto-avatar-sad {
  width: calc(10vw * var(--beto-width));
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
  padding: 20px;
  line-height: calc(18px * var(--line-height-proportion));
  text-align: center;
  gap: 5px;
}

.bubble > :nth-child(1) {
  font-weight: light;
  font-size: calc(12px * var(--font-size-proportion));
  margin-bottom: 2px;
}

.size-input {
  width: 100%;
}

label {
  background-color: var(--color-primary-dark-2) !important;
}

.warehouses-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 30%;
}
.table-container {
  width: 95%;
  margin: 20px;
}
.back-button {
  color: var(--color-contrast);
  width: 10%;
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
</style>
