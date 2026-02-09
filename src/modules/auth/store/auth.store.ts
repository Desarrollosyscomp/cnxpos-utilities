import { defineStore } from "pinia";
import { loginService } from "../services/Auth.services";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        
    }),
    actions: {
        async login(data: any) {
         const response = await loginService.logIn(data);   
         console.log(response);
        }
    },
});