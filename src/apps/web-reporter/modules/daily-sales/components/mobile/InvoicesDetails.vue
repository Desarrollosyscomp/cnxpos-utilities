<template>
  <div class="app-background"></div>
  <div class="container">
    <div
      class="back-button clickable"
      @click="router.push('/web-report-v2/daily-sales')"
    >
      <Icon :path="mdiArrowLeftCircle" class="back-icon" />
      <span></span>
    </div>
    <div class="invoice-container">
      <div class="invoice-title">
        <h3>
          Detalles de la factura <br />
          #5368
        </h3>
      </div>
      <div class="daily-sales-container">
        <div class="cards-container">
          <Card :dark="true">
            <CardContent>
              <div class="text-container">
                <span>Detalle de valores</span>
                <div class="item">
                  <span class="item-bold">Subtotal</span>
                  <span>{{ calcSubtotal() }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Valor de impuesto</span>
                  <span>{{ calcTotalTaxes() }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Total descuento</span>
                  <span>{{ calcTotalDiscounts() }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Total venta</span>
                  <span>{{ calcTotalSale() }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Cliente</span>
                  <span>{{ "Camilo Gracia " }}</span>
                </div>
                <hr />
                <div class="item">
                  <span class="item-bold">Utilidad</span>
                  <span>{{ "pendiente " }}</span>
                </div>
                <hr />
              </div>
            </CardContent>
          </Card>
          <Card v-for="(item, index) in details" :key="index" class="cards">
            <CardContent>
              <span>Banda cap cleaner banda ajustable</span>
              <div class="text-container">
                <div class="item-3">
                  <span class="item-bold">Valor</span>
                  <span>{{ numberToCurrency(item.valorprod) }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-bold">Descuento</span>
                  <span>{{ numberToCurrency(item.descuento) }}</span>
                </div>
                <hr />
                <div class="item-3">
                  <span class="item-bold">Cantidad</span>
                  <span>{{ item.cantidad }}</span>
                </div>
                <hr />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useDailySalesStore } from "../../store/daily-sales.store";
import Card from "../Card.vue";
import CardContent from "../CardContent.vue";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";

const dailySalesStore = useDailySalesStore();

let details = ref([]);
const setInvoiceDetails = async () => {
  const response = await dailySalesStore.dailySalesDetailsforInvoice();
  details.value = response.data;
};

const calcSubtotal = () => {
  let subTotal = 0;
  for (let i = 0; i < details.value.length; i++) {
    subTotal += details.value[i].subtotal;
  }
  return numberToCurrency(subTotal);
};

const calcTotalTaxes = () => {
  let totalTaxes = 0;
  for (let i = 0; i < details.value.length; i++) {
    totalTaxes += details.value[i].valimpuesto;
  }
  return numberToCurrency(totalTaxes);
};

const calcTotalDiscounts = () => {
  let totalDiscounts = 0;
  for (let i = 0; i < details.value.length; i++) {
    totalDiscounts += details.value[i].valdescuentos;
  }
  return numberToCurrency(totalDiscounts);
};

const calcTotalSale = () => {
  let totalSale = 0;
  for (let i = 0; i < details.value.length; i++) {
    totalSale += details.value[i].valortotal;
  }
  return numberToCurrency(totalSale);
};

onMounted(() => {
  setInvoiceDetails();
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
  color: var(--color-primary);
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
</style>
