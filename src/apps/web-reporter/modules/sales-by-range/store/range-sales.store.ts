import { defineStore } from "pinia";
import { rangeSalesService } from "../services/range-sales.services";
import type { IStoreResponse } from "../../../../../interfaces/store-response.interface";

export const useRangeSalesStore = defineStore("range-sales", {
  state: () => ({
    page: 1,
    limit: 5,
    itemsCount: 0,
    totalPages: 0,
  }),
  actions: {
    async rangeSales(
      init_date: string,
      end_date: string,
      warehouse_id: string,
    ): Promise<IStoreResponse> {
      const response = await rangeSalesService.rangeSales(
        init_date,
        end_date,
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
  },
});
