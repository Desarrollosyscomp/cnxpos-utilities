<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="invoice-container">
      <div
        class="back-button clickable"
        @click="router.push('/web-report-v2/daily-sales')"
      >
        <Icon :path="mdiArrowLeftCircle" class="back-icon" />
        <span>Informe de ventas por día</span>
      </div>
      <div class="invoice-title">
        <h3>Facturas del día</h3>
        <span class="font-montserrat-bold">{{ warehouseName }}</span>
      </div>
      <!-- <div class="beto-message-container">
        <img
          class="beto-avatar"
          src="../../../../../../assets/avatars/beto.svg"
        />
        <div class="bubble bubble-a bubble-left">
          <p>
            Para el dia
            <span class="font-montserrat-semibold">{{
              formatDateWithHyphen(route.params.date as string)
            }}</span>
            tuviste un subtotal de ventas de
            <span class="font-montserrat-semibold">{{
              numberToCurrency(summary.subtotal)
            }}</span>
            un total de
            <span class="font-montserrat-semibold">impuestos</span> de
            <span class="font-montserrat-semibold">{{
              numberToCurrency(summary.totalTaxes)
            }}</span>
            para un total de
            <span class="font-montserrat-semibold"
              >{{ numberToCurrency(summary.totalSales) }}
            </span>
            para ver los metodos de pago click
            <span class="font-montserrat-semibold clickable">AQUI</span>
          </p>
        </div>
      </div> -->
      <div class="search-container">
        <div class="date-field">
          <input placeholder="Buscar" class="form-input size-input" />
        </div>
      </div>
      <div class="daily-sales-container">
        <div class="cards-container">
          <Card dark>
            <CardContent>
              <span class="font-montserrat-bold color-contrast">Resumen</span>
              <div class="text-container-summary">
                <div class="item-primary">
                  <span class="item-bold">Fecha</span>
                  <span>{{
                    formatDateWithHyphen(route.params.date as string)
                  }}</span>
                </div>
                <hr />
                <div class="item-primary">
                  <span class="item-bold">Subtotal</span>
                  <span>{{ numberToCurrency(summary.subtotal) }}</span>
                </div>
                <hr />
                <div class="item-primary">
                  <span class="item-bold">Impuestos</span>
                  <span>{{ numberToCurrency(summary.totalTaxes) }}</span>
                </div>
                <hr />
                <div class="item-primary">
                  <span class="item-bold">Total</span>
                  <span>{{ numberToCurrency(summary.totalSales) }}</span>
                </div>
                <hr />
                <div class="item-primary">
                  <span class="item-bold">Métodos de pago</span>
                  <span
                    class="clickable color-button-link"
                    @click="openModalPaymentMethods()"
                    >Ver más</span
                  >
                </div>
                <hr />
              </div>
            </CardContent>
          </Card>
          <Card v-for="(invoice, index) in invoices" :key="index">
            <CardContent>
              <div class="text-container">
                <span>Factura #{{ invoice.idfactura }}</span>
                <div class="item">
                  <span class="item-bold">Fecha</span>
                  <span>{{ formatDateWithHyphen(invoice.fecha) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Subtotal</span>
                  <span> {{ numberToCurrency(invoice.subtotal) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Impuesto</span>
                  <span>{{ numberToCurrency(invoice.valimpuesto) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Valor Total</span>
                  <span>{{ numberToCurrency(invoice.valortotal) }}</span>
                </div>
                <hr />
                <div class="buttons">
                  <button
                    class="form-button-2 color-button-2"
                    @click="
                      router.push(
                        `/web-report-v2/invoice-details/${invoice.idalmacen}/${invoice.numero}`
                      )
                    "
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div align="center">
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
      </div>
    </div>
  </div>
  <Modal :openModal="openModal" @closeModal="closeModal()" width="80vw">
    <div class="modal-container">
      <h3>Resumen de pagos</h3>
      <div
        v-for="paymentMethod in summary.paymentMethods"
        :key="paymentMethod.payment_id"
      >
        <div class="item-payment">
          <span class="font-montserrat-bold">{{ paymentMethod.payment_name }}</span>
          <span>{{ numberToCurrency(paymentMethod.payment_total) }}</span>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="form-button-2" @click="closeModal()">Salir</button>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue-demi";
//@ts-ignore
import Card from "../Card.vue";
//@ts-ignore
import CardContent from "../CardContent.vue";
import { useRouter, useRoute } from "vue-router";
import type { TWarehouseDayInvoice } from "../../interfaces/warehouse-day-invoice.type";
import { useDailySalesStore } from "../../store/daily-sales.store";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import { mdiArrowLeftCircle } from "@mdi/js";
import Paginator from "../../../../../../components/Paginator.vue";
import Icon from "../../../../../../components/Icon.vue";
import { formatDateWithHyphen } from "../../../../../../utils/parsers/parse-date";
import type { TSummaryInvoices } from "../../interfaces/summary-daily-sales.type";
import Modal from "../../../../../../components/Modal.vue";
import { useAppStore } from "../../../../../../store/app.store";
const appStore = useAppStore();
const router = useRouter();
const route = useRoute();
let invoices = ref<TWarehouseDayInvoice[]>([]);
let summary = ref<TSummaryInvoices>({
  subtotal: 0,
  totalTaxes: 0,
  totalSales: 0,
  paymentMethods: [],
});
const warehouseName = ref<string | undefined>("");
const dailySalesStore = useDailySalesStore();
const openModal = ref<boolean>(false);
const setInvoices = async () => {
  let { date, warehouse_id } = route.params;
  let response = await dailySalesStore.dailyInvoices(
    date as string,
    warehouse_id as string
  );
  invoices.value = response.data.list;
  summary.value = response.data.summary;
  warehouseName.value = invoices.value[0]?.nomalmacen;
  console.log(invoices.value);
};

const onChangePage = (emmited: any) => {
  if (dailySalesStore.page !== emmited.data.page) {
    dailySalesStore.page = emmited.data.page;
    setInvoices();
  }
};

const openModalPaymentMethods = () => {
  openModal.value = true;
};

const closeModal = () => {
  openModal.value = false;
};

onMounted(() => {
  appStore.afterLoading(setInvoices);
});
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../utils/css/dialog-bubble.css";
@import "../../../../../../styles/forms.css";
@import "../../../../../../styles/style.css";
:global(:root) {
  --width-search-container: 1;
  --font-size-title: 1;
  --padding-bottom-search: 1;
  --gap-size: 1;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
}
.invoice-container {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.invoice-title {
  color: var(--color-contrast);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.beto-message-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.beto-avatar {
  width: 25vw;
}

.bubble-a.bubble {
  --line-height-proportion: 1;
  --font-size-proportion: 1;
  --border: 1px;
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: 1;
  --triangle-y: 40%;

  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size-proportion));

  line-height: calc(15px * var(--line-height-proportion));
  text-align: center;
}

.bubble > :nth-child(1) {
  font-weight: 300;
  font-size: calc(14px * var(--font-size-proportion));
}

.search-container {
  padding-bottom: calc(5px * var(--padding-bottom-search));
  width: 90%;
}
.size-input {
  width: 100%;
}
.daily-sales-container {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.cards-container {
  color: var(--color-primary);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(10px * var(--gap-size));
  overflow-y: scroll;
}

.cards-container > .card:nth-child(2) {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  [data-theme="dark"] & {
    color: var(--color-contrast);
    background-color: var(--color-primary-light);
  }
}

.item {
  color: var(--color-contrast);
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}
.item-bold {
  font-weight: bold;
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
.item-3-bold {
  font-weight: bold;
}

.text-container {
  text-align: start;
  font-weight: bold;
  color: var(--color-contrast);
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.test-card {
  background-color: var(--color-contrast);
}

.text-align-start {
  text-align: start;
  color: var(--color-contrast);
  font-weight: bold;
}

.color-button-2 {
  border-color: var(--color-contrast) !important;
  color: var(--color-contrast) !important;
  margin-top: 10px;
}

.button-modal {
  background-color: red;
}
.back-button {
  color: var(--color-contrast);
  width: 100%;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
}
.back-icon {
  fill: var(--color-contrast);
  width: 20px;
}
.text-container-summary {
  text-align: start;
  font-weight: bold;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-primary {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}
.modal-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-payment {
  color: var(--color-contrast);
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}

.item-payment span:first-child {
  display: flex;
  align-items: center;
  flex: 1;
}

.item-payment span:first-child::after {
  content: "";
  border-bottom: 2px dotted var(--color-contrast);
  flex: 1;
  margin: 0 3px;
}

.item-payment span:last-child {
  white-space: nowrap;
}

.color-button-link {
  color: var(--color-accent);
}
@media (min-width: 360px) {
  .invoice-title h3 {
    font-size: calc(25px * var(--font-size-title));
  }
  .invoice-title span {
    font-size: calc(18px * var(--font-size-title));
  }
  .cards-container {
    --gap-size: 1.5;
  }
}
@media (min-width: 360px) {
  @media (min-height: 800px) {
    .search-container {
      --padding-top: 1;
    }
  }
}
@media (min-width: 768px) {
  .invoice-title h3 {
    --font-size-title: 1.8;
  }
  .invoice-title span {
    --font-size-title: 1.5;
  }
  .search-container {
    --padding-bottom-search: 1.5;
  }
  .cards-container {
    --gap-size: 1.8;
  }
}
</style>
