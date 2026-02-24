import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

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
  },
});
