<template>
    <div class="app-background"></div>
    <div class="container layout-container">
        <div class="beto-message" v-if="page_state === PageState.BETO_MESSAGE">
            <div class="beto-message-content">
                <img :src="beto_state === BetoState.WELCOME ? BetoImg : BetoSad" class="beto">
                <div class="bubble bubble-a bubble-left">
                    <div v-if="beto_state === BetoState.WELCOME">
                        <span class="p-1">Este es el</span>
                        <span class="p-2 font-montserrat-black">Informe de ventas por día</span>
                        <span class="p-3">Selecciona una fecha para ver los datos</span>
                    </div>
                    <div v-else>
                        <span class="p-1">Ups!</span>
                        <span class="p-2 font-montserrat-black">No se encontraron datos en esta fecha</span>
                        <span class="p-3">Intenta con otra</span>
                    </div>
                </div>
            </div>
            <div class="search">
                <input type="date" class="form-input searcher-input" v-model="date">
            </div>
        </div>
        <div class="data" v-else>
            <div class="search">
                <input type="date" class="form-input searcher-input" v-model="date">
            </div>
            <CenterAndScroll>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-center">Fecha</th>
                                <th class="text-center">Id de almacén</th>
                                <th class="text-center">Subtotal</th>
                                <th class="text-center">Total</th>
                                <th class="text-center">Facturas</th>
                                <th class="text-center">Productos vendidos</th>
                                <th class="text-center">Costo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sale in [1, 2, 3, 4, 5, 6, 7, 8, 9]" @click="openModal = true">
                                <td class="text-center">2024-01-01</td>
                                <td class="text-center">{{sale}}</td>
                                <td class="text-center">$1.263.932.99</td>
                                <td class="text-center">$1.387.865.98</td>
                                <td class="text-center">3</td>
                                <td class="text-center">3</td>
                                <td class="text-center">$1.263.932.99</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CenterAndScroll>
            <div class="summary">
                <img :src="BetoImg" class="summary-beto">
                <Card>
                    <CardContent class="summary-content">
                        <div class="summary-title font-montserrat-bold">Este es un resumen de tu búsqueda:</div>
                        <div class="summary-item">
                            <span>Total ventas</span>
                            <span>$ 1.964.059,99</span>
                        </div>
                        <div class="summary-item">
                            <span>Total productos</span>
                            <span>19</span>
                        </div>
                        <div class="summary-item">
                            <span>Total facturas</span>
                            <span>9</span>
                        </div>
                        <div class="summary-item">
                            <span>Costo</span>
                            <span>$ 975.331,00</span>
                        </div>
                        <div class="summary-item">
                            <span>Utilidad</span>
                            <span>$ 687.593,37</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Modal :openModal="openModal" @close-modal="openModal = false">
                <div class="details-card-content">
                    <div class="invoices-list">
                        <div class="font-montserrat-bold text-contrast text-center">
                            Facturas del dia
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th class="text-center">Fecha</th>
                                    <th class="text-center">Subtotal</th>
                                    <th class="text-center">Impuesto</th>
                                    <th class="text-center">Valor total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="invoice in [1, 2, 3, 4, 5, 6, 7, 8, 9]" @click="invoice_details_state = InvoiceDetailsState.SELECTED">
                                    <td class="text-center">2024-01-01</td>
                                    <td class="text-center">$ {{invoice}}.263.932.99</td>
                                    <td class="text-center">$ {{invoice}}.263.932.99</td>
                                    <td class="text-center">$ {{invoice}}.263.932.99</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div class="invoices-details">
                        <div
                            v-if="invoice_details_state === InvoiceDetailsState.NOT_SELECTED"
                            class="text-contrast font-montserrat-bold text-center">
                            Haz click sobre una factura para ver más detalles
                        </div>

                        <div class="w-100" v-else>
                            <div class="text-contrast font-montserrat-bold text-center">Detalles de la factura #1</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th class="text-center">Producto</th>
                                        <th class="text-center">Valor</th>
                                        <th class="text-center">Descuento</th>
                                        <th class="text-center">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="invoice in [1, 2, 3, 4]">
                                        <td class="text-center">Producto 1</td>

                                        <td class="text-center">$ 1.263.932.99</td>
                                        <td class="text-center">$ 5.000,00</td>
                                        <td class="text-center">12</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </Modal>
        </div>

    </div>
</template>
<script setup lang="ts">
import CenterAndScroll from '../../../../../../components/CenterAndScroll.vue';
import BetoImg from "../../../../../../assets/avatars/beto.svg"
import BetoSad from "../../../../../../assets/avatars/beto-sad.png"

import { ref } from 'vue-demi';
//@ts-ignore
import Card from "../Card.vue";
//@ts-ignore
import CardContent from "../CardContent.vue";
//@ts-ignore
import Modal from '../../../../../../components/Modal.vue';
import { FakerService } from "../../../../../../utils/faker/Faker";

const faker = new FakerService();

const data = faker.generate({
  limit: 15,
  columns: {
    a: "char[2]",
    b: "word",
    c: "string[2]",
    d: "date",
    e: "int(1,10)",
    f: "decimal(4,2)",
    g: "bool",
    h: "$(1000,5000)"
  }
});

console.log(data);
let date = ref(new Date());
let openModal = ref(false);

enum PageState {
    BETO_MESSAGE = 0,
    DATA = 1
}

enum BetoState {
    WELCOME = 0,
    NOT_FOUND = 1
}

enum InvoiceDetailsState {
    SELECTED = 0,
    NOT_SELECTED = 1
}

let page_state = ref(PageState.DATA);
let beto_state = ref(BetoState.NOT_FOUND);
let invoice_details_state = ref(InvoiceDetailsState.NOT_SELECTED);
</script>
<style scoped>
@import "../../../../../../styles/backgrounds.css";
@import "../../../../../../styles/forms.css";
@import "../../../../../../utils/css/dialog-bubble.css";

:global(:root) {
    --message-proportion: 1;
}

.container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.search {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 40px;
}

.searcher-input {
    width: 25%;
    height: 20px;
}

.beto-message {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.beto-message-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
}

.beto {
    width: calc(12rem * var(--message-proportion));

}

.bubble {
    --border-radius-proportion: calc(1 * var(--message-proportion));
    --border: calc(2px * var(--message-proportion));
    --background: var(--color-primary-light);
    --border-color: var(--color-contrast);
    --triangle-size: calc(1.5 * var(--message-proportion));
    --triangle-y: calc(90px * var(--message-proportion));
    width: calc(18rem * var(--message-proportion));
    height: calc(50%);
    color: var(--color-contrast);
    padding: calc(1rem * var(--message-proportion));
    padding-top: calc(2rem * var(--message-proportion));
    padding-bottom: calc(2rem * var(--message-proportion));
}

.bubble div {
    text-align: center;
    line-height: calc(2rem * var(--message-proportion));
    ;
    display: flex;
    flex-direction: column;
}

.p-1 {
    font-size: calc(1.4rem * var(--message-proportion));
}

.p-2 {
    font-size: calc(1.6rem * var(--message-proportion));
}

.p-3 {
    font-size: calc(1.4rem * var(--message-proportion));
}

.data {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.table-container {
    padding: 10px;
}

.summary {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 2rem;
    padding-right: 10px;
    padding-bottom: 10px;
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

.details-card-content {
    width: 90vw;
    display: flex;
}

.invoices-list {
    flex: 1;
    padding: 10px;
}

.invoices-details {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
.summary-beto{
    width: calc(130px * var(--message-proportion));
}
@media (min-width: 1920px) {
    :global(:root) {
        --message-proportion: 1.3;
    }
}

@media (min-width: 2560px) {
    :global(:root) {
        --message-proportion: 1.8;
    }

    .searcher-input {
        height: 40px;
        font-size: 20px;
    }
}
</style>
