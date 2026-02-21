<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="invoice-container">
      <div class="invoice-title">
        <h3>
          Detalles de la factura <br />
          #5368
        </h3>
      </div>
      <div class="daily-sales-container">
        <div class="cards-container">
          <Card>
            <CardContent>
              Detalle de valores
              <div class="text-container">
                <div class="item">
                  <span>Subtotal</span>
                  <span>$1.263.932.99</span>
                </div>
                <hr />
                <div class="item">
                  <span>Valor de impuesto</span>
                  <span>$123.932.99</span>
                </div>
                <hr />
                <div class="item">
                  <span>Total descuento</span>
                  <span>$123.932</span>
                </div>
                <hr />
                <div class="item">
                  <span>Total venta</span>
                  <span>$1.387.865.98</span>
                </div>
                <hr />
                <div class="item">
                  <span>Cliente</span>
                  <span>Cap Club 81</span>
                </div>
                <hr />
                <div class="item">
                  <span>Utilidad</span>
                  <span>$1.387.865.98</span>
                </div>
                <hr />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              Banda cap cleaner banda ajustable
              <div class="text-container">
                <div class="item-3">
                  <span>Valor</span>
                  <span>$1.263.932.99</span>
                </div>
                <hr />
                <div class="item-3">
                  <span>Descuento</span>
                  <span>$123.932.99</span>
                </div>
                <hr />
                <div class="item-3">
                  <span>Cantidad</span>
                  <span>24</span>
                </div>
                <hr />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              Banda cap cleaner banda ajustable
              <div class="text-container">
                <div class="item-3">
                  <span>Valor</span>
                  <span>$1.263.932.99</span>
                </div>
                <hr />
                <div class="item-3">
                  <span>Descuento</span>
                  <span>$123.932.99</span>
                </div>
                <hr />
                <div class="item-3">
                  <span>Cantidad</span>
                  <span>24</span>
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
import Card from "../Card.vue";
import CardContent from "../CardContent.vue";
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../utils/css/dialog-bubble.css";
@import "../../../../../../styles/forms.css";

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.invoice-container {
  width: 90%;
  height: 85%;
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
  color: var(--color-primary);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
}

.cards-container > .card:nth-child(1) {
  [data-theme="dark"] & {
    color: var(--color-primary);
    background-color: white;
  }
}
.cards-container > .card:nth-child(2) {
  color: var(--color-contrast);
  background-color: var(--color-primary);
  [data-theme="dark"] & {
    color: var(--color-contrast);
    background-color: var(--color-primary);
  }
}
.cards-container > .card:nth-child(3) {
  color: var(--color-contrast);
  background-color: var(--color-primary);
  [data-theme="dark"] & {
    color: var(--color-contrast);
    background-color: var(--color-primary);
  }
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
</style>
