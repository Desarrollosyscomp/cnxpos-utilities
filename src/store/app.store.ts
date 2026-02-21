import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAppStore = defineStore("app", {
  state: () => ({
    theme: useStorage("theme", {
      themeLight: true,
      themeDark: false,
    }),
  }),
  actions: {
    changeTheme(theme: string) {
      if (theme === "light") {
        this.theme.themeLight = true;
        this.theme.themeDark = false;
      } else {
        this.theme.themeLight = false;
        this.theme.themeDark = true;
      }
    },
  },
});
