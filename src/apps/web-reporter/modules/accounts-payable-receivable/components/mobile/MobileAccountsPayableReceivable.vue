<template>
  <div class="app-background"></div>
  <div class="container">
    <div class="accounts-payable-receivable-container">
      <div class="accounts-payable-receivable-title" v-if="params">
        <div class="tab-slider" :class="{ right: !selectedAccount }"></div>
        <div
          class="account-payable clickable font-montserrat-bold"
          :class="selectedAccount ? ' color-accent' : 'color-primary-light'"
          @click="toogleAccounts()"
        >
          Cuentas por <br />
          pagar
        </div>
        <div
          class="account-receivable clickable font-montserrat-bold"
          :class="selectedAccount ? 'color-primary-light' : 'color-accent'"
          @click="toogleAccounts()"
        >
          Cuentas por <br />cobrar
        </div>
      </div>
      <div v-if="!params" class="back-button clickable" @click="onBack()">
        <Icon :path="mdiArrowLeftCircle" class="back-icon" />
        <span>Regresar</span>
      </div>
      <div class="beto-message-container" v-if="params">
        <img
          :class="
            beto_state == BetoState.WELCOME ? 'beto-avatar' : 'beto-avatar-sad'
          "
          :src="beto_state == BetoState.WELCOME ? BetoImg : BetoImgSad"
        />
        <div
          class="bubble bubble-a bubble-left"
          v-if="beto_state == BetoState.WELCOME"
        >
          <span>Bienvenido al módulo de</span>
          <h3 class="web-reporter-title">
            Cuentas por {{ selectedAccount ? "pagar" : "cobrar" }}
          </h3>
          <span
            >por favor selecciona una fecha y uno o varios almacenes para
            continuar</span
          >
        </div>
        <div class="bubble bubble-a bubble-left" v-else>
          <span>{{ messageNotFound }}</span>
          <span>por favor selecciona</span>
          <span class="font-montserrat-bold text-contrast"
            >otro almacen y/o fecha</span
          >
        </div>
      </div>
      <div class="search-container" v-if="params">
        <div class="date-field">
          <label for="fecha">Fecha de inicio</label>
          <input
            v-model="rangeDates.init_date"
            type="date"
            id="fecha"
            required
            class="form-input size-input"
          />
        </div>
        <div class="date-field">
          <label for="fecha">Fecha de fin</label>
          <input
            v-model="rangeDates.end_date"
            type="date"
            id="fecha"
            required
            class="form-input size-input"
          />
        </div>
      </div>
      <div class="warehouses-container scrollable-y" v-if="params">
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
              @checked-option="(meta: any) => { selectedWarehouse = meta}"
            />
          </CenterAndScroll>
        </div>
        <div class="flex flex-justify-center">
          <button
            class="form-button-2"
            :class="{ disabled: !selectedWarehouse && !all_warehouses }"
            :disabled="!selectedWarehouse && !all_warehouses"
            @click="
              selectedAccount ? loadAccountsPayable() : loadAccountsReceivable()
            "
          >
            Buscar
          </button>
        </div>
      </div>
      <div
        v-if="!params && (selectedAccount ? accountsPayableResult : accountReceivableResult).length > 0"
        class="scrollable-y result-report-container"
      >
        <span class="text-center font-montserrat-bold"
          >Informe de cuentas por
          {{ selectedAccount ? "pagar" : "cobrar" }}</span
        >
        <Card v-for="(account, index) in (selectedAccount ? accountsPayableResult : accountReceivableResult)" :key="index">
          <CardContent>
            <span class="font-montserrat-medium title">
              Almacen principal
            </span>
            <div class="form-container">
              <div class="liquidation">
                <div class="item-liquidation">
                  <span class="font-montserrat-medium font-size text-contrast"
                    >Total</span
                  >
                  <span class="font-montserrat-bold text-contrast">{{
                    numberToCurrency(account.valtotaldoc)
                  }}</span>
                </div>
                <div class="item-liquidation">
                  <span class="font-montserrat-medium font-size text-contrast"
                    >Abono</span
                  >
                  <span class="font-montserrat-bold text-contrast">{{
                    numberToCurrency(account.total_pagado)
                  }}</span>
                </div>
              </div>
              <div class="data">
                <div class="item">
                  <span class="font-montserrat-bold">Cliente</span>
                  <span>{{ `${account.nombres} ${account.apellidos}` }}</span>
                </div>
                <div class="item">
                  <span class="font-montserrat-bold">NIT</span>
                  <span>{{ account.nit }}</span>
                </div>
                <div class="item">
                  <span class="font-montserrat-bold">Detalle</span>
                  <span>{{ account.tipodoc }}</span>
                </div>
                <div class="item">
                  <span class="font-montserrat-bold">Fecha factura</span>
                  <span>{{ formatDateWithHyphen(account.fechadoc) }}</span>
                </div>
                <div class="item">
                  <span class="font-montserrat-bold">Fecha acordada</span>
                  <span>{{ formatDateWithHyphen(account.fechacuota) }}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import BetoImg from "../../../../../../assets/avatars/beto.svg";
import BetoImgSad from "../../../../../../assets/avatars/beto-sad.png";
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import RadioLabels from "../../../../../../components/radio-label/RadioLabels.vue";
import { useAppStore } from "../../../../../../store/app.store";
import { useAccountsPayableReceivableStore } from "../../store/accounts-payable-receivable.store";
import Card from "../../../daily-sales/components/Card.vue";
import CardContent from "../../../daily-sales/components/CardContent.vue";
import Icon from "../../../../../../components/Icon.vue";
import { mdiArrowLeftCircle } from "@mdi/js";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import { formatDateWithHyphen } from "../../../../../../utils/parsers/parse-date";

const appStore = useAppStore();
const accountsPayableReceivableStore = useAccountsPayableReceivableStore();
const params = ref(true);
enum BetoState {
  WELCOME,
  NOT_FOUND,
}

const beto_state = ref(BetoState.WELCOME);
const messageNotFound = ref("No se encontraron resultados");

const warehouses_array = ref([]);
const selectedWarehouse = ref<any>(null);
const all_warehouses = ref(false);
const accountsPayableResult = ref<any>([]);
const accountReceivableResult = ref<any>([]);

const rangeDates = ref({
  init_date: "",
  end_date: "",
});
const selectedAccount = ref(true);

const toogleAccounts = () => {
  selectedAccount.value = !selectedAccount.value;
  beto_state.value = BetoState.WELCOME;
  selectedWarehouse.value = null;
  rangeDates.value = {
    init_date: "",
    end_date: "",
  };
};

const loadWarehouses = async () => {
  const warehouses = await appStore.getWarehouses();
  warehouses_array.value = warehouses.data.map((warehouse: any) => {
    return {
      title: warehouse.nomalmacen,
      meta: warehouse,
    };
  });
};

const loadAccountsPayable = async () => {
  appStore.showLoadingScreen = true;
  const parseInitialDate = rangeDates.value.init_date.replace(/-/g, "");
  const parseEndDate = rangeDates.value.end_date.replace(/-/g, "");
  const response = await accountsPayableReceivableStore.accountsPayable(
    parseInitialDate || "",
    parseEndDate || "",
    selectedWarehouse.value?.idalmacen ?? 0
  );
  if (response.data.list.length == 0) {
    appStore.showLoadingScreen = false;
    beto_state.value = BetoState.NOT_FOUND;
    return;
  }
  accountsPayableResult.value = response.data.list;
  params.value = false;
  appStore.showLoadingScreen = false;
  beto_state.value = BetoState.WELCOME;
};

const loadAccountsReceivable = async () => {
  appStore.showLoadingScreen = true;
  const parseInitialDate = rangeDates.value.init_date.replace(/-/g, "");
  const parseEndDate = rangeDates.value.end_date.replace(/-/g, "");
  const response = await accountsPayableReceivableStore.accountsReceivable(
    parseInitialDate || "",
    parseEndDate || "",
    selectedWarehouse.value?.idalmacen ?? 0
  );
  if (response.data.list.length == 0) {
    appStore.showLoadingScreen = false;
    beto_state.value = BetoState.NOT_FOUND;
    return;
  }
  console.log(response);
  accountReceivableResult.value = response.data.list;
  params.value = false;
  appStore.showLoadingScreen = false;
  beto_state.value = BetoState.WELCOME;
};

const onBack = () => {
  params.value = true;
  rangeDates.value = {
    init_date: "",
    end_date: "",
  };
  selectedWarehouse.value = null;
  accountsPayableResult.value = [];
  accountReceivableResult.value = [];
};

onMounted(() => {
  appStore.afterLoading(loadWarehouses);
});
</script>

<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";
@import "../../../../../../utils/css/dialog-bubble.css";

:global(:root) {
  --avatar-size: 1;
  --font-size: 1;
  --width-img: 1;
  --width-circle: 1;
  --width-circle-2: 1;
  --padding-top: 1;
  --padding-left: 1;
  --font-size-title: 1;
}
.container {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
}

.accounts-payable-receivable-container {
  position: relative;
  width: 88%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.accounts-payable-receivable-title {
  background-color: rgb(202, 200, 200);
  border-radius: 7px;
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  text-align: center;
  justify-content: space-between;
  color: var(--color-contrast);
  transition: color 0.3s ease;
  transition: color 0.3s ease;
  z-index: 999;
}

.tab-slider {
  position: absolute;
  width: calc(50%);
  height: calc(100%);

  background: var(--color-accent);
  border-radius: 10px;

  transition: transform 0.3s ease;
  z-index: 0;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
/* cuando cambia */
.tab-slider.right {
  transform: translateX(100%);
}

.account-payable,
.account-receivable {
  flex: 1;
  padding: 8px;
  font-size: calc(12px * var(--font-size-title));
  border-radius: 10px;
  text-align: center;

  position: relative;
  z-index: 1; /* 👈 encima del slider */
  -webkit-tap-highlight-color: transparent; /* 🔥 quita el azul en móvil */
}

.color-accent {
  background-color: transparent;
  [data-theme="light"] & {
    color: var(--color-primary-light);
  }
}

.color-primary-light {
  background-color: rgb(202, 200, 200);
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
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.help-beto {
  display: flex;
  justify-content: center;
  position: absolute;
  background-color: var(--color-contrast);
  padding-top: 5px;
  width: calc(14% * var(--width-circle));
  border-radius: 100%;
  top: calc(5px * var(--padding-top));
  left: calc(12px * var(--padding-left));
}

.help-beto::after {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -9px;
  content: "?";
  font-size: 15px;
  font-weight: bold;
  color: var(--color-accent);
  width: calc(40% * var(--width-circle-2));
  border-radius: 100%;
  background-color: var(--color-contrast);
}

.size-img {
  width: calc(25x * var(--width-img));
}

.modal-container {
  padding-top: 15px;
  padding-bottom: 10px;
}

.modal-container-2 {
  padding: 10px;
  padding-bottom: 2px;
}

.steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  gap: 5px;
}

.title {
  font-size: calc(16px * var(--font-size-title));
  font-weight: bold;
  padding-bottom: 5px;
}

.warehouse {
  font-size: 18px;
  font-weight: 800;
}

li {
  font-size: 14px;
}
.beto-message-container {
  padding-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.beto-avatar {
  width: calc(20vw * var(--avatar-size));
}
.beto-avatar-sad {
  width: calc(20vw * var(--avatar-size));
  transform: scaleX(-1);
}

.bubble-a.bubble {
  --line-height-proportion: 0.7;
  --font-size-proportion: 1;
  --border: 1px;
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: 1;
  --triangle-y: 30px;

  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size-proportion));

  line-height: calc(24px * var(--line-height-proportion));
  text-align: center;
}

.button {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 5px;
}

.button-leave {
  display: flex;
  justify-content: end;
  width: 100%;
  padding-top: 5px;
}

.card-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 15px;
}

.text-container {
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item {
  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size));
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-liquidation {
  color: var(--color-contrast);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-2 {
  --font-size: 1;
  --padding-top: 1;
  font-size: calc(12px * var(--font-size));
  padding-top: calc(5px * var(--padding-top));
  font-weight: 500;
  display: flex;
  justify-content: space-between;
}

.buttons {
  padding-top: 10px;
  display: flex;
  justify-content: space-evenly;
}

.text-align {
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
  padding-bottom: calc(12px * var(--padding-bottom-buttons));
}

.color-link {
  color: var(--color-accent);
  text-decoration: underline;
}

.warehouse-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.warehouse-list {
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 10px;
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

.result-report-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
}

.liquidation {
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.data {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.font-size {
  font-size: 13px;
  color: gray;
  [data-theme="dark"] & {
    color: var(--color-contrast);
  }
}

@media (min-width: 360px) {
  .help-beto {
    --width-circle: 0.9;
    --padding-top: 8;
    --padding-left: 2;
  }
  .size-img {
    --width-img: 1.05;
  }
}

@media (min-width: 390px) {
  .help-beto {
    --width-circle: 0.82;
    --padding-top: 8;
    --padding-left: 2;
  }
  .size-img {
    --width-img: 1.1;
  }
  .form-container {
    grid-template-columns: 1fr 1fr;
  }
  .liquidation {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item-liquidation {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media (min-width: 768px) {
  .help-beto {
    --width-circle: 0.47;
    --padding-top: 10;
    --padding-left: 4;
  }
  .size-img {
    --width-img: 1.2;
  }
  .accounts-payable-receivable-title {
    --font-size-title: 1.2;
  }
}
</style>
