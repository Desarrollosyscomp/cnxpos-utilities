<template>
  <div class="app-plain-background"></div>
  <div class="container">
    <div class="left-bar scrollable-y">
      <div
        class="form-container corners spaces-padding container-background scrollable-y"
      >
        <div class="font-montserrat-bold text-contrast">
          Generar nuevo reporte
        </div>
        <div class="checkbox-container">
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
        </div>
        <div class="scrollable-y flex flex-column">
          <CenterAndScroll>
            <RadioLabels
              :options="warehouses_array"
              :disabled="all_warehouses"
              @checked-option="
                (meta) => {
                  selectedWarehouse = meta;
                }
              "
            />
          </CenterAndScroll>
        </div>
        <div class="flex flex-justify-center">
          <button
            class="form-button"
            @click="searchSales()"
            :class="{ disabled: !selectedWarehouse && !all_warehouses }"
            :disabled="!selectedWarehouse && !all_warehouses"
          >
            Buscar
          </button>
        </div>
      </div>
      <div class="helper-container corners spaces-padding container-background">
        <div class="font-montserrat-bold text-contrast">Resumen</div>
        <div v-if="inventory.length == 0">
          <span class="font-montserrat-medium text-contrast"
            >Genere un reporte para ver el resumen</span
          >
        </div>
        <div class="summary-items" v-else>
          <div class="item">
            <span class="font-montserrat-bold font-size-title"
              >Existencias de inventario</span
            >
            <span>{{ summary?.inventoryStock }}</span>
          </div>
          <hr />
          <div class="item">
            <span class="font-montserrat-bold font-size-title"
              >Costo inventario (pond)</span
            >
            <span>{{ numberToCurrency(summary?.averageInventoryCost) }}</span>
          </div>
          <hr />
          <div class="item">
            <span class="font-montserrat-bold font-size-title"
              >Costo inventario (UC)</span
            >
            <span>{{ numberToCurrency(summary?.inventoryCost) }}</span>
          </div>
          <hr />
          <div class="item">
            <span class="font-montserrat-bold font-size-title"
              >Precio inventario</span
            >
            <span>{{ numberToCurrency(summary?.inventoryPrice) }}</span>
          </div>
          <hr />
        </div>
      </div>
    </div>
    <div class="beto-message-container" v-if="params">
      <div class="beto-message-wrapper">
        <img
          :src="beto_state === BetoState.WELCOME ? BetoImg : BetoSad"
          alt=""
        />
        <BubbleMessage
          left
          border="2px"
          border-color="var(--color-contrast)"
          background="var(--color-primary-light)"
          triangle-size="1"
          triangle-y="100px"
          min-width="300px"
        >
          <CenterAndScroll v-if="beto_state === BetoState.WELCOME">
            <div class="font-montserrat-medium text-contrast text-center">
              Bienvenido al modulo de
              <br />
              <h2 class="font-montserrat-bold text-contrast">Inventario</h2>
            </div>
            <div class="font-montserrat-medium text-contrast text-center">
              Por favor selecciona un almacen para generar un
              <br />
              <span class="font-montserrat-bold text-contrast">
                informe de inventario
              </span>
            </div>
          </CenterAndScroll>
          <CenterAndScroll v-if="beto_state === BetoState.NOT_FOUND">
            <div class="font-montserrat-bold text-contrast text-center">
              Ups!
            </div>
            <div class="font-montserrat-medium text-contrast text-center">
              No se encontraron ventas en el rango de fechas seleccionado
              ¡Intenta con otra!
            </div>
          </CenterAndScroll>
        </BubbleMessage>
      </div>
    </div>
    <div class="result-container" v-if="!params">
      <h3 class="main-title text-contrast">Informe de inventario</h3>
      <div class="cards">
        <Card v-for="(inventoryItem, index) in inventory" :key="index">
          <CardContent>
            <div class="main-title-table">
              <span class="font-montserrat-bold">{{ inventoryItem.descripcion }}</span>
              <span class="font-size-title font-montserrat-medium">{{
                inventoryItem.nombre_almacen
              }}</span>
            </div>
            <div class="items">
              <div class="item">
                <span class="font-montserrat-bold text-contrast">Cantidad</span>
                <span>{{ inventoryItem.cantidad }}</span>
              </div>
              <div class="item">
                <span class="font-montserrat-bold text-contrast">Código</span>
                <span>{{ inventoryItem.codigo || "N/A" }}</span>
              </div>
              <div class="item">
                <span class="font-montserrat-bold text-contrast">Barras</span>
                <span>{{ inventoryItem.barcode || "N/A" }}</span>
              </div>
              <div class="item">
                <span class="font-montserrat-bold text-contrast"
                  >Costo ponderado</span
                >
                <span>{{ numberToCurrency(inventoryItem.costo) }}</span>
              </div>
              <div class="item">
                <span class="font-montserrat-bold text-contrast"
                  >Costo inventario (ponderado)</span
                >
                <span>{{ numberToCurrency(inventoryItem.costo_ponderado) }}</span>
              </div>
              <div class="item">
                <span class="font-montserrat-bold text-contrast"
                  >Costo (ultima compra)</span
                >
                <span>{{ numberToCurrency(inventoryItem.costo_total) }}</span>
              </div>
              <div class="item">
                <span class="font-montserrat-bold text-contrast"
                  >Costo inventario (Ultima compra)</span
                >
                <span>{{ numberToCurrency(inventoryItem.ultimo_costo) }}</span>
              </div>
              <div class="item">
                <span class="font-montserrat-bold text-contrast">Precio</span>
                <span>{{ numberToCurrency(inventoryItem.precio_venta) }}</span>
              </div>
              <div class="item">
                <span class="font-montserrat-bold text-contrast"
                  >Valorizado</span
                >
                <span>{{ numberToCurrency(inventoryItem.valorizado) }}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div align="center" class="pagination">
        <Paginator
          v-if="reportInventoryStore.itemsCount > reportInventoryStore.limit"
          :key="reportInventoryStore.page"
          :items-per-page="reportInventoryStore.limit"
          :max-buttons="4"
          :total-pages="reportInventoryStore.totalPages"
          :current-page="reportInventoryStore.page"
          @on-change-page="onChangePage"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue-demi";
import BetoImg from "../../../../../../assets/avatars/beto.svg";
import BetoSad from "../../../../../../assets/avatars/beto-sad.png";
import BubbleMessage from "../../../../../../components/BubbleMessage.vue";
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import RadioLabels, {
  type TOptionsType,
} from "../../../../../../components/radio-label/RadioLabels.vue";
import { useAppStore } from "../../../../../../store/app.store";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import Card from "../../../../../web-reporter/modules/daily-sales/components/Card.vue";
import CardContent from "../../../../../web-reporter/modules/daily-sales/components/CardContent.vue";
import Paginator from "../../../../../../components/Paginator.vue";
import { useReportInventoryStore } from "../../store/report-inventory.store";
import type { TSummaryInventory } from "../../interfaces/summary-inventory.type";

// enum PageState {
//   BETO_MESSAGE = 0,
//   DATA = 1,
// }

enum BetoState {
  WELCOME = 0,
  NOT_FOUND = 1,
}

// let page_state = ref(PageState.BETO_MESSAGE);
let beto_state = ref(BetoState.WELCOME);
let warehouses_array = ref<TOptionsType[]>([]);
let all_warehouses = ref<boolean>(false);
let selectedWarehouse = ref<any>(null);
let inventory = ref<any[]>([]);
let summary = ref<TSummaryInventory>({
    warehouseName: "",
    inventoryStock: 0,
    averageInventoryCost: 0,
    inventoryCost: 0,
    inventoryPrice: 0,
    profit: 0,
});
let params = ref<boolean>(true);
const reportInventoryStore = useReportInventoryStore();

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

const searchSales = async () => {
  console.log(selectedWarehouse.value);
  const response = await reportInventoryStore.reportInventory(
    selectedWarehouse.value?.idalmacen ?? 0
  );
  if (response.data.list.length === 0) {
    beto_state.value = BetoState.NOT_FOUND;
    params.value = true;
    inventory.value = [];
    return;
  } else {
    inventory.value = response.data.list;
    summary.value = response.data.summary;
    params.value = false;
  }
};

const onChangePage = (emmited: any) => {
  if (reportInventoryStore.page !== emmited.data.page) {
    reportInventoryStore.page = emmited.data.page;
    searchSales();
  }
};

onMounted(() => {
  loadWarehouses();
});
</script>

<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";

.container {
  display: grid;
  grid-template-columns: 20% 1fr;
  width: 100%;
  height: 100%;
}

.beto-message-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 20%;
}

.beto-message-wrapper {
  display: flex;
  gap: 40px;
  min-width: 300px;
  max-width: 400px;
  height: 200px;
}

.corners {
  border-radius: 10px;
}

.title {
  background-color: var(--color-primary-dark);
}

.left-bar {
  margin: 10px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.container-background {
  background-color: var(--color-primary-dark);
}

.form-container {
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.helper-container {
  max-height: 30vh;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.content {
  margin: 10px;
  margin-left: 15px;
}

.main-title {
  font-size: 25px;
  margin-bottom: 20px;
  text-align: start;
  padding-left: 5%;
}

.main-title-table {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.main-title-table span:last-child {
  font-size: 12px;
}

.spaces-padding {
  padding: 20px;
}

.table-container {
  padding: 25px;
  background-color: red;
}

.summary {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.summary-content {
  color: var(--color-contrast);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.summary-title {
  margin-bottom: 10px;
  font-size: calc(1rem * var(--message-proportion));
}

.summary-item > :nth-child(1) {
  font-size: calc(0.9rem * var(--message-proportion));
  font-weight: bold;
}
.summary-item > :nth-child(2) {
  font-size: calc(0.9rem * var(--message-proportion));
}

.summary-beto {
  width: calc(130px * var(--message-proportion));
}

.result-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.item {
  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size));
  display: flex;
  align-items: center;
}

.item span:first-child {
  display: flex;
  align-items: center;
  flex: 1;
}

.item span:first-child::after {
  content: "";
  border-bottom: 2px dotted var(--color-contrast);
  flex: 1;
  margin: 0 6px;
}

.item span:last-child {
  white-space: nowrap;
}
.cards {
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  padding-left: 5%;
}

.font-size-title {
  font-size: calc(13px * var(--font-size));
  padding-bottom: 10px;
}

.pagination {
  margin-top: 20px;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
