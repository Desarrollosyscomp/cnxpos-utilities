import { defineStore } from "pinia";
import { dailySalesService } from "../services/daily-sales.services";
import type { IStoreResponse } from "../../../../../interfaces/store-response.interface";

export const useDailySalesStore = defineStore("daily-sales", {
  state: () => ({
    page: 1,
    limit: 5,
    itemsCount: 0,
    totalPages: 0,
  }),
  actions: {
    async dailySales(date: string): Promise<IStoreResponse> {
      const response = await dailySalesService.dailySales(date);
      if (response?.status !== 200) {
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
    async dailyInvoices(
      date: string,
      warehouse_id: string
    ): Promise<IStoreResponse> {
      const response = await dailySalesService.dailyInvoices(
        date,
        warehouse_id,
        this.page,
        this.limit
      );
      this.itemsCount = response?.data.response.count;
      this.totalPages = Math.ceil(response?.data.response.totalPages);
      return {
        error: false,
        data: response?.data.response,
      };
    },
    async dailyInvoiceDetails(
      warehouse_id: string,
      number_invoice: string
    ): Promise<IStoreResponse> {
      const response = await dailySalesService.dailyInvoiceDetails(
        warehouse_id,
        number_invoice
      );
      return {
        error: false,
        data: {
          daily_invoice_details: response?.data.response.invoice,
          summary_invoice: response?.data.response.summary,
        },
      };
    },
  },
});
