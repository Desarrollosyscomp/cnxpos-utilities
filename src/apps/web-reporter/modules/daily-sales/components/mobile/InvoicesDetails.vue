<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="invoice-container">
      <div class="back-button clickable" @click="router.back()">
        <Icon :path="mdiArrowLeftCircle" class="back-icon" />
        <span>Facturas del día</span>
      </div>
      <div class="invoice-title">
        <h3>
          Detalles de la factura <br />
          #{{ route.params.invoice_id }}
        </h3>
      </div>
      <div class="daily-sales-container">
        <div class="cards-container">
          <Card dark>
            <CardContent>
              <div class="text-container">
                <span>Detalle de valores</span>
                <div class="item">
                  <span class="item-bold">Subtotal</span>
                  <span>{{ numberToCurrency(sumary.subtotal) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Valor de impuesto</span>
                  <span>{{ numberToCurrency(sumary.valueAddedTax) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Total descuento</span>
                  <span>{{ numberToCurrency(sumary.totalDiscounts) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Total venta</span>
                  <span>{{ numberToCurrency(sumary.totalSale) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Cliente</span>
                  <span>{{ sumary.customer }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Utilidad</span>
                  <span>{{ numberToCurrency(sumary.profit) }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Método de pago</span>
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
          <Card class="" v-for="(invoice, index) in invoices" :key="index">
            <CardContent>
              <span class="font-montserrat-bold">{{
                invoice.descripcion
              }}</span>
              <div class="text-container">
                <div class="item-3">
                  <span class="item-bold">Valor</span>
                  <span>{{ numberToCurrency(invoice.valorprod) }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-bold">Descuento</span>
                  <span>{{ numberToCurrency(invoice.descuento) }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-bold">Cantidad</span>
                  <span>{{ invoice.cantidad }}</span>
                </div>
                <hr />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
  <Modal :openModal="openModal" @closeModal="closeModal()" width="80vw">
    <div class="modal-container">
      <h3>Resumen de pagos</h3>
      <div
        v-for="paymentMethod in sumary.paymentMethods"
        :key="paymentMethod.payment_id"
      >
        <div class="item-payment">
          <span class="font-montserrat-bold">{{
            paymentMethod.payment_name
          }}</span>
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
//@ts-ignore
import Card from "../Card.vue";
//@ts-ignore
import CardContent from "../CardContent.vue";
import { useDailySalesStore } from "../../store/daily-sales.store";
import { onMounted, ref } from "vue-demi";
import type { TWarehouseDayInvoiceDetail } from "../../interfaces/warehouse-day-invoice-detail.type";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import { useRoute, useRouter } from "vue-router";
import { mdiArrowLeftCircle } from "@mdi/js";
import Icon from "../../../../../../components/Icon.vue";
import type { TSummaryInvoiceDetails } from "../../interfaces/summary-daily-sales.type";
import Modal from "../../../../../../components/Modal.vue";

const dailySalesStore = useDailySalesStore();
const route = useRoute();
const router = useRouter();

let invoices = ref<TWarehouseDayInvoiceDetail[]>([]);
let sumary = ref<TSummaryInvoiceDetails>({
  subtotal: 0,
  valueAddedTax: 0,
  totalDiscounts: 0,
  totalSale: 0,
  customer: "",
  profit: 0,
  paymentMethods: [],
  totalItems: 0,
});

const openModal = ref<boolean>(false);

const loadInvoiceDetails = async () => {
  let { warehouse_id, invoice_id } = route.params;
  const response = await dailySalesStore.dailyInvoiceDetails(
    warehouse_id as string,
    invoice_id as string
  );
  if (!response.error) {
    invoices.value = response.data.daily_invoice_details;
    sumary.value = response.data.summary_invoice;
    console.log(response.data);
  }
};

const openModalPaymentMethods = () => {
  openModal.value = true;
};

const closeModal = () => {
  openModal.value = false;
};

onMounted(async () => {
  await loadInvoiceDetails();
});
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../utils/css/dialog-bubble.css";
@import "../../../../../../styles/forms.css";

.container {
  width: 100vw;
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
  padding-top: 10px;
}

.invoice-title {
  color: var(--color-contrast);
  text-align: center;
}

.beto-message-container {
  padding-top: 10px;
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
  font-size: calc(16px * var(--font-size-proportion));
  margin-bottom: 10px;
}

.search-container {
  padding-top: 10px;
  width: 85%;
  height: 10vh;
}

.search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.size-input {
  width: 100%;
}

.daily-sales-container {
  width: 100%;
  height: 40%;
  color: var(--color-contrast);
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  padding-top: 10px;
  flex: 1;
}

.cards-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
}

/* .cards-container>.card:nth-child(2) {
  color: var(--color-contrast);
  text-align: start;
  font-weight: bold;
  background-color: var(--color-primary-light);

  [data-theme="dark"] & {
    color: var(--color-contrast);
    background-color: var(--color-primary-light);
  }
}

.cards-container>.card:nth-child(3) {
  color: var(--color-contrast);
  text-align: start;
  font-weight: bold;
  background-color: var(--color-primary-light);

  [data-theme="dark"] & {
    color: var(--color-contrast);
    background-color: var(--color-primary-light);
  }
} */

.item {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;

  [data-theme="dark"] & {
    color: var(--color-primary);
  }
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

.text-container {
  text-align: start;
  font-weight: bold;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.color-button {
  border-color: var(--color-primary) !important;
  color: var(--color-primary) !important;
  margin-top: 10px;

  [data-theme="dark"] & {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
}
.color-button-2 {
  border-color: var(--color-contrast) !important;
  color: var(--color-contrast) !important;
  margin-top: 10px;
}

.item-bold {
  font-weight: bold;
}
.cards {
  text-align: start;
  font-weight: bold;
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
  padding-bottom: 5px;
}
.back-icon {
  fill: var(--color-contrast);
  width: 20px;
}

.color-button-link {
  color: var(--color-accent);
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
</style>
