<template>
  <div class="app-background"></div>
  <div class="container">
desktop
  </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
@import "../../../../utils/css/dialog-bubble.css";
@import "../../../../styles/backgrounds.css";

:global(:root) {
  --beto-proportion: 1;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.beto-message-container {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
}

.beto-avatar {
  width: calc(45% * var(--beto-proportion));
}

.bubble-a.bubble {
  --border: calc(3px * var(--beto-proportion));
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: calc(1.3 * var(--beto-proportion));
  --triangle-y: calc(60px * var(--beto-proportion));
  color: var(--color-contrast);
  text-align: center;
  border-radius: calc(17px * var(--beto-proportion));
  width: calc(340px * var(--beto-proportion));
  height: calc(190px * var(--beto-proportion));
  padding: 0;
}

.beto-content {
  line-height: calc(28px * var(--beto-proportion));
  text-align: center;
  padding: calc(10px * var(--beto-proportion));
  display: flex;
  flex-direction: column;
  gap: calc(10px * var(--beto-proportion));
}

.hello {
  font-size: calc(28px * var(--beto-proportion)) !important;
}

.question {
  font-size: calc(24px * var(--beto-proportion)) !important;
}

.options {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.item {
  color: var(--color-contrast);
  cursor: pointer;
  width: calc(150px * var(--beto-proportion));
  height: calc(160px * var(--beto-proportion));
  border-radius: calc(17px * var(--beto-proportion));
  border: calc(3px * var(--beto-proportion)) solid var(--color-contrast);
  background-color: var(--color-primary-light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  gap: calc(10px * var(--beto-proportion));
}

.item:hover {
  background-color: #c5c2c2ce;

  [data-theme="dark"] & {
    background-color: #ebebeb1e;
  }
}

.item-label {
  font-size: calc(16px * var(--beto-proportion));
}

.icon {
  width: calc(74px * var(--beto-proportion));
  --icon-proportion: 1;
  fill: var(--color-contrast);
}


@media (min-width: 1440px) {
  :global(:root) {
    --beto-proportion: 1.3;
  }
}
@media (min-width: 1920px) {
  :global(:root) {
    --beto-proportion: 1.6;
  }
}

@media (min-width: 2560px) {
  :global(:root) {
    --beto-proportion: 2;
  }
}
</style>
<!-- test styles errase -->
<style></style>
