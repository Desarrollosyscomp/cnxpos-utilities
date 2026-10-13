// ==================== STORE: app ====================
// Estado global: pantallas de carga/splash, tema persistido en localStorage ('theme')
// y carga de almacenes para los filtros de los reportes.
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { AppService } from "../services/app.services";
import type { IStoreResponse } from "../interfaces/store-response.interface";

export const useAppStore = defineStore("app", {
  state: () => ({
    showLoadingScreen: false,
    showSplashScreen: false,
    theme: useStorage("theme", {
      "dataTheme": "light",
    }),
  }),
  actions: {
    // -------------------- Guarda el tema claro/oscuro --------------------
    async changeTheme(theme: string) {
      this.theme["dataTheme"] = theme;
    },
    // -------------------- Almacenes activos (GET /warehouses) --------------------
    async getWarehouses(): Promise<IStoreResponse> {
      const res = await AppService.getWarehouses()
      return {
        data: res?.data.response.warehouses,
        error: false
      }
    },

    // -------------------- Ejecuta una función mostrando la pantalla de carga --------------------
    async afterLoading(f: Function) {
      this.showLoadingScreen = true;
      await f();
      this.showLoadingScreen = false;
    }
  },
});
