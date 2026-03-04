<template>
    <div class="app-plain-background"></div>
    <div class="container">
        <div class="left-bar scrollable-y">
            <div class="helper-container corners spaces-padding container-background">
                <div class="font-montserrat-bold text-contrast">¿Como hacer un reporte?</div>
                <ul class="text-contrast unordered-list">
                    <li>Selecciona la fecha inicial</li>
                    <li>Selecciona la fecha final</li>
                    <li>Selecciona 1 almacen, o selecciona la casilla "todos los almacenes"</li>
                    <li>Presiona el boton de buscar</li>
                </ul>
            </div>
            <div class="form-container corners spaces-padding container-background scrollable-y">
                <div class="font-montserrat-bold text-contrast">Generar nuevo reporte</div>
                <fieldset class="input-field">
                    <legend>Fecha inicial</legend>
                    <input type="date">
                </fieldset>
                <fieldset class="input-field">
                    <legend>Fecha final</legend>
                    <input type="date">
                </fieldset>
                <div class="checkbox-container">
                    <input class="input-checkbox" type="checkbox" id="all-warehouses" v-model="all_warehouses">
                    <label class="text-contrast font-montserrat-medium" @click="all_warehouses = !all_warehouses">Todos los almacenes</label>
                </div>
                <div class="scrollable-y flex flex-column">
                    <CenterAndScroll>
                        <RadioLabels :disabled="all_warehouses" :options="warehouses_array" @checked-option="(meta) => { console.log(meta) }" />
                    </CenterAndScroll>
                </div>
                <div class="flex flex-justify-center">
                    <button class="form-button">Buscar</button>
                </div>
            </div>
        </div>
        <div class="corners content spaces-padding container-background">
            <div v-if="true" class="font-montserrat-bold text-contrast main-title">Reporte de ventas acumulado</div>
            <div v-if="true" class="beto-message-container">
                <div class="beto-message-wrapper">
                    <img :src="BetoImg" alt="">
                    <BubbleMessage left border="2px" border-color="var(--color-contrast)"
                        background="var(--color-primary-light)" triangle-size="1" triangle-y="100px" min-width="300px">
                        <CenterAndScroll>
                            <div class="font-montserrat-bold text-contrast text-center">
                                Bienvenido al reporte de ventas acumulado
                            </div>
                            <div class="font-montserrat-medium text-contrast text-center">
                                Aqui podrás ver el resume de ventas por almacenes en un rango de fechas determinado
                            </div>
                        </CenterAndScroll>
                    </BubbleMessage>
                </div>
            </div>
            <div v-else class="font-montserrat-bold text-contrast main-title">
                Reporte de ventas acumulado
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { onMounted, ref } from "vue-demi";
import BetoImg from "../../../../../../assets/avatars/beto.svg"
import BubbleMessage from "../../../../../../components/BubbleMessage.vue"
import CenterAndScroll from "../../../../../../components/CenterAndScroll.vue";
import RadioLabels, { type TOptionsType } from "../../../../../../components/radio-label/RadioLabels.vue";
import { useAppStore } from "../../../../../../store/app.store";


let warehouses_array = ref<TOptionsType[]>([])
let all_warehouses = ref<boolean>(false)

const appStore = useAppStore()
const loadWarehouses = async () => {
    const warehouses = await appStore.getWarehouses()
    warehouses_array.value = warehouses.data.map((warehouse: any) => {
        return {
            title: warehouse.nomalmacen,
            meta: warehouse
        }
    })
}

onMounted(() => {
    loadWarehouses()
})

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

.spaces-padding {
    padding: 20px;
}
</style>