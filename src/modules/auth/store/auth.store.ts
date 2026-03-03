import { defineStore } from "pinia";
import { loginService } from "../services/Auth.services";
import type { TFormLogin } from "../interfaces/auth.type";
import { useStorage } from "@vueuse/core";
import type { IStoreResponse } from "../../../interfaces/store-response.interface";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: useStorage("auth", {
      token: "",
      isLogged: false,
    }),
  }),
  actions: {
    async login(data: TFormLogin): Promise<IStoreResponse> {
      const response = await loginService.logIn(data);
      if (response?.status != 200){
        return {
          error: true,
          data: response?.data.response.message,
        }  
      }
      this.auth.token = response?.data.response.token;
      this.auth.isLogged = true;
      return {
        error: false,
        data: this.auth,
      }
    },
  },
});
