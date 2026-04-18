<template>
  <div class="app-plain-background"></div>
  <div class="container layout-container">
    <div class="report-inventory-container">
      <div v-if="!params" class="back-button clickable" @click="onBack()">
        <Icon :path="mdiArrowLeftCircle" class="back-icon" />
        <span>Regresar</span>
      </div>
      <div class="title-container">
        <h3 class="font-montserrat-bold text-contrast font-size-title">
          Informe de cuentas por {{ selectedAccount ? 'pagar' : 'cobrar' }}
        </h3>
        <div class="date-field">
          <label for="fecha">Fecha de inicio</label>
          <input
            type="date"
            id="fecha"
            required
            class="form-input size-input"
            v-model="rangeDates.init_date"
          />
        </div>
        <div class="date-field">
          <label for="fecha">Fecha de fin</label>
          <input
            type="date"
            id="fecha"
            required
            class="form-input size-input"
            v-model="rangeDates.end_date"
          />
        </div>
        <!-- <div class="dropdown">
        <div class="dropdown-btn form-input" @click="open = !open">
          {{ selected || "Seleccionar opción  ▼" }}
        </div>
        <div v-if="open" class="dropdown-menu">
          <div v-for="item in options" @click="select(item)" class="clickable">
              {{ item }}
            </div>
          </div>
        </div> -->
      </div>
      <div
        :class="['cash-counts',
          params ? 'cash-counts-container' : 'cash-counts-container-table'
        ]"
      >
        <div class="beto-message-container" v-if="params">
          <img
            :class="
              beto_state == BetoState.WELCOME
                ? 'beto-avatar'
                : 'beto-avatar-sad'
            "
            :src="beto_state == BetoState.WELCOME ? BetoImg : BetoImgSad"
          />
          <div
            class="bubble bubble-a bubble-left"
            v-if="beto_state == BetoState.WELCOME"
          >
            <span>Bienvenido al modulo de</span>
            <h2 class="web-reporter-title">Cuentas por {{ selectedAccount ? 'pagar' : 'cobrar' }}</h2>
            <span>por favor selecciona una fecha </span>
            <span>y un almacen para continuar</span>
          </div>
          <div class="bubble bubble-a bubble-left" v-else>
            <span>No se encontraron resultados</span>
            <span class="text-contrast">Por favor selecciona otro </span>
            <span class="font-montserrat-bold">almacen y/o fecha</span>
          </div>
        </div>
        <div class="warehouses-container" v-if="params">
          <div class="container-tab">
            <div class="accounts-title">
              <div
                class="tab-slider"
                :class="{ right: !selectedAccount }"
              ></div>
              <div
                class="account-payable clickable font-montserrat-bold"
                :class="
                  selectedAccount ? ' color-accent' : 'color-primary-light'
                "
                @click="toogleAccounts()"
              >
                Cuentas por <br />
                pagar
              </div>
              <div
                class="account-receivable clickable font-montserrat-bold"
                :class="
                  selectedAccount ? 'color-primary-light' : 'color-accent'
                "
                @click="toogleAccounts()"
              >
                Cuentas por <br />cobrar
              </div>
            </div>
          </div>
          <span class="font-montserrat-medium text-contrast font-size"
            >Selecciona un almacen para generar un informe</span
          >
          <!-- <div class="checkbox-container">
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
          </div> -->
          <div class="scrollable-y flex flex-column">
            <CenterAndScroll>
              <RadioLabels
                :disabled="all_warehouses"
                :options="warehouses_array"
                @checked-option="
              (meta: any) => {
                selectedWarehouse = meta;
              }
            "
              />
            </CenterAndScroll>
          </div>
          <div class="flex flex-justify-center">
            <button
              class="form-button"
              :class="{ 'disabled-button': disabledButton }"
              :disabled="disabledButton"
              @click="
                selectedAccount
                  ? loadAccountsPayable()
                  : loadAccountsReceivable()
              "
            >
              Buscar
            </button>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;" class="scrollable-y" v-if="
              (selectedAccount ? accountsPayableResult : accountReceivableResult)
                .length > 0
            ">

          <div class="table-container scrollable-y">
            <table class="custom-table-two">
              <thead>
                <tr>
                  <th class="font-montserrat-bold text-left">Almacén</th>
                  <th class="font-montserrat-bold text-center">Total</th>
                  <th class="font-montserrat-bold text-center">Cliente</th>
                  <th class="font-montserrat-bold text-center">NIT</th>
                  <th class="font-montserrat-bold text-center">Detalle</th>
                  <th class="font-montserrat-bold text-center">Fecha factura</th>
                  <th class="font-montserrat-bold text-right">Fecha acordada</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="account in selectedAccount
                    ? accountsPayableResult
                    : accountReceivableResult"
                  :key="account.id"
                >
                  <td>{{ account.nomalmacen }}</td>
                  <td class="text-center">
                    <div>
                      {{ numberToCurrency(account.valtotaldoc) }}
                    </div>
                    <div>
                      <span class="font-montserrat-bold">Abono: </span>
                      {{ numberToCurrency(account.total_pagado) }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ `${account.nombres} ${account.apellidos}` }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.nit }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.tipodoc }}
                    </div>
                  </td>
                  <td class="text-center">
                    {{ formatDateWithHyphen(account.fechadoc) }}
                  </td>
                  <td class="text-right">
                    {{ formatDateWithHyphen(account.fechacuota) }}
                  </td>
                </tr>
                <tr
                  v-for="account in selectedAccount
                    ? accountsPayableResult
                    : accountReceivableResult"
                  :key="account.id"
                >
                  <td>{{ account.nomalmacen }}</td>
                  <td class="text-center">
                    <div>
                      {{ numberToCurrency(account.valtotaldoc) }}
                    </div>
                    <div>
                      <span class="font-montserrat-bold">Abono: </span>
                      {{ numberToCurrency(account.total_pagado) }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ `${account.nombres} ${account.apellidos}` }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.nit }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.tipodoc }}
                    </div>
                  </td>
                  <td class="text-center">
                    {{ formatDateWithHyphen(account.fechadoc) }}
                  </td>
                  <td class="text-right">
                    {{ formatDateWithHyphen(account.fechacuota) }}
                  </td>
                </tr>
                <tr
                  v-for="account in selectedAccount
                    ? accountsPayableResult
                    : accountReceivableResult"
                  :key="account.id"
                >
                  <td>{{ account.nomalmacen }}</td>
                  <td class="text-center">
                    <div>
                      {{ numberToCurrency(account.valtotaldoc) }}
                    </div>
                    <div>
                      <span class="font-montserrat-bold">Abono: </span>
                      {{ numberToCurrency(account.total_pagado) }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ `${account.nombres} ${account.apellidos}` }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.nit }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.tipodoc }}
                    </div>
                  </td>
                  <td class="text-center">
                    {{ formatDateWithHyphen(account.fechadoc) }}
                  </td>
                  <td class="text-right">
                    {{ formatDateWithHyphen(account.fechacuota) }}
                  </td>
                </tr>
                <tr
                  v-for="account in selectedAccount
                    ? accountsPayableResult
                    : accountReceivableResult"
                  :key="account.id"
                >
                  <td>{{ account.nomalmacen }}</td>
                  <td class="text-center">
                    <div>
                      {{ numberToCurrency(account.valtotaldoc) }}
                    </div>
                    <div>
                      <span class="font-montserrat-bold">Abono: </span>
                      {{ numberToCurrency(account.total_pagado) }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ `${account.nombres} ${account.apellidos}` }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.nit }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.tipodoc }}
                    </div>
                  </td>
                  <td class="text-center">
                    {{ formatDateWithHyphen(account.fechadoc) }}
                  </td>
                  <td class="text-right">
                    {{ formatDateWithHyphen(account.fechacuota) }}
                  </td>
                </tr>
                <tr
                  v-for="account in selectedAccount
                    ? accountsPayableResult
                    : accountReceivableResult"
                  :key="account.id"
                >
                  <td>{{ account.nomalmacen }}</td>
                  <td class="text-center">
                    <div>
                      {{ numberToCurrency(account.valtotaldoc) }}
                    </div>
                    <div>
                      <span class="font-montserrat-bold">Abono: </span>
                      {{ numberToCurrency(account.total_pagado) }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ `${account.nombres} ${account.apellidos}` }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.nit }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div>
                      {{ account.tipodoc }}
                    </div>
                  </td>
                  <td class="text-center">
                    {{ formatDateWithHyphen(account.fechadoc) }}
                  </td>
                  <td class="text-right">
                    {{ formatDateWithHyphen(account.fechacuota) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="paginator-container">
            <div class="paginator">
              <Paginator
                v-if="!params"
                :key="accountsPayableReceivableStore.page"
                :items-per-page="accountsPayableReceivableStore.limit"
                :max-buttons="4"
                :total-pages="accountsPayableReceivableStore.totalPages"
                :current-page="accountsPayableReceivableStore.page"
                @on-change-page="onChangePage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import BetoImg from "../../../../../../assets/avatars/beto.svg";
import BetoImgSad from "../../../../../../assets/avatars/beto-sad.png";
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import RadioLabels from "../../../../../../components/radio-label/RadioLabels.vue";
import { useAppStore } from "../../../../../../store/app.store";
import { formatDateWithHyphen } from "../../../../../../utils/parsers/parse-date";
import { numberToCurrency } from "../../../../../../utils/parsers/number-currency";
import { mdiArrowLeftCircle } from "@mdi/js";
import Icon from "../../../../../../components/Icon.vue";
import { useAccountsPayableReceivableStore } from "../../store/accounts-payable-receivable.store";
import Paginator from "../../../../../../components/Paginator.vue";

const all_warehouses = ref(false);
const selectedWarehouse = ref<any | null>(null);
const warehouses_array = ref([]);
const params = ref<boolean>(true);
const accountsPayableReceivableStore = useAccountsPayableReceivableStore();

enum BetoState {
  WELCOME = 0,
  NOT_FOUND = 1,
}

let beto_state = ref(BetoState.WELCOME);
const accountsPayableResult = ref<any>([]);
const accountReceivableResult = ref<any>([]);
const rangeDates = ref({
  init_date: "",
  end_date: "",
});
const selectedAccount = ref(true);
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
  selectedWarehouse.value = null;
  accountsPayableResult.value = [];
  accountReceivableResult.value = [];
  beto_state.value = BetoState.WELCOME;
};

const toogleAccounts = () => {
  selectedAccount.value = !selectedAccount.value;
  beto_state.value = BetoState.WELCOME;
  selectedWarehouse.value = null;
};

// const open = ref(false);
// const selected = ref<string | null>(null);
// const options = ref(["Cuentas por pagar", "Cuentas por cobrar"]);

// const select = (option: string) => {
//   selected.value = option;
//   open.value = false;
//   selectedAccount.value = option === "Cuentas por pagar";
//   if (selectedAccount.value) {
//     loadAccountsPayable();
//   } else {
//     loadAccountsReceivable();
//   }
// };

const onChangePage = (emmited: any) => {
  if (accountsPayableReceivableStore.page !== emmited.data.page) {
    accountsPayableReceivableStore.page = emmited.data.page;
    appStore.afterLoading(
      selectedAccount ? loadAccountsReceivable : loadAccountsPayable
    );
  }
};

const disabledButton = computed(() => {
  return (
    !selectedWarehouse.value ||
    rangeDates.value.init_date == "" ||
    rangeDates.value.end_date == ""
  );
});

onMounted(() => {
  loadWarehouses();
});
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";
@import "../../../../../../utils/css/dialog-bubble.css";
:global(:root) {
  --accounts-title-width: 1;
  --accounts-title-top: 1;
  --beto-width: 1;
  --proportion-padding: 1;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title-container {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
}

.report-inventory-container {
  width: 80%;
  max-height: 100%;
  height: 80%;
}
.paginator-container{
  width: 100%;
  padding-bottom: 20px;
}
.cash-counts {
  border-radius: 5px;
  background-color: var(--color-primary-dark);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  
}
.cash-counts-container {
  height: 90%;

}
.cash-counts-container-table {
  flex-direction: column;
  max-height: 90%;
  
}

.beto-message-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.beto-avatar {
  width: calc(10vw * var(--beto-width));
}

.beto-avatar-sad {
  width: calc(10vw * var(--beto-width));
  transform: scaleX(-1);
}

.bubble-a.bubble {
  --line-height-proportion: 1;
  --font-size-proportion: 1;
  --border: 1px;
  --border-color: var(--color-contrast);
  --background: var(--color-primary-light);
  --triangle-size: 1;
  --triangle-y: 30px;

  color: var(--color-contrast);
  font-size: calc(12px * var(--font-size-proportion));
  padding: 20px;
  line-height: calc(18px * var(--line-height-proportion));
  text-align: center;
  gap: 5px;
}

.bubble > :nth-child(1) {
  font-weight: light;
  font-size: calc(12px * var(--font-size-proportion));
  margin-bottom: 2px;
}

.size-input {
  width: 100%;
}

label {
  background-color: var(--color-primary-dark-2) !important;
}

.warehouses-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 30%;
}
.accounts-title {
  background-color: rgb(202, 200, 200);
  border-radius: 7px;
  position: absolute;
  width: calc(20% * var(--accounts-title-width));
  top: calc(24% * var(--accounts-title-top));
  display: flex;
  text-align: center;
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
  padding: calc(4px * var(--proportion-padding));
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
.table-container {
  width: 95%;
  margin: 20px;
}
.back-button {
  width: 10%;
  color: var(--color-contrast);
  font-weight: bold;
  font-size: calc(12px * var(--font-size));
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
}

.back-icon {
  fill: var(--color-contrast);
  width: 20px;
}
.dropdown {
  width: 200px;
  position: relative;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu {
  padding-top: 10px;
  padding-bottom: 10px;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: white;
  border: 1px solid #ccc;
}

.dropdown-menu div:hover {
  background-color: #ccc;
}

.dropdown-menu.active {
  display: block;
}

.container-tab {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
}

.font-size {
  font-size: calc(13px * var(--font-size-title));
}

.font-size-title {
  font-size: calc(17px * var(--font-size-title));
}

/* .tab-slider {
  position: absolute;
  width: calc(50%);
  height: calc(100%);

  background: var(--color-accent);
  border-radius: 10px;

  transition: transform 0.3s ease;
  z-index: 0;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
} 
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
  z-index: 1;
  -webkit-tap-highlight-color: transparent;
} */

@media (min-width: 1920px) {
  .accounts-title {
    --accounts-title-top: 1.2;
  }
  .account-payable,
  .account-receivable {
    --proportion-padding: 3;
    --font-size-title: 1.3;
  }
  .bubble-a.bubble {
    --font-size-proportion: 1.5;
    --line-height-proportion: 1.5;
  }
  .font-size-title {
    --font-size-title: 1.5;
  }
  .font-size {
    --font-size-title: 1.5;
  }
}
</style>
