<template>
  <div class="app-plain-background"></div>
  <div class="container">
    <div class="left-bar scrollable-y">
      <div class="helper-container corners spaces-padding container-background">
        <div class="font-montserrat-bold text-contrast">
          ¿Como hacer un reporte?
        </div>
        <ul class="text-contrast unordered-list">
          <li>Selecciona la fecha inicial</li>
          <li>Selecciona la fecha final</li>
          <li>
            Selecciona 1 almacen, o selecciona la casilla "todos los almacenes"
          </li>
          <li>Presiona el boton de buscar</li>
        </ul>
      </div>
      <div
        class="form-container corners spaces-padding container-background scrollable-y"
      >
        <div class="font-montserrat-bold text-contrast">
          Generar nuevo reporte
        </div>
        <fieldset class="input-field date-field">
          <legend>Fecha inicial</legend>
          <input type="date" v-model="rangeDates.init_date" class="text-contrast"/>
        </fieldset>
        <fieldset class="input-field date-field">
          <legend>Fecha final</legend>
          <input type="date" v-model="rangeDates.end_date" class="text-contrast"/>
        </fieldset>
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
              @checked-option="
                (meta) => {
                  selectedWarehouse = meta;
                }
              "
            />
          </CenterAndScroll>
        </div>
        <div class="flex flex-justify-center">
          <button class="form-button" @click="searchSales()">Buscar</button>
        </div>
      </div>
    </div>
    <div
      class="corners content spaces-padding container-background"
      v-if="params"
    >
      <div class="font-montserrat-bold text-contrast main-title">
        Reporte de ventas acumulado
      </div>
      <div class="beto-message-container">
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
              <div class="font-montserrat-bold text-contrast text-center">
                Bienvenido al reporte de ventas acumulado
              </div>
              <div class="font-montserrat-medium text-contrast text-center">
                Aqui podrás ver el resume de ventas por almacenes en un rango de
                fechas determinado
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
      <!-- <div v-if="sales.length == 0 &&params" class="font-montserrat-bold text-contrast main-title">
        Reporte de ventas acumulado <br />
        por almacenes
      </div> -->
    </div>
    <div class="result-container">
      <CenterAndScroll v-if="!params">
        <div class="table-container">
          <div class="font-montserrat-bold text-contrast main-title-table">
            Resultados
          </div>
          <table>
            <thead>
              <tr>
                <th class="text-center">Fecha</th>
                <th class="text-center">Id de almacén</th>
                <th class="text-center">Productos vendidos</th>
                <th class="text-center">Costo</th>
                <th class="text-center">Subtotal</th>
                <th class="text-center">IVA</th>
                <th class="text-center">Facturas</th>
                <th class="text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(sale, index) in sales" :key="index">
                <td class="text-center">
                  {{ formatDateWithHyphen(sale.fecha) }}
                </td>
                <td class="text-center">{{ sale.nomalmacen }}</td>
                <td class="text-center">{{ sale.prodvendid }}</td>
                <td class="text-center">
                  {{ numberToCurrency(sale.costoacum) }}
                </td>
                <td class="text-center">{{ numberToCurrency(sale.subtot) }}</td>
                <td class="text-center">{{ numberToCurrency(sale.ivaimp) }}</td>
                <td class="text-center">{{ sale.cantfact }}</td>
                <td class="text-center">{{ numberToCurrency(sale.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div align="center" class="pagination">
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
      </CenterAndScroll>
      <div class="summary" v-if="!params">
        <img :src="BetoImg" class="summary-beto" />
        <Card>
          <CardContent class="summary-content">
            <div class="summary-title font-montserrat-bold">
              Este es un resumen de tu búsqueda:
            </div>
            <div class="summary-item">
              <span>Total ventas</span>
              <span>{{ numberToCurrency(summary.totalSales) }}</span>
            </div>
            <div class="summary-item">
              <span>Total productos</span>
              <span>{{ summary.totalProducts }}</span>
            </div>
            <div class="summary-item">
              <span>Total facturas</span>
              <span>{{ summary.invoiceQuantity }}</span>
            </div>
            <div class="summary-item">
              <span>Costo</span>
              <span>{{ numberToCurrency(summary.totalCosts) }}</span>
            </div>
            <div class="summary-item">
              <span>Total ventas | devoluciones</span>
              <span>{{ numberToCurrency(summary.salesMinusReturns) }}</span>
            </div>
          </CardContent>
        </Card>
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
import type { TRangeSales } from "../../interfaces/range-sales.type";
import type { TSummaryRangeSales } from "../../interfaces/summary-range-sales.type";
import { useRangeSalesStore } from "../../store/range-sales.store";
import { formatDateWithHyphen } from "../../../../../../utils/parsers/parse-date";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import Card from "../../../daily-sales/components/Card.vue";
import CardContent from "../../../daily-sales/components/CardContent.vue";
import Paginator from "../../../../../../components/Paginator.vue";

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
let sales = ref<TRangeSales[]>([]);
let summary = ref<TSummaryRangeSales>({
  subtotal: 0,
  totalSales: 0,
  totalProducts: 0,
  invoiceQuantity: 0,
  totalTaxes: 0,
  totalCosts: 0,
  returns: 0,
  salesMinusReturns: 0,
  profit: 0,
});
let params = ref<boolean>(true);
const rangeSalesStore = useRangeSalesStore();
const rangeDates = ref({
  init_date: "",
  end_date: "",
});

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
  const parseInitialDate = rangeDates.value.init_date.replace(/-/g, "");
  const parseEndDate = rangeDates.value.end_date.replace(/-/g, "");
  const response = await rangeSalesStore.rangeSales(
    parseInitialDate,
    parseEndDate,
    selectedWarehouse.value?.idalmacen ?? 0
  );
  if (response.data.list.length === 0) {
    beto_state.value = BetoState.NOT_FOUND;
    params.value = true;
    sales.value = [];
    return;
  } else {
    sales.value = response.data.list;
    summary.value = response.data.summary;
    params.value = false;
  }
};

const onChangePage = (emmited: any) => {
  if (rangeSalesStore.page !== emmited.data.page) {
    rangeSalesStore.page = emmited.data.page;
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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.beto-message-wrapper {
  display: flex;
  gap: 40px;
  min-width: 300px;
  max-width: 500px;
  height: 300px;
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
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.helper-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.content {
  margin: 10px;
  margin-left: 5px;
}

.main-title {
  height: 30%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: end;
  margin-bottom: 50px;
}

.main-title-table {
  margin-bottom: 25px;
  font-size: 25px;
  display: flex;
  justify-content: start;
}

.spaces-padding {
  padding: 20px;
}

.table-container {
  padding: 25px;
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
}
</style>
