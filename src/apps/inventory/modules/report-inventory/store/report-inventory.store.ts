import { defineStore } from "pinia";
import { reportInventoryService } from "../services/report-inventory.services";
import type { IStoreResponse } from "../../../../../interfaces/store-response.interface";

export const useReportInventoryStore = defineStore("daily-sales", {
  state: () => ({
    page: 1,
    limit: 5,
    search: "",
    itemsCount: 0,
    totalPages: 0,
  }),
  actions: {
    async reportInventory(
      warehouse_id: number
    ): Promise<IStoreResponse> {
      const response = await reportInventoryService.reportInventory(
        warehouse_id,
        this.page,
        this.limit,
        this.search
      );
      if (response?.status !== 200) {
        return {
          error: true,
          data: response?.data.response,
        };
      }
      this.itemsCount = response?.data.response.count;
      this.totalPages = Math.ceil(response?.data.response.totalPages);
      return {
        error: false,
        data: response?.data.response,
      };
    },
  },
});
