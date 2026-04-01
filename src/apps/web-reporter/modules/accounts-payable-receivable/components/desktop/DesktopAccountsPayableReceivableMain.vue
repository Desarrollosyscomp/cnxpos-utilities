<template>
  <div class="app-plain-background"></div>
  <div class="container">
    hola
  </div>
</template>
<script setup lang="ts">

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
