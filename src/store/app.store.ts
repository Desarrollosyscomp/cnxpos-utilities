import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { AppService } from "../services/app.services";
import type { IStoreResponse } from "../interfaces/store-response.interface";

export const useAppStore = defineStore("app", {
  state: () => ({
    theme: useStorage("theme", {
      "dataTheme": "light",
    }),
  }),
  actions: {
    async changeTheme(theme: string) {
      this.theme["dataTheme"] = theme;
    },
    async getWarehouses(): Promise<IStoreResponse> {
      const res = await AppService.getWarehouses()
      console.log(res)
      return {
        data: res?.data.response.warehouses,
        error: false
      }
    },
  },
});
