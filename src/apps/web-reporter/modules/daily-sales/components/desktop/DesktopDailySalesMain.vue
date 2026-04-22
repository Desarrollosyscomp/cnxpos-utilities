<template>
  <div class="app-plain-background"></div>
  <div class="container layout-container">
    <!-- <div class="beto-message" v-if="page_state === PageState.BETO_MESSAGE">
      <div class="beto-message-content">
        <img
          :src="beto_state === BetoState.WELCOME ? BetoImg : BetoSad"
          class="beto"
        />
        <div class="bubble bubble-a bubble-left">
          <div v-if="beto_state === BetoState.WELCOME">
            <span class="p-1">Este es el</span>
            <span class="p-2 font-montserrat-black"
              >Informe de ventas por día</span
            >
            <span class="p-3">Selecciona una fecha para ver los datos</span>
          </div>
          <div v-else>
            <span class="p-1">Ups!</span>
            <span class="p-2 font-montserrat-black"
              >No se encontraron datos en esta fecha</span
            >
            <span class="p-3">Intenta con otra</span>
          </div>
        </div>
      </div>
      <div class="search date-field">
        <label for="fecha">Consultar fecha</label>
        <input type="date" class="form-input searcher-input" v-model="date" />
      </div>
    </div> -->
    <div class="daily-sales-container">
      <div class="search">
        <span class="font-montserrat-bold text-contrast page-title"
          >Informe de ventas por día</span
        >
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
      <div class="data date-field">
        <CenterAndScroll>
          <div class="table-container" v-if="warehousesArray.length > 0">
            <table class="custom-table-one">
              <thead>
                <tr>
                  <th class="text-left">Fecha</th>
                  <th class="text-center">Nombre almacén</th>
                  <th class="text-center">Subtotal</th>
                  <th class="text-center">Total</th>
                  <th class="text-center">Facturas</th>
                  <th class="text-center">Productos vendidos</th>
                  <th class="text-right">Costo</th>
                </tr>
              </thead>
              <tbody class="clickable">
                <tr v-for="sale in warehousesArray" @click="openModal(sale)">
                  <td class="text-left">
                    {{ formatDateWithHyphen(sale.fecha) }}
                  </td>
                  <td class="text-center">{{ sale.nomalmacen }}</td>
                  <td class="text-center">
                    {{ numberToCurrency(sale.subtot) }}
                  </td>
                  <td class="text-center">
                    {{ numberToCurrency(sale.total) }}
                  </td>
                  <td class="text-center">{{ sale.cantfact }}</td>
                  <td class="text-center">{{ sale.prodvendid }}</td>
                  <td class="text-center">
                    {{ numberToCurrency(sale.costoacum) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CenterAndScroll>
        <div
          class="summary"
          :class="{ 'summary-not-found': warehousesArray.length === 0 }"
        >
          <img
            :src="BetoImg"
            class="summary-beto"
            v-if="warehousesArray.length > 0"
          />
          <img
            :src="beto_state === BetoState.WELCOME ? BetoImg : BetoSad"
            :class="
              beto_state === BetoState.WELCOME
                ? 'summary-beto-welcome'
                : 'summary-beto-sad'
            "
            v-else
          />
          <Card>
            <CardContent
              class="summary-content"
              v-if="warehousesArray.length > 0"
            >
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
                <span>{{ summary.totalInvoices }}</span>
              </div>
              <div class="summary-item">
                <span>Costo</span>
                <span>{{ numberToCurrency(summary.totalCost) }}</span>
              </div>
              <div class="summary-item">
                <span>Utilidad</span>
                <span>{{ numberToCurrency(summary.totalProfit) }}</span>
              </div>
            </CardContent>
            <CardContent
              class="summary-content"
              v-else-if="beto_state === BetoState.WELCOME"
            >
              <div class="welcome-title font-montserrat-medium">
                <p>Bienvenido al modulo</p>
                <p>de ventas diarias</p>
                <p>selecciona una fecha</p>
                <p>para consultar el informe</p>
                <p class="font-montserrat-bold">de ventas diarias</p>
              </div>
            </CardContent>
            <CardContent
              class="summary-content"
              v-if="beto_state === BetoState.NOT_FOUND"
            >
              <div class="not-found-title font-montserrat-medium">
                <p>No se encontraron datos</p>
                <p>en esta fecha por favor</p>
                <p>intenta con otra</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Modal :open-modal="open_modal" @close-modal="closeModal" min-height="60vh">
      <div class="modal-wrapper">
        <div class="modal-header">
          <span class="font-montserrat-bold text-contrast modal-title"
            >Detalles del almacén {{ warehouse_name }}</span
          >
        </div>
        <div class="modal-content-wrapper">
          <div class="modal-content">
            <div class="invoices-list">
              <div
                class="font-montserrat-bold text-contrast text-center table-title"
              >
                Facturas del dia {{ formatDateWithHyphen(sale_date) }}
              </div>
              <table class="custom-table-one">
                <thead>
                  <tr>
                    <th class="text-center">Fecha</th>
                    <th class="text-center">Subtotal</th>
                    <th class="text-center">Impuesto</th>
                    <th class="text-center">Valor total</th>
                  </tr>
                </thead>
                <tbody class="clickable">
                  <tr
                    v-for="invoice in invoicesArray"
                    @click="
                      loadInvoiceDetails(
                        invoice.idalmacen.toString(),
                        invoice.numero.toString()
                      )
                    "
                  >
                    <td class="text-center">
                      {{ formatDateWithHyphen(invoice.fecha) }}
                    </td>
                    <td class="text-center">
                      {{ numberToCurrency(invoice.subtotal) }}
                    </td>
                    <td class="text-center">
                      {{ numberToCurrency(invoice.valimpuesto) }}
                    </td>
                    <td class="text-center">
                      {{ numberToCurrency(invoice.valortotal) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div align="center" class="pagination">
                <Paginator
                  v-if="dailySalesStore.itemsCount > dailySalesStore.limit"
                  :key="dailySalesStore.page"
                  :items-per-page="dailySalesStore.limit"
                  :max-buttons="4"
                  :total-pages="dailySalesStore.totalPages"
                  :current-page="dailySalesStore.page"
                  @on-change-page="onChangePage"
                />
              </div>
            </div>
            <div class="invoices-details">
              <div
                v-if="
                  invoice_details_state === InvoiceDetailsState.NOT_SELECTED
                "
                class="text-contrast font-montserrat-bold text-center"
              >
                Haz click sobre una factura para ver más detalles
              </div>

              <div class="w-100" v-else>
                <div
                  class="text-contrast font-montserrat-bold text-center table-title"
                >
                  Detalles de la factura #{{ invoice_id }}
                </div>
                <table class="custom-table-one">
                  <thead>
                    <tr>
                      <th class="text-center">Producto</th>
                      <th class="text-center">Valor</th>
                      <th class="text-center">Descuento</th>
                      <th class="text-center">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="invoice in invoiceDetailsArray">
                      <td class="text-center">{{ invoice.descripcion }}</td>

                      <td class="text-center">
                        {{ numberToCurrency(invoice.valorprod) }}
                      </td>
                      <td class="text-center">
                        {{ numberToCurrency(invoice.descuento) }}
                      </td>
                      <td class="text-center">{{ invoice.cantidad }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="form-button" @click="closeModal">Cerrar</button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import BetoImg from "../../../../../../assets/avatars/beto.svg";
import BetoSad from "../../../../../../assets/avatars/beto-sad.png";

import { onMounted, ref, watch } from "vue-demi";
//@ts-ignore
import Card from "../Card.vue";
//@ts-ignore
import CardContent from "../CardContent.vue";
//@ts-ignore
import Modal from "../../../../../../components/Modal.vue";

import { useDailySalesStore } from "../../store/daily-sales.store";
import type { TWarehouseDaySale } from "../../interfaces/warehouse-day-sales.type";
import type { TWarehouseDayInvoice } from "../../interfaces/warehouse-day-invoice.type";
import type { TWarehouseDayInvoiceDetail } from "../../interfaces/warehouse-day-invoice-detail.type";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import type { TSummary } from "../../interfaces/summary-daily-sales.type";
import { formatDateWithHyphen } from "../../../../../../utils/parsers/parse-date";
import Paginator from "../../../../../../components/Paginator.vue";
import { useAppStore } from "../../../../../../store/app.store";

const dailySalesStore = useDailySalesStore();
const appStore = useAppStore();

let open_modal = ref(false);
let date = ref("");

enum BetoState {
  WELCOME = 0,
  NOT_FOUND = 1,
}

enum InvoiceDetailsState {
  SELECTED = 0,
  NOT_SELECTED = 1,
}

let beto_state = ref(BetoState.WELCOME);
let invoice_details_state = ref(InvoiceDetailsState.NOT_SELECTED);

const warehousesArray = ref<TWarehouseDaySale[]>([]);
const summary = ref<TSummary>({
  totalSales: 0,
  totalProducts: 0,
  totalInvoices: 0,
  totalCost: 0,
  totalProfit: 0,
});
const loadDailySales = async () => {
  const sendDateParsed = date.value.replace(/-/g, "");
  let response = await dailySalesStore.dailySales(sendDateParsed);
  if (response.error == true) {
    beto_state.value = BetoState.NOT_FOUND;
    warehousesArray.value = [];
    return;
  }
  beto_state.value = BetoState.WELCOME;
  warehousesArray.value = response.data.sales;
  summary.value = response.data.summary;
};

watch(date, () => {
  appStore.afterLoading(loadDailySales);
});

const invoicesArray = ref<TWarehouseDayInvoice[]>([]);
const loadInvoices = async (date: string, warehouse_id: string) => {
  appStore.showLoadingScreen = true;
  let response = await dailySalesStore.dailyInvoices(date, warehouse_id);
  invoicesArray.value = response.data.list;
  appStore.showLoadingScreen = false;
};
const invoiceDetailsArray = ref<TWarehouseDayInvoiceDetail[]>([]);
const invoice_id = ref<string>("");
const loadInvoiceDetails = async (
  warehouse_id: string,
  _invoice_id: string
) => {
  invoice_details_state.value = InvoiceDetailsState.SELECTED;
  let response = await dailySalesStore.dailyInvoiceDetails(
    warehouse_id,
    _invoice_id
  );
  invoice_id.value = _invoice_id;
  invoiceDetailsArray.value = response.data.daily_invoice_details;
};

const sale_date = ref<string>("");
let warehouse_name = ref<string>("");
const openModal = (sale: TWarehouseDaySale) => {
  open_modal.value = true;
  sale_date.value = sale.fecha;
  warehouse_name.value = sale.nomalmacen;
  loadInvoices(sale.fecha, sale.idalmacen.toString());
};

const closeModal = () => {
  open_modal.value = false;
  sale_date.value = "";
  invoice_id.value = "";
  invoice_details_state.value = InvoiceDetailsState.NOT_SELECTED;
  invoicesArray.value = [];
  invoiceDetailsArray.value = [];
};

const onChangePage = (emmited: any) => {
  if (dailySalesStore.page !== emmited.data.page) {
    dailySalesStore.page = emmited.data.page;
    appStore.afterLoading(async () => {
      await loadInvoices(
        sale_date.value,
        warehousesArray?.value[0]?.idalmacen?.toString() || ""
      );
    });
  }
};

onMounted(() => {
  // loadDailySales();
});
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";
@import "../../../../../../utils/css/dialog-bubble.css";
@import "../../../../../../styles/style.css";

:global(:root) {
  --message-proportion: 1;
  --font-size-title: 1;
}

.container {
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.daily-sales-container {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-height: 100%;
  height: 80%;
}
.search {
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.data {
  border-radius: 5px;
  background-color: var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 90%;
}

.page-title {
  font-size: calc(17px * var(--font-size-title));
}
.searcher-input {
  width: 25%;
  height: 20px;
}

.beto-message {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.beto-message-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.beto {
  width: calc(12rem * var(--message-proportion));
}

.bubble {
  --border-radius-proportion: calc(1 * var(--message-proportion));
  --border: calc(2px * var(--message-proportion));
  --background: var(--color-primary-light);
  --border-color: var(--color-contrast);
  --triangle-size: calc(1.5 * var(--message-proportion));
  --triangle-y: calc(90px * var(--message-proportion));
  width: calc(18rem * var(--message-proportion));
  height: calc(50%);
  color: var(--color-contrast);
  padding: calc(1rem * var(--message-proportion));
  padding-top: calc(2rem * var(--message-proportion));
  padding-bottom: calc(2rem * var(--message-proportion));
}

.bubble div {
  text-align: center;
  line-height: calc(2rem * var(--message-proportion));
  display: flex;
  flex-direction: column;
}

.p-1 {
  font-size: calc(1.4rem * var(--message-proportion));
}

.p-2 {
  font-size: calc(1.6rem * var(--message-proportion));
}

.p-3 {
  font-size: calc(1.4rem * var(--message-proportion));
}

.table-container {
  padding: 10px;
}

.summary {
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.summary-not-found {
  padding-bottom: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
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
.not-found-title {
  text-align: center;
  font-size: calc(1rem * var(--message-proportion));
}
.welcome-title {
  text-align: center;
  font-size: calc(0.9rem * var(--message-proportion));
}

.summary-item > :nth-child(1) {
  font-size: calc(0.9rem * var(--message-proportion));
  font-weight: bold;
}
.summary-item > :nth-child(2) {
  font-size: calc(0.9rem * var(--message-proportion));
}

.modal-wrapper {
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.modal-content-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-header {
  display: flex;
  padding-top: 10px;
  justify-content: center;
}
.modal-title {
  font-size: 20px;
}
.modal-content {
  width: 90vw;
  display: flex;
  justify-content: start;
}

.modal-footer {
  display: flex;
  justify-content: end;
}

.invoices-list {
  flex: 1;
  padding: 10px;
}

.table-title {
  font-size: 18px;
  margin-bottom: 1rem;
}

.invoices-details {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.summary-beto {
  width: calc(130px * var(--message-proportion));
}
.summary-beto-welcome {
  width: calc(160px * var(--message-proportion));
}
.summary-beto-sad {
  width: calc(160px * var(--message-proportion));
  transform: scaleX(-1);
}
.pagination {
  margin-top: 1rem;
}

.size-input {
  width: 100%;
}

label {
  background-color: var(--color-primary-dark-2) !important;
}

@media (min-width: 1920px) {
  :global(:root) {
    --message-proportion: 1.3;
  }
}

@media (min-width: 2560px) {
  :global(:root) {
    --message-proportion: 1.8;
  }

  .searcher-input {
    height: 40px;
    font-size: 20px;
  }
}
</style>
