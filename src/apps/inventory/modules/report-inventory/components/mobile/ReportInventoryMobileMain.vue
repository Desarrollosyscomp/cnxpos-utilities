<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="report-inventory-container">
      <div
        v-if="!params && inventory.length != 0"
        class="back-button clickable"
        @click="onBack()"
      >
        <Icon :path="mdiArrowLeftCircle" class="back-icon" />
        <span>Regresar</span>
      </div>
      <div class="beto-message-container" v-if="params">
        <img class="beto-avatar" :src="BetoImg" />
        <div class="bubble bubble-a bubble-left">
          <span>Bienvenido al modulo de</span>
          <h3 class="web-reporter-title">Inventario</h3>
          <span>Selecciona un alamacen para generar un</span>
          <span class="font-montserrat-bold">informe de inventario</span>
        </div>
      </div>
      <div class="warehouses-container scrollable-y" v-if="params">
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
              :disabled="all_warehouses"
              :options="warehouses_array"
              @checked-option="(meta: any) => { selectedWarehouse = meta}"
            />
          </CenterAndScroll>
        </div>
        <div class="flex flex-justify-center">
          <button class="form-button-2" :class="{ disabled: !selectedWarehouse && !all_warehouses }" :disabled="!selectedWarehouse && !all_warehouses" @click="searchSales()">Buscar</button>
        </div>
      </div>
      <div v-if="inventory.length > 0" class="scrollable-y card-container">
        <Card class="text-contrast">
          <CardContent>
            <div class="text-container">
              <span class="title">Resumen</span>
              <div class="item">
                <span class="font-montserrat-bold font-size-title"
                  >Almacenes</span
                >
                <span>{{ summary?.warehouseName }}</span>

                <!-- <span class="font-montserrat-bold">Almacenes</span>
                <div @click="openModalWarehouses()">
                  <span class="clickable color-link"> Ver mas </span>
                </div> -->
              </div>
              <hr />
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
                <span>{{
                  numberToCurrency(summary?.averageInventoryCost)
                }}</span>
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
              <div class="item">
                <span class="font-montserrat-bold font-size-title"
                  >Utilidad</span
                >
                <span>{{ numberToCurrency(summary?.profit) }}</span>
              </div>
              <hr />
            </div>
          </CardContent>
        </Card>
        <Card v-for="(item, index) in inventory" :key="index">
          <CardContent>
            <div class="container-details">
              <div class="title-details">
                <span class="font-montserrat-bold">{{ item.descripcion }}</span>
                <span class="font-montserrat-bold font-size-title">{{
                  item.nombre_almacen
                }}</span>
              </div>
              <div class="card-align">
                <div class="box-left">
                  <div class="row-up">
                    <div class="item-box">
                      <span class="font-montserrat-medium">Cantidad</span>
                      <span class="subtitle font-montserrat-bold">{{
                        item.cantidad
                      }}</span>
                    </div>
                    <div class="item-box">
                      <span class="font-montserrat-medium">Barras</span>
                      <span class="subtitle font-montserrat-bold">{{
                        item.codigo || "N/A"
                      }}</span>
                    </div>
                  </div>
                  <div class="row-down">
                    <div class="item-box">
                      <span class="font-montserrat-medium">Precio venta</span>
                      <span class="subtitle font-montserrat-bold">{{
                        numberToCurrency(item.precio_venta)
                      }}</span>
                    </div>
                  </div>
                </div>
                <div class="box-right">
                  <div class="row-up">
                    <div class="item-box">
                      <span class="font-montserrat-medium">Valorizado</span>
                      <span class="subtitle font-montserrat-bold">{{
                        numberToCurrency(item.valorizado)
                      }}</span>
                    </div>
                  </div>
                  <div class="row-down">
                    <div class="item-box">
                      <span class="font-montserrat-medium">Costo</span>
                      <span class="subtitle font-montserrat-bold">{{
                        numberToCurrency(item.costo)
                      }}</span>
                    </div>
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
            v-if="inventoryStore.itemsCount > inventoryStore.limit"
            :key="inventoryStore.page"
            :items-per-page="inventoryStore.limit"
            :max-buttons="4"
            :total-pages="inventoryStore.totalPages"
            :current-page="inventoryStore.page"
            @on-change-page="onChangePage"
          />
        </div>
      </div>
    </div>
  </div>
  <Modal :openModal="modal" @close-modal="closeModal()" width="80vw">
    <div class="modal-container-2">
      <div class="text-container">
        <span class="font-montserrat-bold">{{ selectedItem.descripcion }}</span>
        <span class="font-size-title font-montserrat-bold padding-bottom">{{
          selectedItem.nombre_almacen
        }}</span>
        <div class="item">
          <span class="font-montserrat-bold">Cantidad</span>
          <span>{{ selectedItem.cantidad }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Código</span>
          <span>{{ selectedItem.codigo || "N/A" }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Barras</span>
          <span>{{ selectedItem.barcode || "N/A" }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Costo ponderado</span>
          <span>{{ numberToCurrency(selectedItem.costo) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Costo inventario (ponderado)</span>
          <span>{{
            numberToCurrency(selectedItem.costo_ponderado)
          }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Costo (última compra)</span>
          <span>{{ numberToCurrency(selectedItem.ultimo_costo) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Costo inventario (última compra)</span>
          <span>{{ numberToCurrency(selectedItem.costo_total) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Precio</span>
          <span>{{ numberToCurrency(selectedItem.precio_venta) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Valorizado</span>
          <span>{{ numberToCurrency(selectedItem.valorizado) }}</span>
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
import { onMounted, ref } from "vue";
import { useAppStore } from "../../../../../../store/app.store";
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import RadioLabels, {
  type TOptionsType,
} from "../../../../../../components/radio-label/RadioLabels.vue";
import { useReportInventoryStore } from "../../store/report-inventory.store";
import Paginator from "../../../../../../components/Paginator.vue";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import Card from "../../../../../web-reporter/modules/daily-sales/components/Card.vue";
import CardContent from "../../../../../web-reporter/modules/daily-sales/components/CardContent.vue";
import Modal from "../../../../../../components/Modal.vue";
import { mdiArrowLeftCircle } from "@mdi/js";
import Icon from "../../../../../../components/Icon.vue";
import type { TSummaryInventory } from "../../interfaces/summary-inventory.type";

const appStore = useAppStore();
const inventoryStore = useReportInventoryStore();
const all_warehouses = ref(false);
const selectedWarehouse = ref<any>(null);
const inventory = ref<any[]>([]);
const summary = ref<TSummaryInventory>({
    warehouseName: "",
    inventoryStock: 0,
    averageInventoryCost: 0,
    inventoryCost: 0,
    inventoryPrice: 0,
    profit: 0,
});
const warehouses_array = ref<TOptionsType[]>([]);
const params = ref<boolean>(true);
const modal = ref<boolean>(false);
const selectedItem = ref<any>(null);

const searchSales = async () => {
  appStore.showLoadingScreen = true;
  const response = await inventoryStore.reportInventory(
    selectedWarehouse.value?.idalmacen ?? 0
  );
  inventory.value = response.data.list;
  summary.value = response.data.summary;
  console.log(response.data);
  params.value = false;
  appStore.showLoadingScreen = false;
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
  if (inventoryStore.page !== emmited.data.page) {
    inventoryStore.page = emmited.data.page;
    searchSales();
  }
};

const onBack = () => {
  params.value = true;
  selectedWarehouse.value = null;
  inventory.value = [];
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
  font-size: calc(20px * var(--item-title-font-size));
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
  width: 100%;
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
  /* background-color: green; */
}

.box-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* background-color: orange; */
}
.box-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* background-color: orange; */
}

.row-up {
  display: flex;
  gap: 10px;
  /* background-color: red; */
}
.row-down {
  display: flex;
  gap: 5px;
  /* background-color: blue; */
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
  width: 100%;
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

@media (min-width: 360px) {
  .font-size-title {
    --font-size: 1.1;
  }
  .back-button {
    --font-size: 1.2;
  }
}
@media (min-width: 768px) {
  .title-details {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
}
</style>
