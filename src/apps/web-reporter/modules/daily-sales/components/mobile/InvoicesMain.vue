<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="invoice-container">
      <div class="invoice-title">
        <h3>Facturas del día</h3>
        <span class="font-montserrat-bold">Cap Club 81</span>
      </div>
      <div class="beto-message-container">
        <img
          class="beto-avatar"
          src="../../../../../../assets/avatars/beto.svg"
        />
        <div class="bubble bubble-a bubble-left">
          <p>
            Para el dia
            <span class="font-montserrat-semibold">2024/01/01</span> tuviste un
            subtotal de ventas de
            <span class="font-montserrat-semibold">$1.263.932.99</span> un total
            de <span class="font-montserrat-semibold">impuestos</span> de
            <span class="font-montserrat-semibold">$123.932.99</span> para un
            total de <span class="font-montserrat-semibold">$1.387.865.98</span>
          </p>
        </div>
      </div>
      <div class="search-container">
        <div class="date-field">
          <input placeholder="Buscar" class="form-input size-input" />
        </div>
      </div>
      <div class="daily-sales-container">
        <div class="cards-container">
          <Card v-for="invoice in invoices" :key="invoice.idalmacen">
            <CardContent>
              <div class="text-container">
                <span>Factura #{{ invoice.idalmacen }}</span>
                <div class="item">
                  <span class="item-bold">Fecha</span>
                  <span>{{ invoice.fecha }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Subtotal</span>
                  <span>{{ numberToCurrency(invoice.subtotal) }}</span>
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
                    @click="router.push(`/web-report-v2/invoice-details/${invoice.idalmacen}/${invoice.idfactura}`)"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          <!-- <Card>
            <CardContent>
              <div class="text-container">
                <span class="text-align-start">Factura #5368</span>
                <div class="item-3">
                  <span class="item-3-bold">Fecha</span>
                  <span>2024-01-01</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Subtotal</span>
                  <span>$1.263.932.99</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Impuesto</span>
                  <span>$123.932.99</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-3-bold">Valor Total</span>
                  <span>$1.387.865.98</span>
                </div>
                <hr />
                <div class="buttons">
                  <button
                    class="form-button-2 color-button-2"
                    @click="router.push('/web-report-v2/invoice-details')"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </CardContent>
          </Card> -->
        </div>
      </div>
    </div>
  </div>
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
const router = useRouter();
const route = useRoute();
let invoices = ref<TWarehouseDayInvoice[]>([]);
const dailySalesStore = useDailySalesStore();

const setInvoices = async () => {
  let { date, warehouse_id } = route.params;  
  let response = await dailySalesStore.dailyInvoices(date as string, warehouse_id as string);
  invoices.value = response.data;
  console.log(invoices.value);
};

onMounted(() => {
  setInvoices();
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
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.invoice-container {
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 10px;
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
  /* background-color: var(--color-primary-light); */
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
