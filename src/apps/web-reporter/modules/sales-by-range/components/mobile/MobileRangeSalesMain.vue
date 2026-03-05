<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="sales-by-range-container">
      <div class="sales-by-range-title">
        <h3>Informe de <br />ventas acumulado</h3>
      </div>

      <div class="search-container">
        <div class="date-field">
          <label for="fecha">Fecha de inicio</label>
          <input
            v-model="rangeDates.init_date"
            type="date"
            id="fecha"
            required
            class="form-input size-input"
          />
        </div>
        <div class="date-field">
          <label for="fecha">Fecha de fin</label>
          <input
            v-model="rangeDates.end_date"
            type="date"
            id="fecha"
            required
            class="form-input size-input"
          />
        </div>
      </div>
      <div class="warehouses-container scrollable-y" v-if="params">
        <span class="font-montserrat-bold text-contrast"
          >Seleccione uno o varios almacenes</span
        >
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
          <button class="form-button-2" @click="searchSales()">Buscar</button>
        </div>
      </div>
      <div v-if="sales.length > 0" class="scrollable-y card-container">
        <Card class="text-contrast">
          <CardContent>
            <div class="text-container">
              <span class="title">Resumen</span>
              <div class="item">
                <span class="font-montserrat-bold">Almacenes</span>
                <div @click="openModalWarehouses()">
                  <span class="clickable color-link"> Ver mas </span>
                </div>
              </div>
              <hr />
              <div class="item">
                <span class="font-montserrat-bold">Subtotal</span>
                <span>{{ numberToCurrency(summary?.subtotal) }}</span>
              </div>
              <hr />
              <div class="item">
                <span class="font-montserrat-bold">IVA</span>
                <span>{{ numberToCurrency(summary?.totalTaxes) }}</span>
              </div>
              <hr />
              <div class="item">
                <span class="font-montserrat-bold">Total en ventas</span>
                <span>{{ numberToCurrency(summary.totalSales) }}</span>
              </div>
              <hr />
              <div class="item">
                <span class="font-montserrat-bold">Total en devoluciones</span>
                <span>{{ numberToCurrency(summary.returns) }}</span>
              </div>
              <hr />
              <div class="item">
                <span class="font-montserrat-bold"
                  >Total ventas | <br />devoluciones</span
                >
                <span>{{ numberToCurrency(summary.salesMinusReturns) }}</span>
              </div>
              <hr />
              <div class="item">
                <span class="font-montserrat-bold">Total costos</span>
                <span>{{ numberToCurrency(summary.totalCosts) }}</span>
              </div>
              <hr />
              <div class="item">
                <span class="font-montserrat-bold">Utilidad</span>
                <span>como saco la utilidad</span>
              </div>
              <hr />
              <div class="item">
                <span class="font-montserrat-bold">Productos vendidos</span>
                <span>{{ summary.totalProducts }}</span>
              </div>
              <hr />
              <div class="item">
                <span class="font-montserrat-bold">Total facturas</span>
                <span>{{ summary.invoiceQuantity }}</span>
              </div>
              <hr />
            </div>
          </CardContent>
        </Card>
        <Card v-for="(item, index) in sales" :key="index">
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
              <button class="form-button-2" @click="openModalDetails(item)">
                Detalles
              </button>
              <button class="form-button-2" @click="">Ver facturas</button>
            </div>
          </CardContent>
        </Card>
        <div align="center">
          <Paginator
            v-if="rangeSalesStore.itemsCount > rangeSalesStore.limit"
            :key="rangeSalesStore.page"
            :items-per-page="rangeSalesStore.limit"
            :max-buttons="4"
            :total-pages="rangeSalesStore.totalPages"
            :current-page="rangeSalesStore.page"
            @on-change-page="onChangePage"
          />
        </div>
      </div>
      <div v-if="sales.length == 0 && !params">
        <div class="beto-message-container-2">
          <img
            class="beto-avatar-2"
            src="../../../../../../assets/avatars/beto-sad.png"
          />
          <div class="bubble bubble-a bubble-up">
            <h3 class="web-reporter-title text-contrast">UPS!</h3>
            <span
              >No se encontraron <br />
              ventas en esa fecha <br />
              ¡Intenta con otra!</span
            >
            <div align="center">
              <button class="form-button-2" @click="onBack()">Regresar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="help-beto clickable"
      @click="clickOpenModal()"
      v-if="sales.length == 0"
    >
      <img :src="BetoAvatar" alt="" class="size-img" />
    </div>
  </div>
  <Modal :openModal="openModal" @close-modal="closeModal()" width="80vw">
    <div class="modal-container">
      <div class="beto-message-container">
        <img
          class="beto-avatar"
          src="../../../../../../assets/avatars/beto.svg"
        />
        <div class="bubble bubble-a bubble-left">
          <span>Bienvenido al</span>
          <span class="font-montserrat-bold text-contrast"
            >Reporte de ventas acumulado</span
          >
        </div>
      </div>

      <div class="steps">
        <span class="title"> Para hacer una búsqueda deberás: </span>
        <ul class="text-contrast unordered-list">
          <li>Selecciona la fecha inicial</li>
          <li>Selecciona la fecha final</li>
          <li>Selecciona uno o varios almacenes"</li>
          <li>Presiona el boton de buscar</li>
        </ul>
      </div>
      <div class="button">
        <button class="form-button-2" @click="closeModal">Salir</button>
      </div>
    </div>
  </Modal>
  <Modal
    :openModal="modalDetails"
    @close-modal="closeModalDetails()"
    width="80vw"
  >
    <div class="modal-container-2">
      <div class="text-container">
        <span class="title"
          >Detalle de ventas: {{ selectedItem.nomalmacen }}</span
        >
        <div class="item">
          <span class="font-montserrat-bold">Fecha</span>
          <span>{{ formatDateWithHyphen(selectedItem.fecha) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Productos vendidos</span>
          <span>{{ selectedItem.prodvendid }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Costo</span>
          <span>{{ numberToCurrency(selectedItem.costoacum) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Subtotal</span>
          <span>{{ numberToCurrency(selectedItem.subtot) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">IVA</span>
          <span>{{ numberToCurrency(selectedItem.ivaimp) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Total</span>
          <span>{{ numberToCurrency(selectedItem.total) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Facturas</span>
          <span>{{ selectedItem.cantfact }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Otros impuestos</span>
          <span>{{ numberToCurrency(selectedItem.otrosimpuestos) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Total ventas | devoluciones</span>
          <span>{{ numberToCurrency(selectedItem.totalconprop) }}</span>
        </div>
        <hr />
        <div class="item">
          <span class="font-montserrat-bold">Utilidad</span>
          <span>donde esta la utilidad</span>
        </div>
        <hr />
        <div class="button-leave">
          <button class="form-button-2" @click="closeModalDetails()">
            Salir
          </button>
        </div>
      </div>
    </div>
  </Modal>
  <Modal
    :openModal="modalWarehouses"
    @close-modal="closeModalWarehouses()"
    width="80vw"
  >
    <div class="modal-container">
      <div class="text-container">
        <span class="font-montserrat-bold">Almacenes</span>
        <div>
          <ul class="text-contrast unordered-list">
            <li v-for="warehouse in warehouses_array" :key="warehouse.title">
              <span>{{ warehouse.title }}</span>
            </li>
          </ul>
        </div>

        <div class="button-leave">
          <button class="form-button-2" @click="closeModalWarehouses()">
            Salir
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import type { TOptionsType } from "../../../../../../components/radio-label/RadioLabels.vue";
import { useAppStore } from "../../../../../../store/app.store";
import RadioLabels from "../../../../../../components/radio-label/RadioLabels.vue";
import BetoAvatar from "../../../../../../assets/avatars/beto.svg";
import Modal from "../../../../../../components/Modal.vue";
import { useRangeSalesStore } from "../../store/range-sales.store";
import type { TRangeSales } from "../../interfaces/range-sales.type";
import Card from "../../../daily-sales/components/Card.vue";
import CardContent from "../../../daily-sales/components/CardContent.vue";
import type { TSummaryRangeSales } from "../../interfaces/summary-range-sales.type";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import Paginator from "../../../../../../components/Paginator.vue";
import { formatDateWithHyphen } from "../../../../../../utils/parsers/parse-date";
// import { useRouter } from "vue-router";
let warehouses_array = ref<TOptionsType[]>([]);
let all_warehouses = ref<boolean>(false);
let openModal = ref<boolean>(false);
let modalDetails = ref<boolean>(false);
let modalWarehouses = ref<boolean>(false);
let selectedWarehouse = ref<any>(null);
let sales = ref<TRangeSales[]>([]);
// const router = useRouter()
let summary = ref<TSummaryRangeSales>({
  subtotal: 0,
  totalSales: 0,
  totalProducts: 0,
  invoiceQuantity: 0,
  totalTaxes: 0,
  totalCosts: 0,
  returns: 0,
  salesMinusReturns: 0,
});
let params = ref<boolean>(true);
const rangeSalesStore = useRangeSalesStore();
const rangeDates = ref({
  init_date: "",
  end_date: "",
});

const appStore = useAppStore();

const clickOpenModal = () => {
  return (openModal.value = true);
};

const closeModal = () => {
  return (openModal.value = false);
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

const searchSales = async () => {
  const parseInitialDate = rangeDates.value.init_date.replace(/-/g, "");
  const parseEndDate = rangeDates.value.end_date.replace(/-/g, "");
  const response = await rangeSalesStore.rangeSales(
    parseInitialDate,
    parseEndDate,
    selectedWarehouse.value?.idalmacen ?? 0
  );
  console.log(selectedWarehouse.value);
  console.log(response);
  sales.value = response.data.list;
  summary.value = response.data.summary;
  params.value = false;
  console.log(summary.value);
};

const onChangePage = (emmited: any) => {
  if (rangeSalesStore.page !== emmited.data.page) {
    rangeSalesStore.page = emmited.data.page;
    searchSales();
  }
};

const onBack = () => {
  params.value = true;
  rangeDates.value = {
    init_date: "",
    end_date: "",
  };
  selectedWarehouse.value = null;
};

const selectedItem = ref<TRangeSales>({} as TRangeSales);
const openModalDetails = (item: TRangeSales) => {
  selectedItem.value = item;
  modalDetails.value = true;
  console.log(selectedItem.value);
};

const closeModalDetails = () => {
  return (modalDetails.value = false);
};

const openModalWarehouses = () => {
  return (modalWarehouses.value = true);
};

const closeModalWarehouses = () => {
  return (modalWarehouses.value = false);
};
onMounted(async () => {
  loadWarehouses();
});
</script>

<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";
@import "../../../../../../utils/css/dialog-bubble.css";

:global(:root) {
  --avatar-size: 1;
  --font-size: 1;
}
.container {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
}

.sales-by-range-container {
  width: 87%;
  height: 92%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sales-by-range-title {
  text-align: center;
  color: var(--color-contrast);
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.size-input {
  width: 100%;
}

.warehouses-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.help-beto {
  display: flex;
  justify-content: center;
  position: absolute;
  background-color: var(--color-contrast);
  width: 18%;
  border-radius: 100%;
  right: 10px;
  bottom: 45px;
}

.help-beto::after {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: -9px;
  content: "?";
  font-size: 17px;
  font-weight: bold;
  color: var(--color-accent);
  width: 38%;
  border-radius: 100%;
  background-color: var(--color-contrast);
}

.size-img {
  width: 41px;
  transform: scaleX(-1);
}

.modal-container {
  padding-top: 15px;
  padding-bottom: 10px;
}

.modal-container-2 {
  padding: 10px;
  padding-bottom: 2px;
}

.steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  gap: 5px;
}

.title {
  font-size: calc(16px * var(--font-size-title));
  font-weight: bold;
  padding-bottom: 5px;
}

.warehouse {
  font-size: 18px;
  font-weight: 800;
}

li {
  font-size: 14px;
}
.beto-message-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.beto-message-container-2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.beto-avatar {
  width: calc(25vw * var(--avatar-size));
}
.beto-avatar-2 {
  width: calc(25vw * var(--avatar-size));
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

  line-height: calc(24px * var(--line-height-proportion));
  text-align: center;
}

.bubble-a.bubble:not(:first-child) {
  --line-height-proportion: 1;
  --font-size-proportion: 1;
  --border: 1px;
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: 1;
  --triangle-x: 50px;

  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size-proportion));

  line-height: calc(24px * var(--line-height-proportion));
  text-align: center;
}

.button {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 5px;
}

.button-leave {
  display: flex;
  justify-content: end;
  width: 100%;
  padding-top: 5px;
}

.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 15px;
}

.text-container {
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item {
  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size));
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
  padding-top: 10px;
  display: flex;
  justify-content: space-evenly;
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

.color-link {
  color: var(--color-accent);
  text-decoration: underline;
}
@media (min-width: 360px) {
  .help-beto {
    width: 22%;
    bottom: 60px;
  }
  .help-beto::after {
    width: 35%;
    font-size: 25px;
    left: -12px;
  }
  .size-img {
    width: 60px;
  }
}
@media (min-width: 414px) {
  .help-beto {
    width: 20%;
    right: 15px;
  }
  .help-beto::after {
    width: 35%;
    font-size: 25px;
    left: -12px;
  }
  .size-img {
    width: 60px;
  }
}

@media (min-width: 768px) {
  .help-beto {
    width: 14%;
  }
  .help-beto::after {
    width: 35%;
    font-size: 30px;
    left: -12px;
  }
  .size-img {
    width: 80px;
  }

  .beto-avatar {
    --avatar-size: 0.7;
  }
  .steps {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  .title {
    font-size: 20px;
  }
  li {
    font-size: 16px;
  }
}
</style>
