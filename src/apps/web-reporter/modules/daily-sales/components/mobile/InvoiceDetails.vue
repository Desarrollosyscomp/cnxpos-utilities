<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="invoice-container">
      <h3>Facturas del día</h3>
      <span>Cap Club 81</span>
      <div class="beto-message-container">
        <img
          class="beto-avatar"
          src="../../../../../../assets/avatars/beto.svg"
        />
        <div class="bubble bubble-a bubble-left">
          <span>Para el dia <b>2024-01-01</b> tuviste un 
            subtotal de ventas de <b>$1.263.932.99</b> un total de impuestos de <b>$123.932.99</b>
            para u total de <b>$1.387.865.98</b>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../utils/css/dialog-bubble.css";

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
  background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  --triangle-x: 40%;

  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size-proportion));

  line-height: calc(18px * var(--line-height-proportion));
  text-align: center;
}

.bubble> :nth-child(1) {
  font-weight: 300;
  font-size: calc(16px * var(--font-size-proportion));
  margin-bottom: 10px;
}
</style>
