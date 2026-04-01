import { defineStore } from "pinia";
import type { IStoreResponse } from "../../../../../interfaces/store-response.interface";
import { accountsPayableReceivableService } from "../services/accounts-payable-receivable.services";

export const useAccountsPayableReceivableStore = defineStore("accounts-payable-receivable", {
  state: () => ({
    page: 1,
    limit: 5,
    itemsCount: 0,
    totalPages: 0,
  }),
  actions: {
    async accountsPayable(
      init_date: string,
      end_date: string,
      warehouse_id: string,
    ): Promise<IStoreResponse> {
      const response = await accountsPayableReceivableService.accountsPayable(
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
    // async fakeAccountsPayable(): Promise<any> {
    //   const response = await accountsPayableReceivableService.accountsPayable(
    //     "",
    //     "",
    //     "",
    //     this.page,
    //     this.limit
    //   );
    //   return {
    //     error: false,
    //     data: response,
    //   };
    // },
    async accountsReceivable(
      init_date: string,
      end_date: string,
      warehouse_id: string,
    ): Promise<IStoreResponse> {
      const response = await accountsPayableReceivableService.accountsReceivable(
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
