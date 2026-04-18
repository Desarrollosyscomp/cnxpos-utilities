import { defineStore } from "pinia";
import { DashboardService } from "../services/dashboard.services";
import type { IStoreResponse } from "../../../../../interfaces/store-response.interface";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({}),
  actions: {
    async getDashboardSummary(
      init_date: string,
      end_date: string
    ): Promise<IStoreResponse> {
      const response = await DashboardService.reportsDashboard(
        init_date,
        end_date
      );
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
  },
});
