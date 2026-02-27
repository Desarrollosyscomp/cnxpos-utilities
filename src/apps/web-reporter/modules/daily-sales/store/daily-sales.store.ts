import { defineStore } from "pinia";
import { dailySalesService } from "../services/daily-sales.services";
import type { IStoreResponse } from "../../../../../interfaces/store-response.interface";

export const useDailySalesStore = defineStore("daily-sales", {
    state: () => ({
        
    }),
    actions: {
        async dailySales(): Promise<IStoreResponse>{
            const response = await dailySalesService.dailySales();
            return {
                error: false,
                data: response.response.daily_sales,
            };
        }
    },
});