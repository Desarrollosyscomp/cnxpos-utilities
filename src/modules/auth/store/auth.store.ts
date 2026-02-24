import { defineStore } from "pinia";
import { loginService } from "../services/Auth.services";
import type { TFormLogin } from "../interfaces/auth.type";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        
    }),
    actions: {
        async login(data: TFormLogin) {
         const response = await loginService.logIn(data);   
         console.log(response);
        }
    },
});