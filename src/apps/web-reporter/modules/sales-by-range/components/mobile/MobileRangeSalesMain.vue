<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="sales-by-range-container">
      <div class="sales-by-range-title">
        <h3>Informe de <br />ventas acumulado</h3>
      </div>

      <div class="search-container">
        <div class="date-field">
          <label for="fecha">Fecha de inicio</label>
          <input
            v-model="date"
            type="date"
            id="fecha"
            required
            class="form-input size-input"
          />
        </div>
        <div class="date-field">
          <label for="fecha">Fecha de fin</label>
          <input
            v-model="date"
            type="date"
            id="fecha"
            required
            class="form-input size-input"
          />
        </div>
      </div>

      <div class="warehouses-container scrollable-y">
        <span class="font-montserrat-bold text-contrast"
          >Seleccione uno o varios almacenes</span
        >
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
              @checked-option="(meta: any) => { console.log(meta) }"
            />
          </CenterAndScroll>
        </div>
        <div class="flex flex-justify-center">
          <button class="form-button-2">Buscar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import type { TOptionsType } from "../../../../../../components/radio-label/RadioLabels.vue";
import { useAppStore } from "../../../../../../store/app.store";
import RadioLabels from "../../../../../../components/radio-label/RadioLabels.vue";

const date = ref("");
let warehouses_array = ref<TOptionsType[]>([]);
let all_warehouses = ref<boolean>(false);

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

onMounted(() => {
  loadWarehouses();
});
</script>

<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";
.container {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
}

.sales-by-range-container {
  width: 87%;
  height: 92%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sales-by-range-title {
  text-align: center;
  color: var(--color-contrast);
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.size-input {
  width: 100%;
}

.warehouses-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

span {
  text-align: center;
  font-size: 15px;
}
</style>
