import { defineStore } from "pinia";
import { dailySalesService } from "../services/daily-sales.services";
import type { IStoreResponse } from "../../../../../interfaces/store-response.interface";

export const useDailySalesStore = defineStore("daily-sales", {
    state: () => ({
        
    }),
    actions: {
        async dailySales(date: string): Promise<IStoreResponse>{
            const response = await dailySalesService.dailySales(date);
            if(response?.status !== 200){
                return {
                    error: true,
                    data: response?.data?.response,
                };
            }
            return {
                error: false,
                data: response?.data?.response,
            };
        },
        async dailyInvoices(date: string, warehouse_id: string): Promise<IStoreResponse>{
            const response = await dailySalesService.dailyInvoices(date, warehouse_id);
            return {
                error: false,
                data: response?.data.response,
            };
        },
        async dailyInvoiceDetails(warehouse_id: string, invoice_id: string): Promise<IStoreResponse>{
            const response = await dailySalesService.dailyInvoiceDetails(warehouse_id, invoice_id);
            return {
                error: false,
                data: {
                    daily_invoice_details: response.response.daily_invoice_details,
                    datos_factura: response.response.datos_factura,
                },
            };
        }
    },
});